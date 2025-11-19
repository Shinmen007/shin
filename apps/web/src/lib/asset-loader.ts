/**
 * Dynamic Asset Loader - Fetches all assets from the web at runtime
 * Supports: Images, Fonts, 3D Models, Audio, Icons
 */

export interface AssetConfig {
  fonts: Record<string, string>;
  images: Record<string, string>;
  models: Record<string, string>;
  audio: Record<string, string>;
  icons: Record<string, string>;
}

// CDN URLs for cyberpunk assets
export const ASSET_URLS: AssetConfig = {
  fonts: {
    orbitron: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap',
    rajdhani: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap',
    sourceCodePro: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600;700;800;900&display=swap',
    audiowide: 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap',
  },
  images: {
    // Cyberpunk textures and backgrounds
    gridTexture: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/uv_grid_opengl.jpg',
    particleTexture: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/sprites/spark1.png',
    noiseTexture: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/terrain/grasslight-big.jpg',
    glowTexture: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/lensflare/lensflare0.png',
    hexPattern: 'https://www.transparenttextures.com/patterns/hexellence.png',
    circuitBoard: 'https://www.transparenttextures.com/patterns/carbon-fibre.png',
  },
  models: {
    // 3D models from public repositories
    brain: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
    robot: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/RobotExpressive/RobotExpressive.gltf',
    sphere: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/IridescentDishWithOlives.glb',
  },
  audio: {
    // Cyberpunk ambient sounds
    hover: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    click: 'https://cdn.freesound.org/previews/320/320652_5260872-lq.mp3',
    ambient: 'https://cdn.freesound.org/previews/445/445978_3797507-lq.mp3',
    success: 'https://cdn.freesound.org/previews/320/320776_5260872-lq.mp3',
    error: 'https://cdn.freesound.org/previews/320/320775_5260872-lq.mp3',
  },
  icons: {
    // SVG icons from open sources
    github: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
    linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
    twitter: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg',
    react: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
    nextjs: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
    typescript: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
    threejs: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/threedotjs.svg',
  },
};

// Cache for loaded assets
const assetCache = new Map<string, any>();

/**
 * Load and cache a font from Google Fonts
 */
export async function loadFont(fontUrl: string): Promise<void> {
  if (assetCache.has(fontUrl)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl;
  document.head.appendChild(link);

  assetCache.set(fontUrl, true);
}

/**
 * Load image dynamically with caching
 */
export async function loadImage(url: string): Promise<HTMLImageElement> {
  if (assetCache.has(url)) {
    return assetCache.get(url);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      assetCache.set(url, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Load JSON data (for 3D models, configs, etc.)
 */
export async function loadJSON<T = any>(url: string): Promise<T> {
  if (assetCache.has(url)) {
    return assetCache.get(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const data = await response.json();
    assetCache.set(url, data);
    return data;
  } catch (error) {
    console.error(`Error loading JSON from ${url}:`, error);
    throw error;
  }
}

/**
 * Load audio file with caching
 */
export async function loadAudio(url: string): Promise<HTMLAudioElement> {
  if (assetCache.has(url)) {
    return assetCache.get(url).cloneNode() as HTMLAudioElement;
  }

  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';
    audio.oncanplaythrough = () => {
      assetCache.set(url, audio);
      resolve(audio);
    };
    audio.onerror = reject;
    audio.src = url;
  });
}

/**
 * Load SVG icon
 */
export async function loadSVG(url: string): Promise<string> {
  if (assetCache.has(url)) {
    return assetCache.get(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load SVG from ${url}`);
    const svgText = await response.text();
    assetCache.set(url, svgText);
    return svgText;
  } catch (error) {
    console.error(`Error loading SVG from ${url}:`, error);
    throw error;
  }
}

/**
 * Preload multiple assets
 */
export async function preloadAssets(
  assets: { type: keyof AssetConfig; key: string }[]
): Promise<void> {
  const promises = assets.map(async ({ type, key }) => {
    const url = ASSET_URLS[type][key];
    if (!url) {
      console.warn(`Asset not found: ${type}.${key}`);
      return;
    }

    try {
      switch (type) {
        case 'fonts':
          await loadFont(url);
          break;
        case 'images':
          await loadImage(url);
          break;
        case 'audio':
          await loadAudio(url);
          break;
        case 'icons':
          await loadSVG(url);
          break;
        case 'models':
          await loadJSON(url);
          break;
      }
    } catch (error) {
      console.error(`Failed to load ${type}.${key}:`, error);
    }
  });

  await Promise.allSettled(promises);
}

/**
 * Clear asset cache (useful for memory management)
 */
export function clearAssetCache(): void {
  assetCache.clear();
}

/**
 * Get asset from cache
 */
export function getCachedAsset<T = any>(url: string): T | undefined {
  return assetCache.get(url);
}
