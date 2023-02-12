import Game from "../Game";
import GameObject from "../GameObject";
import Player from "../player/Player";
import { typeAngle } from "../types";
import { typePosition, typeCircle } from '@/game/types';
import MoveUpdater from './../updater/MoveUpdater';
import AngleUpdater from './../updater/AngleUpdater';
import Updater from "../updater/Updater";
import Shadow from "./Shadow";
import repeat from "@/utils/repeat";
import Particle from "./Particle";
import Collision from "../Collision";
import C from "../C";

class TrackBall extends GameObject {
  private target?: typePosition; 
  constructor(
    parent: Game,
    options: {
      user: Player;
      angle: typeAngle;
      v: number;
      t: number;
      position: typePosition;
    }
  ) {
    super(parent);
    const circle: typeCircle = {
      r: 0.1,
    };

    const { user, angle, v, t, position } = options;

    new MoveUpdater(this, "move", {
      position,
      angle,
      v,
      t,
      over: () => {
        this.destroy();
      },
    });

    const select = () => {
      const cs = this.parent.cc.cs.filter((c) => c.groupId !== user.id);
      let target = { x: 0, y: 0 };
      if (cs.length) {
        let min = Number.MAX_SAFE_INTEGER;
        target = cs.reduce((pre, cur) => {
          const d = C.dist(position, cur.items[0].position);
          if (d < min) {
            min = d;
            return cur;
          }
          return pre;
        }).items[0].position;
      }
      return target;
    };

    new AngleUpdater(this, "update:angle", {
      from: position,
      target: select,
      wAngle: Math.PI * 2,
      angle,
    });

    new Updater(this, "render:ball", () => {
      const g = this.parent.g;
      g.cir({
        ...position,
        ...circle,
        color: "#0000cc",
      });
    });

    new Updater(this, "render:shadow", () => {
      new Shadow(this.parent, {
        position: { ...position },
        circle: { ...circle },
        color: "#8888ff",
        timeLast: 0.4,
      }).delUpdater("update:zoom");
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

    new Collision(parent, {
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
      attackTo: (c) => {},
      gift: () => {
        let damage = Math.floor((circle.r / 0.10) * 3);
        damage = Math.max(damage, 1);
        return {
          damage,
          position: { ...position },
        };
      },
    });
  }
}

export default TrackBall;