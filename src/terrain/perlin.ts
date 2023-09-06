import { array2dFrom } from "../utils/array2d";

type Perlin = (x: number, y: number) => number;

function rand_vect() {
  let theta = Math.random() * 2 * Math.PI;
  return { x: Math.cos(theta), y: Math.sin(theta) };
}

function smootherstep(x: number): number {
  return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
}

function interp(x: number, a: number, b: number): number {
  return a + smootherstep(x) * (b - a);
}

type Gradients = Map<string, { x: number; y: number }>;
type Memory = Map<string, number>;

function dotProductGrid(
  gradients: Gradients,
  x: number,
  y: number,
  vx: number,
  vy: number
) {
  let g_vect: { x: number; y: number };
  let d_vect = { x: x - vx, y: y - vy };
  const key = `${vx},${vy}`;
  if (gradients.has(key)) {
    g_vect = gradients.get(key)!;
  } else {
    g_vect = rand_vect();
    gradients.set(key, g_vect);
  }
  return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
}

function createPerlin(): Perlin {
  const gradients: Gradients = new Map();
  const memory: Memory = new Map();

  return (x: number, y: number): number => {
    const key = `${x},${y}`;
    if (memory.has(key)) {
      return memory.get(key)!;
    }
    let xf = Math.floor(x);
    let yf = Math.floor(y);
    let tl = dotProductGrid(gradients, x, y, xf, yf);
    let tr = dotProductGrid(gradients, x, y, xf + 1, yf);
    let bl = dotProductGrid(gradients, x, y, xf, yf + 1);
    let br = dotProductGrid(gradients, x, y, xf + 1, yf + 1);
    let xt = interp(x - xf, tl, tr);
    let xb = interp(x - xf, bl, br);
    let v = interp(y - yf, xt, xb);
    memory.set(key, v);
    return v;
  };
}

export function perlin2dArray(
  xSize: number,
  ySize: number,
  noiseScale: number
) {
  const values = getPerlinValues(xSize, noiseScale).map((height) => height / 1);
  return array2dFrom(xSize, ySize, values);
}

function getPerlinValues(dimension: number, noiseScale: number) {
  const perlin = createPerlin();
  const GRID_SIZE = 1 * noiseScale;
  const RESOLUTION = dimension / noiseScale;
  let num_pixels = GRID_SIZE / RESOLUTION;

  const heights = [];
  for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
    for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
      let v = perlin(x, y);
      heights.push(v + 1);
    }
  }
  return heights;
}
