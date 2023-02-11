import GameObject from "../GameObject";
import { typeCircle } from "../types";
import Updater from "./Updater";

class ZoomUpdater extends Updater {
  constructor(obj: GameObject, tag: string, options: {
    circle: typeCircle;
    t: number;
  }) {
    let { circle, t } = options;
    const v = circle.r * 0.9 / t;
    super(obj, tag, () => {
      t -= obj.delta;
      if (t < 0) return obj.destroy();
      circle.r -= v * obj.delta;
      if (circle.r < 0) circle.r = 0;
      if (circle.r < 0.01) {
        obj.destroy();
      }
    });
  }
}

export default ZoomUpdater;