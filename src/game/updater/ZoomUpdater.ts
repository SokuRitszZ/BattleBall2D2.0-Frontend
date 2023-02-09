import GameObject from "../GameObject";
import { typeCircle } from "../types";
import Updater from "./Updater";

class ZoomUpdater extends Updater {
  constructor(obj: GameObject, tag: string, options: {
    circle: typeCircle;
    t: number;
  }) {
    const { circle, t } = options;
    const v = circle.r / t;
    super(obj, tag, () => {
      circle.r -= v * obj.delta;
      if (circle.r < 0) circle.r = 0;
      if (circle.r === 0) {
        obj.destroy();
      }
    });
  }
}

export default ZoomUpdater;