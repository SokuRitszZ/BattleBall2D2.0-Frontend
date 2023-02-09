import Game from "./Game";
import GameObject from "./GameObject";
import { typePosition } from "./types";
import Updater from './Updater';

class GameMap extends GameObject {
  private size: typePosition;

  constructor(parent: Game, options: {
    size: typePosition,
  }) {
    super(parent);
    this.size = options.size;

    this.addUpdater("render:map", new Updater(() => {
      const { x: lx, y: ly } = this.size;
      const g = this.parent.g;
      g.rec({
        x: 0,
        y: 0,
        lx,
        ly,
        color: "#000"
      });
    }));
    
    this.addUpdater("render:ping", new Updater(() => {
      const g = this.parent.g;
      for (let i = 0; i <= 16; ++i) {
        for (let j = 0; j <= 9; ++j) {
          g.cir({
            x: i,
            y: j,
            r: 0.05,
            color: "#888",
          });
        }
      }
    }));
  }
}

export default GameMap;