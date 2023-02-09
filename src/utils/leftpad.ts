function leftpad(n: number, x: number) {
  const len = n.toString().length;
  return new Array(Math.max(0, x - len)).fill(0).join('') + n;
}

export default leftpad;