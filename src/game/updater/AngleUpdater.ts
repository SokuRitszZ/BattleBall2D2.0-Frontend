import C from "../C";
import GameObject from "../GameObject";
import { typeAngle, typePosition } from "../types";
import Updater from "./Updater";

class AngleUpdater extends Updater {
  constructor(obj: GameObject, tag: string, options: {
    from: typePosition,
    target: () => typePosition,
    wAngle: number;
    angle: typeAngle;
  }) {
    const { from, target, wAngle, angle } = options;
    super(obj, tag, () => {
      const angleTarget = C.angle(from, target());
      const angleCur = angle.deg;
      let d = angleTarget - angleCur;
      let t = C.sign(d);
      d = Math.abs(d);
      if (d > Math.PI) d = Math.PI * 2 - d, t *= -1;
      d = Math.min(d, wAngle * obj.delta);
      angle.deg += d * t;
      if (angle.deg < 0) angle.deg += Math.PI * 2;
      if (angle.deg > Math.PI * 2) angle.deg -= Math.PI * 2;
    });
  }
}

export default AngleUpdater;