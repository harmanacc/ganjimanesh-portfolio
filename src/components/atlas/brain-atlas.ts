// Interactive brain atlas for the portfolio.
// Geometry: merged + meshopt-compressed region meshes in public/brain-atlas.
// Rendering: three.js with a generated pencil-hatch matcap, paper palette, local clipping.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

export type Region = {
  id: number;
  code: string | null;
  name: string;
  fa: string;
  latin: string;
  kind: string;
  model: boolean;
  surface: boolean;
  external: boolean;
  invisible: boolean;
  description: string;
  path: string[];
  children: Region[];
};

type ReadingLayer = {
  id: string;
  label: string;
  note: string;
  codes: string[];
};

type AtlasData = {
  meta: { title: string; source: string; sourceUrl: string; note: string };
  layers: ReadingLayer[];
  regions: Region[];
};

const PALETTE = {
  surface: '#dfcfb0',
  surfaceDeep: '#d2bf9b',
  selected: '#c2553d',
  hover: '#5875a8',
  ink: '#2a241c',
  paper: '#efe6d2',
};

const GROUP_COLORS: Record<string, string> = {
  artery: '#c07a63',
  nerve: '#7d92ae',
  ventricle: '#9db0bf',
  cerebellum: '#c8a56a',
  brainstem: '#a3b096',
  diencephalon: '#cfa874',
  telencephalon: '#c98d7d',
  cortex: '#cdb58c',
  white: '#cbbda0',
};

// A small, complementary set of outer meshes used as a single faint shell when
// the viewer looks inside. The source set has 28 overlapping cortical patches;
// rendering all of them transparently stacks into mud.
const SHELL_CODES = new Set([
  '1.1.4.0.0', // temporal lobe
  '1.1.2.0.0', // parietal lobe
  '1.1.3.0.0', // occipital lobe
  '1.1.1.3.0', // prefrontal cortex
  '1.1.1.4.0', // premotor cortex
  '1.1.1.1.3', // anterior cingulate
  '1.1.5.0.0', // subcortical white matter
  '4.0.0.0.0', // brain stem
  '2.1.0.0.0', // cerebellar hemisphere
  '2.3.0.0.0', // vermis
]);

const SUGGESTED = [
  '1.1.1.3.0',
  '1.1.1.1.3',
  '1.1.6.5.0',
  '1.1.4.3.3',
  '3.4.0.0.0',
  '3.2.0.0.0',
  '2.1.0.0.0',
  '4.0.0.0.0',
];

const faNum = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function groupColor(code: string) {
  if (code.startsWith('7.')) return GROUP_COLORS.artery;
  if (code.startsWith('6.')) return GROUP_COLORS.nerve;
  if (code.startsWith('5.')) return GROUP_COLORS.ventricle;
  if (code.startsWith('2.') || code.startsWith('9.')) return GROUP_COLORS.cerebellum;
  if (code.startsWith('4.')) return GROUP_COLORS.brainstem;
  if (code.startsWith('3.')) return GROUP_COLORS.diencephalon;
  if (code.startsWith('1.1.5') || code.startsWith('1.1.9')) return GROUP_COLORS.white;
  if (code.startsWith('1.')) return GROUP_COLORS.telencephalon;
  return GROUP_COLORS.cortex;
}

/**
 * A matcap drawn as an etched sphere: quantised light bands, diagonal hatching
 * in the shadows and a little paper grain. Tinted per region by material.color.
 */
function createMatcap(size = 320) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context unavailable');
  const image = ctx.createImageData(size, size);
  const data = image.data;

  const light = new THREE.Vector3(-0.42, 0.58, 0.7).normalize();
  const hash = (x: number, y: number) => {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  };

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x / (size - 1)) * 2 - 1;
      const ny = 1 - (y / (size - 1)) * 2;
      const r2 = nx * nx + ny * ny;
      const index = (y * size + x) * 4;

      if (r2 > 1) {
        data[index + 3] = 0;
        continue;
      }

      const nz = Math.sqrt(1 - r2);
      const diffuse = clamp(nx * light.x + ny * light.y + nz * light.z, 0, 1);
      let value = 0.3 + 0.7 * Math.pow(diffuse, 0.85);

      // contact shadow at the silhouette
      const rim = Math.pow(1 - nz, 2.4);
      value *= 1 - 0.34 * rim;

      // pencil-like tonal steps
      const bands = 7;
      const banded = Math.round(value * bands) / bands;
      value = value * 0.42 + banded * 0.58;

      // hatching in the darker bands
      const diagonal = (x + y) % 6 < 1.1;
      const cross = (x - y + 4096) % 5 < 1.1;
      if (value < 0.62 && diagonal) value *= 0.87;
      if (value < 0.45 && cross) value *= 0.85;

      // paper grain
      value = clamp(value + (hash(x, y) - 0.5) * 0.035, 0, 1);

      data[index] = Math.round(255 * value);
      data[index + 1] = Math.round(250 * value);
      data[index + 2] = Math.round(236 * value);
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

type CamState = {
  target: THREE.Vector3;
  radius: number;
  theta: number;
  phi: number;
};

function copyCam(from: CamState, to?: CamState): CamState {
  const next = to ?? { target: new THREE.Vector3(), radius: 0, theta: 0, phi: 0 };
  next.target.copy(from.target);
  next.radius = from.radius;
  next.theta = from.theta;
  next.phi = from.phi;
  return next;
}

class BrainAtlas {
  root: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  loader: GLTFLoader;
  matcap: THREE.Texture;

  modelRoot = new THREE.Group();
  surfaceScene: THREE.Object3D | null = null;
  internalScene: THREE.Object3D | null = null;
  surfaceLoaded = false;
  internalLoaded = false;
  internalPromise: Promise<boolean> | null = null;

