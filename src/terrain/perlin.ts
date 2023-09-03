type Perlin = {
  get(x: number, y: number): number;
};

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

export function createPerlin(): Perlin {
  const gradients = new Map<string, { x: number; y: number }>();
  const memory = new Map<string, number>();

  function dotProductGrid(x: number, y: number, vx: number, vy: number) {
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

  function get(x: number, y: number): number {
    const key = `${x},${y}`;
    if (memory.has(key)) {
      return memory.get(key)!;
    }
    let xf = Math.floor(x);
    let yf = Math.floor(y);
    let tl = dotProductGrid(x, y, xf, yf);
    let tr = dotProductGrid(x, y, xf + 1, yf);
    let bl = dotProductGrid(x, y, xf, yf + 1);
    let br = dotProductGrid(x, y, xf + 1, yf + 1);
    let xt = interp(x - xf, tl, tr);
    let xb = interp(x - xf, bl, br);
    let v = interp(y - yf, xt, xb);
    memory.set(key, v);
    return v;
  }

  return { get };
}
