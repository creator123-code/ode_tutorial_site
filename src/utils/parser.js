import { parse } from 'mathjs';

export function parseExpression(expr) {
  try {
    const compiled = parse(expr).compile();
    return (x, y) => compiled.evaluate({ x, y });
  } catch (error) {
    return null;
  }
}