  regionObjects = new Map<string, THREE.Object3D>();
  regionMeshes = new Map<string, THREE.Mesh[]>();
  regionMaterials = new Map<string, THREE.MeshMatcapMaterial[]>();
  pickables: THREE.Mesh[] = [];

  data: AtlasData | null = null;
  byCode = new Map<string, Region>();
  codeByName = new Map<string, string>();
  meshRegions: Region[] = [];
  layers: ReadingLayer[] = [];

  selected: Region | null = null;
  hoveredCode: string | null = null;
  activeLayer: ReadingLayer | null = null;

  plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.4);
  clippingPlanes = [this.plane];
  sliceAxis = 0;
  sliceValue = 1;
  surfaceOpacity = 1;

  cam: CamState = { target: new THREE.Vector3(), radius: 6, theta: 1.2, phi: 1.2 };
  goal: CamState = { target: new THREE.Vector3(), radius: 6, theta: 1.2, phi: 1.2 };
  home: CamState = { target: new THREE.Vector3(), radius: 4.8, theta: 1.22, phi: 1.2 };
  hasInteracted = false;

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  pointers = new Map<number, { x: number; y: number }>();
  drag: { x: number; y: number; moved: boolean; id: number } | null = null;
  pinchDistance = 0;
  hoverRaf = 0;
  hoverPoint: { x: number; y: number } | null = null;

  clock = new THREE.Clock();
  running = true;

  constructor(root: HTMLElement) {
    this.root = root;
    this.canvas = root.querySelector<HTMLCanvasElement>('[data-ba-canvas]')!;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.localClippingEnabled = true;
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(34, 1, 0.05, 100);
    this.camera.position.set(4.8, 1.2, 0.4);

    this.loader = new GLTFLoader();
    this.loader.setMeshoptDecoder(MeshoptDecoder);

    this.matcap = createMatcap();
    this.matcap.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());

    this.scene.add(this.modelRoot);
    this.modelRoot.add(new THREE.AmbientLight(0xffffff, 1));
  }

  async start() {
    this.bindEvents();
    this.resize();
    this.animate();

    try {
      const response = await fetch('/brain-atlas/atlas.json');
      if (!response.ok) throw new Error('atlas data missing');
      this.data = (await response.json()) as AtlasData;
      this.layers = this.data.layers;
      const walk = (regions: Region[]) => {
        regions.forEach((region) => {
          if (region.code) {
            this.byCode.set(region.code, region);
            this.codeByName.set(region.code.replace(/\./g, ''), region.code);
          }
          if (region.model) this.meshRegions.push(region);
          walk(region.children);
        });
      };
      walk(this.data.regions);
      this.buildLayerStrip();
      await this.loadSurface();
      this.root.classList.add('is-ready');
      this.root.classList.remove('is-loading');
      this.applyMaterials();
      this.readHash();
    } catch (error) {
      console.error(error);
      this.fail();
    }
  }

  fail() {
    this.root.classList.remove('is-loading');
    this.root.classList.add('is-failed');
    const text = this.root.querySelector('[data-ba-loading-text]');
    if (text) text.textContent = 'نمایش سه‌بعدی بارگذاری نشد.';
  }

  async loadSurface() {
    const gltf = await this.loader.loadAsync('/brain-atlas/surface.glb');
    const object = gltf.scene;
    object.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const scale = 2.35 / Math.max(size.x, size.y, size.z);
    this.modelRoot.scale.setScalar(scale);
    this.modelRoot.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    this.modelRoot.add(object);
    this.modelRoot.updateMatrixWorld(true);

    this.registerObject(object, true);
    this.surfaceScene = object;
    this.surfaceLoaded = true;
    this.updateHome();
    this.resetCamera(false);
  }

  async ensureInternal(): Promise<boolean> {
    if (this.internalLoaded) return true;
    if (this.internalPromise) return this.internalPromise;

    this.root.classList.add('is-busy');
    this.internalPromise = (async () => {
      try {
        const gltf = await this.loader.loadAsync('/brain-atlas/internal.glb');
        const object = gltf.scene;
        object.updateMatrixWorld(true);
        // internal.glb uses the same coordinate system as surface.glb
        this.modelRoot.add(object);
        this.modelRoot.updateMatrixWorld(true);
        this.registerObject(object, false);
        this.internalScene = object;
        this.internalLoaded = true;
        return true;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        this.root.classList.remove('is-busy');
      }
    })();

    return this.internalPromise;
  }

  registerObject(object: THREE.Object3D, surface: boolean) {
    object.traverse((child: THREE.Object3D) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;

      let ancestor: THREE.Object3D | null = mesh;
      let code: string | null = null;
      while (ancestor && ancestor !== object) {
        if (ancestor.name) {
          const mapped = this.codeByName.get(ancestor.name.replace(/\./g, ''));
          if (mapped) {
            code = mapped;
            break;
          }
        }
        ancestor = ancestor.parent;
      }
      const region = code ? this.byCode.get(code) : null;
      if (!code || !region) return;

      mesh.userData.code = code;
      mesh.frustumCulled = true;
      const material = new THREE.MeshMatcapMaterial({
        matcap: this.matcap,
        color: new THREE.Color(groupColor(code)),
        transparent: true,
        opacity: 1,
        depthWrite: true,
        side: THREE.FrontSide,
        clippingPlanes: this.clippingPlanes,
        clipIntersection: false,
      });
      mesh.material = material;

      const root = this.findRegionRoot(mesh, object, code);
      if (root) this.regionObjects.set(code, root);
      const meshes = this.regionMeshes.get(code) ?? [];
      meshes.push(mesh);
      this.regionMeshes.set(code, meshes);
      const materials = this.regionMaterials.get(code) ?? [];
      materials.push(material);
      this.regionMaterials.set(code, materials);
      this.pickables.push(mesh);
    });

    if (surface) {
      this.root.querySelector('[data-ba-loading-text]')?.replaceChildren();
    }
  }

  findRegionRoot(mesh: THREE.Mesh, scene: THREE.Object3D, code: string) {
    let current: THREE.Object3D | null = mesh;
    while (current && current !== scene) {
      if (
        current.name &&
        this.codeByName.get(current.name.replace(/\./g, '')) === code
      ) {
        return current;
      }
      current = current.parent;
    }
    return mesh;
  }

  updateHome() {
    const aspect = this.width / this.height || 1;
    const fov = this.camera.fov * (Math.PI / 180);
    const tan = Math.tan(fov / 2);
    const heightRadius = 1.45 / tan;
    const widthRadius = 1.22 / (tan * Math.max(aspect, 0.35));
    const radius = Math.max((aspect < 0.85 ? 1.06 : 1) * heightRadius, widthRadius, 3.3);
    this.home.target.set(0, 0, 0);
    this.home.radius = clamp(radius, 3.3, 8.5);
    this.home.theta = 1.22;
    this.home.phi = 1.16;
    if (!this.hasInteracted) {
      copyCam(this.home, this.goal);
    }
  }

  resetCamera(animate = true) {
    this.hasInteracted = false;
    copyCam(this.home, this.goal);
    if (!animate || reduceMotion) copyCam(this.home, this.cam);
  }

  get width() {
    return this.root.clientWidth;
  }

  get height() {
    return this.root.clientHeight;
  }

  resize() {
    const width = this.width;
    const height = this.height;
    if (!width || !height) return;
    const aspect = width / height;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = aspect;
    this.camera.fov = aspect < 0.8 ? 48 : 34;
    this.camera.updateProjectionMatrix();
    if (!this.hasInteracted) this.updateHome();
  }

  animate = () => {
    if (!this.running) return;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const ease = reduceMotion ? 1 : 1 - Math.exp(-dt * 9);

    let deltaTheta = this.goal.theta - this.cam.theta;
    if (Math.abs(deltaTheta) > Math.PI) {
      this.cam.theta += Math.sign(deltaTheta) * Math.PI * 2;
      deltaTheta = this.goal.theta - this.cam.theta;
    }
    this.cam.theta += deltaTheta * ease;
    this.cam.phi += (this.goal.phi - this.cam.phi) * ease;
    this.cam.radius += (this.goal.radius - this.cam.radius) * ease;
    this.cam.target.lerp(this.goal.target, ease);

    const sinPhi = Math.sin(this.cam.phi);
    this.camera.position.set(
      this.cam.target.x + this.cam.radius * sinPhi * Math.sin(this.cam.theta),
      this.cam.target.y + this.cam.radius * Math.cos(this.cam.phi),
      this.cam.target.z + this.cam.radius * sinPhi * Math.cos(this.cam.theta),
    );
    this.camera.lookAt(this.cam.target);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  applyMaterials() {
    const layerSet = this.activeLayer ? new Set(this.activeLayer.codes) : null;
    const shellOpacity = 0.012 + this.surfaceOpacity * 0.008;

    this.byCode.forEach((region, code) => {
      const materials = this.regionMaterials.get(code);
      if (!materials) return;
      const selected = this.selected?.code === code;
      const hovered = this.hoveredCode === code;
      const inLayer = !!layerSet?.has(code);

      let color = region.surface ? PALETTE.surface : groupColor(code);
      let opacity = 1;

      if (selected) {
        color = PALETTE.selected;
        opacity = 1;
      } else if (hovered) {
        color = PALETTE.hover;
        opacity = 1;
      } else if (layerSet) {
        if (region.surface) {
          if (inLayer) {
            color = PALETTE.selected;
            opacity = 0.9;
          } else if (SHELL_CODES.has(code)) {
            color = PALETTE.surfaceDeep;
            opacity = shellOpacity;
          } else {
            opacity = 0;
          }
        } else {
          color = inLayer ? PALETTE.selected : groupColor(code);
          opacity = inLayer ? 1 : region.external || region.invisible ? 0 : 0.2;
        }
      } else if (this.selected) {
        if (this.selected.surface) {
          // A surface region is read in place: keep the whole cortex visible.
          if (region.surface) {
            opacity = this.surfaceOpacity;
          } else {
            opacity = region.external || region.invisible ? 0 : 1;
          }
        } else if (region.surface) {
          if (SHELL_CODES.has(code)) {
            color = PALETTE.surfaceDeep;
            opacity = shellOpacity;
          } else {
            opacity = 0;
          }
        } else {
          opacity = region.external || region.invisible ? 0 : 0.4;
        }
      } else {
        if (region.surface) {
          opacity = this.surfaceOpacity;
        } else {
          opacity = region.external || region.invisible ? 0 : 1;
        }
      }

      materials.forEach((material) => {
        material.color.set(color);
        material.opacity = opacity;
        material.transparent = opacity < 1;
        material.depthWrite = opacity > 0.92;
        material.visible = opacity > 0.01;
        // MeshMatcapMaterial keeps a cached opacity uniform; force a refresh
        // when the state changes so the cortex can actually fade.
        if (material.userData.baOpacity !== opacity) {
          material.userData.baOpacity = opacity;
          material.needsUpdate = true;
        }
      });
    });
  }

  selectRegion(region: Region | null, { open = true } = {}) {
    if (!region) {
      this.clearSelection();
      return;
    }
    this.activeLayer = null;
    this.updateLayerStrip();

    const activate = () => {
      this.selected = region;
      this.surfaceOpacity = 1;
      this.setOpacityInput(this.surfaceOpacity);
      this.applyMaterials();
      this.focusRegion(region);
      this.updateUrl(region.code);
      if (open) this.openDetail(region);
      this.announce(region.fa);
    };

    if (!region.surface && !this.internalLoaded) {
      this.ensureInternal().then((ok) => {
        if (ok) activate();
        else {
          this.selected = region;
          this.applyMaterials();
          if (open) this.openDetail(region);
        }
      });
      return;
    }
    activate();
  }

  focusRegion(region: Region) {
    if (!region.code) return;
    if (region.surface) {
      // Keep a lateral reading view for cortical patches; flying into the
      // medial surface would put the camera inside the cortex.
      this.goal.target.set(0, 0, 0);
      this.goal.radius = this.home.radius * 0.97;
      this.hasInteracted = true;
      return;
    }
    const object = this.regionObjects.get(region.code);
    if (!object) return;
    this.modelRoot.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    if (box.isEmpty()) return;
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const target = sphere.center.clone().lerp(this.home.target, 0.3);
    this.goal.target.copy(target);
    this.goal.radius = clamp(sphere.radius * 5, 4.2, 7);
    this.hasInteracted = true;
  }

  clearSelection({ close = true } = {}) {
    this.selected = null;
    this.hoveredCode = null;
    this.activeLayer = null;
    this.surfaceOpacity = 1;
    this.setOpacityInput(1);
    this.applyMaterials();
    this.rescaleSlice();
    this.resetCamera(true);
    this.updateLayerStrip();
    this.updateUrl(null);
    if (close) this.closeDrawer();
    this.announce('همه ساختارها');
  }

  clearLayer() {
    this.activeLayer = null;
    this.updateLayerStrip();
    this.applyMaterials();
    this.closeDrawer();
  }

  selectLayer(layer: ReadingLayer) {
    if (this.activeLayer?.id === layer.id) {
      this.clearLayer();
      return;
    }
    this.selected = null;
    this.surfaceOpacity = 1;
    this.setOpacityInput(this.surfaceOpacity);
    this.activeLayer = layer;
    this.updateLayerStrip();
    this.resetCamera(true);
    this.goal.radius = clamp(this.home.radius * 0.95, 3.3, 8);
    this.updateUrl(null);

    const open = () => {
      this.applyMaterials();
      this.openLayer(layer);
      this.announce(layer.label);
    };
    if (!this.internalLoaded) this.ensureInternal().then(open);
    else open();
  }

  setSliceAxis(axis: number) {
    this.sliceAxis = axis;
    this.rescaleSlice();
    this.root.querySelectorAll<HTMLElement>('[data-ba-plane]').forEach((button) => {
      const active = Number(button.dataset.baPlane) === axis;
      button.setAttribute('aria-pressed', String(active));
    });
  }

  rescaleSlice() {
    const normal = new THREE.Vector3(
      this.sliceAxis === 0 ? 1 : 0,
      this.sliceAxis === 1 ? 1 : 0,
      this.sliceAxis === 2 ? 1 : 0,
    );
    this.plane.normal.copy(normal);
    this.plane.constant = this.sliceValue * 1.35;
    this.applyMaterials();
  }

  setOpacityInput(value: number) {
    const input = this.root.querySelector<HTMLInputElement>('[data-ba-opacity]');
    if (input) input.value = String(value);
    const readout = this.root.querySelector<HTMLElement>('[data-ba-opacity-value]');
    if (readout) readout.textContent = `${faNum(Math.round(value * 100))}٪`;
  }

  displayPath(region: Region) {
    const generic = new Set(['ساختارها', 'نواحی کارکردی', 'ساختار بدون نام']);
    return region.path.filter((part) => part && !generic.has(part));
  }

  // ——— UI ———————————————————————————————————————————————
  buildLayerStrip() {
    const wrap = this.root.querySelector<HTMLElement>('[data-ba-layers]');
    if (!wrap) return;
    wrap.replaceChildren();
    this.layers.forEach((layer) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ba-layer';
      button.dataset.baLayer = layer.id;
      button.setAttribute('aria-pressed', 'false');
      button.textContent = layer.label;
      button.addEventListener('click', () => this.selectLayer(layer));
      wrap.appendChild(button);
    });
  }

  updateLayerStrip() {
    this.root.querySelectorAll<HTMLElement>('[data-ba-layer]').forEach((button) => {
      const active = button.dataset.baLayer === this.activeLayer?.id;
      button.setAttribute('aria-pressed', String(active));
    });
  }

  openDrawer(html: string, focus?: 'search' | 'close' | null) {
    const drawer = this.root.querySelector<HTMLElement>('[data-ba-drawer]');
    const body = this.root.querySelector<HTMLElement>('[data-ba-drawer-body]');
    if (!drawer || !body) return;
    body.innerHTML = html;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    this.root.classList.add('has-panel');
    const search = body.querySelector<HTMLInputElement>('[data-ba-search]');
    if (search) {
      search.focus({ preventScroll: true });
      search.addEventListener('input', () => this.renderResults(search.value));
    }
    if (focus === 'close') {
      body.querySelector<HTMLElement>('[data-ba-close]')?.focus({ preventScroll: true });
    }
    body.querySelectorAll<HTMLElement>('[data-ba-pick]').forEach((button) => {
      button.addEventListener('click', () => {
        const region = this.byCode.get(button.dataset.baPick || '');
        if (region) this.selectRegion(region);
      });
    });
    body.querySelector('[data-ba-back]')?.addEventListener('click', () => this.openSearch());
    body.querySelector('[data-ba-clear]')?.addEventListener('click', () => this.clearSelection());
    body.querySelector('[data-ba-copy]')?.addEventListener('click', () => {
      if (!this.selected?.code) return;
      const url = `${location.origin}${location.pathname}#${encodeURIComponent(this.selected.code)}`;
      navigator.clipboard?.writeText(url).then(
        () => this.announce('پیوند کپی شد'),
        () => this.announce('کپی نشد'),
      );
    });
    body.querySelectorAll<HTMLElement>('[data-ba-display]').forEach((button) => {
      button.addEventListener('click', () => this.openDisplay());
    });
    body.querySelector('[data-ba-clear-layer]')?.addEventListener('click', () => this.clearLayer());
  }

  closeDrawer() {
    const drawer = this.root.querySelector<HTMLElement>('[data-ba-drawer]');
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    this.root.classList.remove('has-panel');
    window.setTimeout(() => {
      if (!drawer.classList.contains('is-open')) drawer.hidden = true;
    }, 280);
  }

  openSearch() {
    const html = `
      <div class="ba-drawer-head">
        <div>
          <p class="ba-eyebrow">فهرست ساختارها</p>
          <h2 class="ba-drawer-title">کجای مغز؟</h2>
        </div>
        <button class="ba-close" data-ba-close type="button" aria-label="بستن">×</button>
      </div>
      <label class="ba-search">
        <span class="sr-only">جست‌وجوی ساختار</span>
        <input type="search" data-ba-search placeholder="مثلاً هیپوکامپ، آمیگدال، تالاموس" autocomplete="off" />
      </label>
      <p class="ba-list-label">شروع از اینجا</p>
      <div class="ba-chips ba-suggest">
        ${SUGGESTED.map((code) => this.byCode.get(code))
          .filter((region): region is Region => !!region)
          .map(
            (region) =>
              `<button class="ba-chip" type="button" data-ba-pick="${this.esc(
                region.code || '',
              )}">${this.esc(region.fa)}</button>`,
          )
          .join('')}
      </div>
      <p class="ba-list-label">همه ساختارها</p>
      <div class="ba-results" data-ba-results></div>
      <p class="ba-drawer-foot">${faNum(this.meshRegions.length)} ساختار سه‌بعدی · مدل پایه: Neurotorium</p>
    `;
    this.openDrawer(html);
    this.renderResults('');
    this.root.querySelector('[data-ba-drawer] [data-ba-close]')?.addEventListener('click', () =>
      this.closeDrawer(),
    );
  }

  renderResults(query: string) {
    const results = this.root.querySelector<HTMLElement>('[data-ba-results]');
    if (!results) return;
    const q = query.trim().toLowerCase();
    results.replaceChildren();

    if (!q) {
      const tree = document.createElement('div');
      tree.className = 'ba-tree';
      const renderNodes = (regions: Region[], depth: number, parent: HTMLElement) => {
        regions.forEach((region) => {
          const row = document.createElement('div');
          row.className = 'ba-tree-row';
          row.style.setProperty('--depth', String(depth));

          const hasChildren = region.children.some((child) => child.model || child.children.length);
          let groupLabel: HTMLButtonElement | null = null;
          if (region.model) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'ba-entry';
            button.dataset.baPick = region.code || '';
            button.innerHTML = `<span class="ba-entry-fa">${this.esc(region.fa)}</span>${
              region.latin ? `<span class="ba-entry-la" dir="ltr">${this.esc(region.latin)}</span>` : ''
            }`;
            button.addEventListener('click', () => {
              if (region.code) {
                const found = this.byCode.get(region.code);
                if (found) this.selectRegion(found);
              }
            });
            row.appendChild(button);
          } else {
            const label = document.createElement('button');
            label.type = 'button';
            label.className = 'ba-group-label ba-group-label--button';
            label.textContent = region.fa;
            label.setAttribute('aria-expanded', 'false');
            groupLabel = label;
            row.appendChild(label);
          }

          if (hasChildren) {
            const toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'ba-tree-toggle';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', `باز کردن ${region.fa}`);
            toggle.textContent = '‹';
            row.appendChild(toggle);

            const children = document.createElement('div');
            children.className = 'ba-tree-children';
            children.hidden = true;
            renderNodes(region.children, depth + 1, children);

            const setOpen = (open: boolean) => {
              toggle.setAttribute('aria-expanded', String(open));
              toggle.classList.toggle('is-open', open);
              children.hidden = !open;
              groupLabel?.setAttribute('aria-expanded', String(open));
            };
            toggle.addEventListener('click', () =>
              setOpen(toggle.getAttribute('aria-expanded') !== 'true'),
            );
            groupLabel?.addEventListener('click', () =>
              setOpen(toggle.getAttribute('aria-expanded') !== 'true'),
            );

            parent.appendChild(row);
            parent.appendChild(children);
            return;
          }
          parent.appendChild(row);
        });
      };
      renderNodes(this.data?.regions ?? [], 0, tree);
      results.appendChild(tree);
      return;
    }

    const rank = (region: Region) => {
      const fa = region.fa.toLowerCase();
      if (fa === q) return 0;
      if (fa.startsWith(q)) return 1;
      if (fa.includes(q)) return 2;
      if (`${region.name} ${region.latin}`.toLowerCase().includes(q)) return 3;
      return 4;
    };

    const matches = this.meshRegions
      .filter((region) => {
        const haystack = `${region.fa} ${region.name} ${region.latin} ${region.path.join(' ')}`.toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => rank(a) - rank(b) || a.fa.length - b.fa.length);

    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'ba-empty';
      empty.textContent = 'چیزی پیدا نشد. نام دیگری را امتحان کنید.';
      results.appendChild(empty);
      return;
    }
    matches.slice(0, 40).forEach((region) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ba-entry';
      button.dataset.baPick = region.code || '';
      button.innerHTML = `<span class="ba-entry-fa">${this.esc(region.fa)}</span>
        <span class="ba-entry-path">${this.esc(this.displayPath(region).slice(-2).join(' · '))}</span>
        ${region.latin ? `<span class="ba-entry-la" dir="ltr">${this.esc(region.latin)}</span>` : ''}`;
      button.addEventListener('click', () => {
        if (region.code) {
          const found = this.byCode.get(region.code);
          if (found) this.selectRegion(found);
        }
      });
      results.appendChild(button);
    });
  }

  openDetail(region: Region) {
    const layer = this.layers.find((item) => item.codes.includes(region.code || ''));
    const path = this.displayPath(region);
    const note = region.description
      ? `<p class="ba-desc">${this.esc(region.description)}</p>`
      : `<p class="ba-desc ba-desc--quiet">این ساختار بخشی از «${this.esc(
          path[path.length - 1] || 'مغز',
        )}» است. یادداشت کوتاه آن هنوز نوشته نشده است.</p>`;
    const html = `
      <div class="ba-drawer-head">
        <button class="ba-back" data-ba-back type="button" aria-label="بازگشت به فهرست">→</button>
        <button class="ba-close" data-ba-close type="button" aria-label="بستن">×</button>
      </div>
      <p class="ba-eyebrow">${this.esc(path.slice(-2).join(' · ') || 'ساختار')}</p>
      <h2 class="ba-detail-title">${this.esc(region.fa)}</h2>
      ${region.latin ? `<p class="ba-latin" dir="ltr">${this.esc(region.latin)}</p>` : ''}
      ${note}
      ${
        layer
          ? `<p class="ba-layer-note"><span>لایه</span> ${this.esc(layer.label)}</p>`
          : ''
      }
      <div class="ba-detail-actions">
        <button class="ba-text-button" data-ba-clear type="button">بازگشت به مغز</button>
        <button class="ba-text-button" data-ba-copy type="button">کپی پیوند</button>
      </div>
      <p class="ba-drawer-foot">${region.surface ? 'ساختار سطحی' : 'ساختار درونی'} · مدل: Neurotorium</p>
    `;
    this.openDrawer(html, 'close');
    this.root.querySelector('[data-ba-drawer] [data-ba-close]')?.addEventListener('click', () =>
      this.closeDrawer(),
    );
    this.root.querySelector('[data-ba-drawer] [data-ba-back]')?.addEventListener('click', () =>
      this.openSearch(),
    );
  }

  openLayer(layer: ReadingLayer) {
    const regions = layer.codes
      .map((code) => this.byCode.get(code))
      .filter((region): region is Region => !!region);
    const html = `
      <div class="ba-drawer-head">
        <div>
          <p class="ba-eyebrow">لایه‌ی خواندن</p>
          <h2 class="ba-drawer-title">${this.esc(layer.label)}</h2>
        </div>
        <button class="ba-close" data-ba-close type="button" aria-label="بستن">×</button>
      </div>
      <p class="ba-desc">${this.esc(layer.note)}</p>
      <p class="ba-list-label">ساختارهای این لایه</p>
      <div class="ba-chips">
        ${regions
          .map(
            (region) =>
              `<button class="ba-chip" type="button" data-ba-pick="${this.esc(
                region.code || '',
              )}">${this.esc(region.fa)}</button>`,
          )
          .join('')}
      </div>
      <button class="ba-text-button" data-ba-clear-layer type="button">پاک کردن لایه</button>
      <p class="ba-drawer-foot">روی ساختارها کلیک کنید تا از نزدیک ببینید.</p>
    `;
    this.openDrawer(html, 'close');
    this.root.querySelector('[data-ba-drawer] [data-ba-close]')?.addEventListener('click', () =>
      this.closeDrawer(),
    );
  }

  openAbout() {
    const name = this.root.dataset.baName || 'مهدیه گنجی‌منش';
    const email = this.root.dataset.baEmail || 'ganimanesh_mahdieh@yahoo.com';
    const lead = this.root.dataset.baLead || 'روان‌شناس شناختی';
    const location = this.root.dataset.baLocation || 'تهران';
    const html = `
      <div class="ba-drawer-head">
        <div>
          <p class="ba-eyebrow">درباره</p>
          <h2 class="ba-drawer-title">${this.esc(name)}</h2>
        </div>
        <button class="ba-close" data-ba-close type="button" aria-label="بستن">×</button>
      </div>
      <p class="ba-about-lead">${this.esc(lead)} · ارزیابی سازمانی بر پایه‌ی داده‌ی مغزی · ${this.esc(
        location,
      )}</p>
      <p class="ba-desc">
        کارشناسی ارشد علوم شناختی (در حال تحصیل) و کارشناسی روان‌شناسی.
        همکار ارزیابی سازمانی در انستیتو مغز ایماژ و مدیر پروژه در کلینیک ایماژ.
        با QEEG، نوروفیدبک، tDCS و ارزیابی شناختی کار می‌کنم.
      </p>
      <p class="ba-desc">
        این اطلس، شکل تعاملی همان کار است: قبل از عدد، ساختار را ببینیم؛
        قبل از برچسب، پرسش را روشن کنیم.
      </p>
      <div class="ba-detail-actions">
        <a class="ba-text-button" href="mailto:${this.esc(email)}">ایمیل</a>
        <button class="ba-text-button" data-ba-display type="button">تنظیم نمایش</button>
      </div>
      <p class="ba-drawer-foot">مدل‌های سه‌بعدی و داده‌ی پایه: Neurotorium · برای نمونهٔ پژوهشی</p>
    `;
    this.openDrawer(html, 'close');
    this.root.querySelector('[data-ba-drawer] [data-ba-close]')?.addEventListener('click', () =>
      this.closeDrawer(),
    );
  }

  openDisplay() {
    const html = `
      <div class="ba-drawer-head">
        <div>
          <p class="ba-eyebrow">نمایش</p>
          <h2 class="ba-drawer-title">مغز را باز کنید</h2>
        </div>
        <button class="ba-close" data-ba-close type="button" aria-label="بستن">×</button>
      </div>
      <label class="ba-control">
        <span>شفافیت پوسته <b data-ba-opacity-value>۱۰۰٪</b></span>
        <input type="range" min="0.05" max="1" step="0.01" value="1" data-ba-opacity />
      </label>
      <div class="ba-control">
        <span>صفحه‌ی برش</span>
        <div class="ba-segment" role="group" aria-label="صفحه برش">
          <button type="button" data-ba-plane="0" aria-pressed="true">سهمی</button>
          <button type="button" data-ba-plane="1" aria-pressed="false">افقی</button>
          <button type="button" data-ba-plane="2" aria-pressed="false">تاجی</button>
        </div>
        <input type="range" min="-1" max="1" step="0.01" value="1" data-ba-slice />
      </div>
      <div class="ba-detail-actions">
        <button class="ba-text-button" data-ba-reset type="button">بازنشانی نمایش</button>
      </div>
      <p class="ba-drawer-foot">برای دیدن ساختارهای درونی، پوسته را شفاف کنید.</p>
    `;
    this.openDrawer(html, 'close');
    const opacity = this.root.querySelector<HTMLInputElement>('[data-ba-opacity]');
    const slice = this.root.querySelector<HTMLInputElement>('[data-ba-slice]');
    opacity?.addEventListener('input', () => {
      this.surfaceOpacity = Number(opacity.value);
      this.setOpacityInput(this.surfaceOpacity);
      this.applyMaterials();
    });
    slice?.addEventListener('input', () => {
      this.sliceValue = Number(slice.value);
      this.rescaleSlice();
    });
    this.root.querySelectorAll<HTMLElement>('[data-ba-plane]').forEach((button) => {
      button.addEventListener('click', () => this.setSliceAxis(Number(button.dataset.baPlane)));
    });
    this.root.querySelector('[data-ba-reset]')?.addEventListener('click', () => this.resetAll());
    this.root.querySelector('[data-ba-drawer] [data-ba-close]')?.addEventListener('click', () =>
      this.closeDrawer(),
    );
    this.setOpacityInput(this.surfaceOpacity);
  }

  resetAll() {
    this.sliceAxis = 0;
    this.sliceValue = 1;
    this.surfaceOpacity = 1;
    this.setOpacityInput(1);
    this.root.querySelectorAll<HTMLInputElement>('[data-ba-slice]').forEach((input) => {
      input.value = '1';
    });
    this.setSliceAxis(0);
    this.clearSelection();
  }

  announce(text: string) {
    const live = this.root.querySelector<HTMLElement>('[data-ba-live]');
    if (live) {
      live.textContent = '';
      window.setTimeout(() => {
        live.textContent = text;
      }, 40);
    }
  }

  updateUrl(code: string | null) {
    const base = location.pathname + location.search;
    if (code) history.replaceState(null, '', `${base}#${encodeURIComponent(code)}`);
    else history.replaceState(null, '', base);
  }

  readHash() {
    const code = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!code) {
      if (this.selected || this.activeLayer) this.clearSelection({ close: false });
      return;
    }
    const region = this.byCode.get(code);
    if (region) this.selectRegion(region, { open: true });
  }

  // ——— pointer + keyboard ———————————————————————————————
  bindEvents() {
    const canvas = this.canvas;

    canvas.addEventListener('pointerdown', (event) => {
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.pointers.size === 1) {
        this.drag = { x: event.clientX, y: event.clientY, moved: false, id: event.pointerId };
        canvas.setPointerCapture(event.pointerId);
      }
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        this.pinchDistance = Math.hypot(a.x - b.x, a.y - b.y);
        this.drag = null;
      }
    });

    canvas.addEventListener('pointermove', (event) => {
      if (this.pointers.has(event.pointerId)) {
        this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      }

      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (this.pinchDistance > 0) {
          this.goal.radius = clamp(
            this.goal.radius * (this.pinchDistance / distance),
            1.8,
            9,
          );
          this.hasInteracted = true;
        }
        this.pinchDistance = distance;
        this.hideHover();
        return;
      }

      if (this.drag) {
        const dx = event.clientX - this.drag.x;
        const dy = event.clientY - this.drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) this.drag.moved = true;
        this.goal.theta -= dx * 0.0062;
        this.goal.phi = clamp(this.goal.phi - dy * 0.0062, 0.28, Math.PI - 0.28);
        this.drag.x = event.clientX;
        this.drag.y = event.clientY;
        this.hasInteracted = true;
        this.hideHover();
        return;
      }

      this.hoverPoint = { x: event.clientX, y: event.clientY };
      if (!this.hoverRaf) {
        this.hoverRaf = requestAnimationFrame(() => {
          this.hoverRaf = 0;
          if (this.hoverPoint) this.updateHover(this.hoverPoint.x, this.hoverPoint.y);
        });
      }
    });

    const end = (event: PointerEvent) => {
      this.pointers.delete(event.pointerId);
      if (this.pointers.size < 2) this.pinchDistance = 0;
      if (this.drag && !this.drag.moved && event.pointerId === this.drag.id) {
        this.pickAt(event.clientX, event.clientY);
      }
      if (event.pointerId === this.drag?.id) this.drag = null;
    };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', (event) => {
      this.pointers.delete(event.pointerId);
      this.drag = null;
    });
    canvas.addEventListener('pointerleave', () => {
      this.drag = null;
      this.hideHover();
    });

    canvas.addEventListener(
      'wheel',
      (event) => {
        if (this.root.dataset.baWheel === 'off') return;
        event.preventDefault();
        this.goal.radius = clamp(
          this.goal.radius * Math.exp(event.deltaY * 0.0011),
          1.8,
          9,
        );
        this.hasInteracted = true;
      },
      { passive: false },
    );

    canvas.addEventListener('dblclick', () => this.clearSelection());

    this.root.querySelector('[data-ba-search-toggle]')?.addEventListener('click', () => {
      this.openSearch();
    });
    this.root.querySelector('[data-ba-about]')?.addEventListener('click', () => this.openAbout());
    this.root.querySelector('[data-ba-display-button]')?.addEventListener('click', () =>
      this.openDisplay(),
    );
    this.root.querySelector('[data-ba-reset-button]')?.addEventListener('click', () =>
      this.resetAll(),
    );
    this.root.querySelector('[data-ba-drawer] [data-ba-close]')?.addEventListener('click', () =>
      this.closeDrawer(),
    );

    window.addEventListener('keydown', (event) => {
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        if (event.key === 'Escape') (target as HTMLInputElement).blur();
        return;
      }
      if (event.key === 'Escape') {
        const drawer = this.root.querySelector<HTMLElement>('[data-ba-drawer]');
        if (drawer && !drawer.hidden) this.closeDrawer();
        else if (this.selected || this.activeLayer) this.clearSelection();
        return;
      }
      if (event.key === 'ArrowLeft') {
        this.goal.theta += 0.12;
        this.hasInteracted = true;
      } else if (event.key === 'ArrowRight') {
        this.goal.theta -= 0.12;
        this.hasInteracted = true;
      } else if (event.key === 'ArrowUp') {
        this.goal.phi = clamp(this.goal.phi - 0.08, 0.28, Math.PI - 0.28);
      } else if (event.key === 'ArrowDown') {
        this.goal.phi = clamp(this.goal.phi + 0.08, 0.28, Math.PI - 0.28);
      } else if (event.key === '+' || event.key === '=') {
        this.goal.radius = clamp(this.goal.radius * 0.9, 1.8, 9);
      } else if (event.key === '-' || event.key === '_') {
        this.goal.radius = clamp(this.goal.radius * 1.1, 1.8, 9);
      } else if (event.key.toLowerCase() === 'r') {
        this.resetAll();
      }
    });

    window.addEventListener('hashchange', () => this.readHash());

    const observer = new ResizeObserver(() => this.resize());
    observer.observe(this.root);
  }

  pickAt(clientX: number, clientY: number) {
    const hit = this.raycast(clientX, clientY);
    if (hit) {
      const region = this.byCode.get(hit);
      if (region) this.selectRegion(region);
    } else {
      this.clearSelection();
    }
  }

  raycast(clientX: number, clientY: number): string | null {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const transparentShell = this.surfaceOpacity < 0.58 || !!this.activeLayer || !!this.selected;
    const targets = this.pickables;
    const intersections = this.raycaster.intersectObjects(targets, false);
    for (const intersection of intersections) {
      const mesh = intersection.object as THREE.Mesh;
      const code = mesh.userData.code as string | undefined;
      if (!code) continue;
      const region = this.byCode.get(code);
      if (!region) continue;
      if (transparentShell && region.surface && !this.activeLayer) continue;
      const material = mesh.material as THREE.MeshMatcapMaterial;
      if (material.opacity < 0.12) continue;
      return code;
    }
    return null;
  }

  updateHover(clientX: number, clientY: number) {
    const code = this.raycast(clientX, clientY);
    if (code === this.hoveredCode) {
      if (code) this.positionHover(clientX, clientY);
      return;
    }
    this.hoveredCode = code;
    this.applyMaterials();
    if (!code) {
      this.hideHover();
      return;
    }
    const region = this.byCode.get(code);
    const hover = this.root.querySelector<HTMLElement>('[data-ba-hover]');
    if (!region || !hover) return;
    hover.hidden = false;
    hover.innerHTML = `<span class="ba-hover-fa">${this.esc(region.fa)}</span>${
      region.latin ? `<span class="ba-hover-la" dir="ltr">${this.esc(region.latin)}</span>` : ''
    }`;
    this.positionHover(clientX, clientY);
    this.canvas.style.cursor = 'pointer';
  }

  positionHover(clientX: number, clientY: number) {
    const hover = this.root.querySelector<HTMLElement>('[data-ba-hover]');
    if (!hover || hover.hidden) return;
    const rect = this.root.getBoundingClientRect();
    let x = clientX - rect.left + 18;
    let y = clientY - rect.top + 18;
    const width = hover.offsetWidth;
    const height = hover.offsetHeight;
    if (x + width > rect.width - 16) x = clientX - rect.left - width - 18;
    if (y + height > rect.height - 16) y = clientY - rect.top - height - 18;
    hover.style.transform = `translate(${x}px, ${y}px)`;
  }

  hideHover() {
    this.hoveredCode = null;
    this.applyMaterials();
    const hover = this.root.querySelector<HTMLElement>('[data-ba-hover]');
    if (hover) hover.hidden = true;
    this.canvas.style.cursor = 'grab';
  }

  esc(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

export function initBrainAtlas(root: HTMLElement) {
  if (root.dataset.baReady === '1') return;
  root.dataset.baReady = '1';
  const atlas = new BrainAtlas(root);
  atlas.start();
  (window as unknown as { __brainAtlas?: BrainAtlas }).__brainAtlas = atlas;
  return atlas;
}
