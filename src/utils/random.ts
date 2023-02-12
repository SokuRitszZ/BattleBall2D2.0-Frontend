function random<T>(list: T[]) {
  const n = list.length;
  return list[Math.floor(Math.random() * n)];
}

export default random;