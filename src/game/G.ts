import Camera from "./Camera";
import { typeColor, typePosition } from "./types";

class G {
  public c: CanvasRenderingContext2D;
  public camera: Camera;

  constructor(c: CanvasRenderingContext2D, camera: Camera) {
    this.c = c;
    this.camera = camera;
  }

  public cir(
    options: typePosition & {
      r: number;
      color?: typeColor;
    }
  ) {
    let { x, y, r, color } = options;
    let pos = this.camera.offset({ x, y });
    r = this.camera.scaled(r);
    const c = this.c;
    c.fillStyle = color || "#fff";
    c.beginPath();
    c.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    c.fill();
  }

  public rec(
    options: typePosition & {
      lx: number;
      ly: number;
      color?: typeColor;
    }
  ) {
    let { x, y, lx, ly, color } = options;
    let pos = this.camera.offset({ x, y });
    lx = this.camera.scaled(lx);
    ly = this.camera.scaled(ly);
    const c = this.c;
    c.fillStyle = color || "#fff";
    c.fillRect(pos.x, pos.y, lx, ly);
  }
}

export default G;
