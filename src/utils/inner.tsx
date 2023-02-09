function inner(x: number, minX: number, maxX: number) {
  return Math.min(Math.max(x, minX), maxX);
}

export default inner;