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
  
  static cross(a: number, b: number) {
    const cos = Math.cos, sin = Math.sin;
    const [x1, y1] = [cos(a), sin(a)];
    const [x2, y2] = [cos(b), sin(b)];
    return x1 * y2 - x2 * y1;
  }

  static sign(x: number) {
    if (!x) return 0;
    return x > 0 ? 1 : -1;
  }
}

export default C;