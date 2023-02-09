import C from "../C";
import { typePosition } from "../types";
import Updater from "./Updater";
import GameObject from './../GameObject';

class MoveTargetUpdater extends Updater {
  private hasArrived = false;

  constructor(obj: GameObject, tag: string, options: {
    position: typePosition;
    target: typePosition;
    v: number;
    continuos?: boolean;
  }) {
    const { position, target, v, continuos } = options;
    super(obj, tag, () => {
      if (this.hasArrived) {
        position.x = target.x;
        position.y = target.y;
        return ;
      }
      const dist = C.dist(options.position, options.target);
      let mov = v * obj.delta;
      if (Math.abs(mov - dist) < 0.01) {
        this.hasArrived = true;
        position.x = target.x;
        position.y = target.y;
        if (!continuos) {
          this.release();
        }
      } else {
        const angle = C.angle(options.position, options.target);
        position.x += Math.cos(angle) * v * obj.delta;
        position.y += Math.sin(angle) * v * obj.delta;
      }
    });
  }
}

export default MoveTargetUpdater;