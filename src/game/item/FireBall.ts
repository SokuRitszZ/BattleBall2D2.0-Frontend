import Game from "../Game";
import GameObject from "../GameObject";
import { typeCircle, typePosition } from '@/game/types';
import DirectMoveUpdater from "../updater/DirectMoveUpdater";
import Updater from "../updater/Updater";
import Shadow from "./Shadow";
import ZoomUpdater from './../updater/ZoomUpdater';
import Collision from "../Collision";
import Player from "../player/Player";
import repeat from "@/utils/repeat";
import Particle from "./Particle";

class FireBall extends GameObject {
  constructor(
    parent: Game,
    options: {
      user: Player;
      angle: number;
      v: number;
      max: number;
      position: typePosition
    }
  ) {
    super(parent);
    const circle: typeCircle = {
      r: 0.15,
    };

    const { angle, v, max, position } = options;
    const t = max / v;
    
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
      circle,
      t,
    });

    new Updater(this, "render:ball", () => {
      const g = this.parent.g;
      g.cir({
        ...position,
        ...circle,
        color: "orange",
      });
    });
    
    new Updater(this, "render:shadow", () => {
      new Shadow(this.parent, {
        position: { ...position },
        circle: { ...circle },
        color: "#FFA500",
        timeLast: 0.2,
      });
    });

    this.after("destroy", () => {
      repeat(10 + Math.random() * 10).do(() => {
        new Particle(this.parent, {
          v: 2,
          max: Math.random() * 2,
          angle: Math.random() * Math.PI * 2,
          position: { ...position },
          circle: { r: circle.r / 5 },
          color: "#FFA500",
        });
      });
    });

    const { user } = options;
    new Collision({
      obj: this,
      groupId: user.id,
      type: "item",
      item: {
        position,
        circle,
      },
      attacked: (g) => {
        this.destroy();
      },
      attackTo: (c) => { },
      gift: () => {
        let damage = Math.floor(circle.r / 0.15 * 5);
        damage = Math.max(damage, 1);
        return {
          damage,
          position: { ...position },
        };
      },
    });
  }
}

export default FireBall;