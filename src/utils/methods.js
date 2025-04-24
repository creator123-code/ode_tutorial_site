export function eulerMethod(f, x0, y0, h, n) {
  let x = x0;
  let y = y0;
  const result = [];

  for (let i = 0; i <= n; i++) {
    const fx = f(x, y);
    result.push({ x, y, fx });
    y = y + h * fx;
    x = x + h;
  }

  return result;
}