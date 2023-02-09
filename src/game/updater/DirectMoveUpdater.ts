import GameObject from "../GameObject";
import Updater from "./Updater";
import { typePosition } from '@/game/types';

class DirectMoveUpdater extends Updater {
  constructor(obj: GameObject, tag: string, options: {
    angle: number;
    v: number;
    position: typePosition;
    max?: number;
    over?: Function;
  }) {
    let { angle, v, position, max, over } = options;
    
    if (!max) {
      super(obj, tag, () => {
        const mov = v * obj.delta;
        position.x += mov * Math.cos(angle);
        position.y += mov * Math.sin(angle);
      });
    } else {
      super(obj, tag, () => {
        let mov = v * obj.delta;
        if (max! < mov) {
          mov = max!;
          this.release();
          if (over) over();
        }
        position.x += mov * Math.cos(angle);
        position.y += mov * Math.sin(angle);
        max! -= mov;
      })
    }
  }
}

export default DirectMoveUpdater;