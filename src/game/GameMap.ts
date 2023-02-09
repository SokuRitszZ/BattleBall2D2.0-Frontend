import Game from "./Game";
import GameObject from "./GameObject";
import { typePosition } from "./types";
import Updater from './updater/Updater';

class GameMap extends GameObject {
  private size: typePosition;

  constructor(parent: Game, options: {
    size: typePosition,
  }) {
    super(parent);
    this.size = options.size;
    new Updater(this, "render:map", () => {
      const { x: lx, y: ly } = this.size;
      const g = this.parent.g;
      g.rec({
        x: 0,
        y: 0,
        lx,
        ly,
        color: "#000"
      });
    });
    
    new Updater(this, "render:ping", () => {
      const g = this.parent.g;
      const {x, y} = this.size;
      for (let i = 0; i <= x; ++i) {
        for (let j = 0; j <= y; ++j) {
          g.cir({
            x: i,
            y: j,
            r: 0.05,
            color: "#888",
          });
        }
      }
    });
  }
}

export default GameMap;