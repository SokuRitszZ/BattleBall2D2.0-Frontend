import GameObject from "../GameObject";
import { typeAngle } from "../types";
import Updater from "./Updater";
import { typePosition } from '@/game/types';

class MoveUpdater extends Updater {
  constructor(obj: GameObject, tag: string, options: {
    position: typePosition;
    angle: typeAngle;
    v: number;
    t: number;
    over?: Function;
  }) {
    let { position, angle, v, t, over } = options;
    super(obj, tag, () => {
      t -= obj.delta;
      const d = v * obj.delta;
      position.x += d * Math.cos(angle.deg);
      position.y += d * Math.sin(angle.deg);
      if (t <= 0) {
        this.release();
        if (over) over();
      }
    });
  }
}

export default MoveUpdater;