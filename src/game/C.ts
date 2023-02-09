import { typePosition } from "./types";

class C {
  static dist(a: typePosition, b: typePosition) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static angle(a: typePosition, b: typePosition) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.atan2(dy, dx);
  }
}

export default C;