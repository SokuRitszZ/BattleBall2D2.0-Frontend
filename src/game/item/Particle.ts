import Game from "../Game";
import GameObject from "../GameObject";
import { typePosition, typeCircle, typeColor } from '@/game/types';
import DirectMoveUpdater from "../updater/DirectMoveUpdater";
import ZoomUpdater from "../updater/ZoomUpdater";
import Updater from "../updater/Updater";
import Shadow from "./Shadow";

class Particle extends GameObject {
  constructor(parent: Game, options: {
    v: number;
    max: number;
    angle: number;
    position: typePosition,
    circle: typeCircle,
    color: typeColor,
  }) {
    super(parent);
    const { v, max, angle, position, circle, color } = options;
    
    new DirectMoveUpdater(this, "move:direct", {
      angle,
      v,
      max,
      position,
      over: () => {
        this.destroy();
      }
    });

    const t = max / v;

    new ZoomUpdater(this, "update:zoom", {
      circle,
      t,
    });
    
    const g = this.parent.g;
    new Updater(this, "render:ball", () => {
      g.cir({
        ...position,
        ...circle,
        color,
      });
    });

    new Updater(this, "render:shadow", () => {
      new Shadow(this.parent, {
        position: { ...position },
        circle: { ...circle },
        color,
        timeLast: 0.1,
      });
    });
  }
}

export default Particle;