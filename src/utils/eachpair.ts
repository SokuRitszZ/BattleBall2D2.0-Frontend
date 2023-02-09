function eachPair<P, Q>(la: P[], lb: Q[], fn: (a: P, b: Q) => void) {
  la.forEach(a => lb.forEach(b => fn(a, b)));
}

export default eachPair;