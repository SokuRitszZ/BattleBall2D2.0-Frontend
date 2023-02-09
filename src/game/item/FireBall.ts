import Game from "../Game";
import GameObject from "../GameObject";
import { typeCircle, typePosition } from '@/game/types';
import DirectMoveUpdater from "../updater/DirectMoveUpdater";
import Updater from "../updater/Updater";
import Shadow from "./Shadow";
import ZoomUpdater from './../updater/ZoomUpdater';

class FireBall extends GameObject {
  private position: typePosition;
  private circle: typeCircle;

  constructor(
    parent: Game,
    options: {
      angle: number;
      v: number;
      max: number;
      position: typePosition
    }
  ) {
    super(parent);
    this.circle = {
      r: 0.15,
    };

    const { angle, v, max, position } = options;
    this.position = position;
    
    new DirectMoveUpdater(this, "move:direct", {
      angle,
      v,
      max,
      position,
      over: () => {
        this.destroy();
      }
    });

    new ZoomUpdater(this, "update:zoom", {
      circle: this.circle,
      t: 2,
    });

    new Updater(this, "render:ball", () => {
      const g = this.parent.g;
      g.cir({
        ...position,
        ...this.circle,
        color: "orange",
      });
    });
    
    new Updater(this, "render:shadow", () => {
      new Shadow(this.parent, {
        position: {...this.position},
        circle: {...this.circle},
        color: "#FFA500",
      });
    });
  }
}

export default FireBall;