import Game from '../Game';
import GameObject from '../GameObject';
import { typePosition } from '../types';
import Updater from '../updater/Updater';
import MoveTargetUpdater from '../updater/MoveTargetUpdater';

class Player extends GameObject {
  private position: typePosition;
  private avatar: string;
  private speed: number = 0;

  constructor(parent: Game, options: {
    avatar: string,
    position: typePosition,
  }) {
    super(parent);
    
    this.position = options.position;
    this.avatar = options.avatar;

    if (/^\#\d{3}$/.test(this.avatar) || /^\#\d{6}$/.test(this.avatar)) {
      new Updater(this, "render", () => {
        const g = this.parent.g;
        g.cir({
          ...this.position,
          r: 0.5,
          color: this.avatar,
        });
      });
    } else {
      const img = document.createElement("img");
      img.src = this.avatar;
      new Updater(this, "render", () => {
        const g = this.parent.g;
        g.cirClip({
          ...this.position,
          r: 0.5,
          image: img, 
        })
      });
    }
  }

  public targetTo(target: typePosition) {
    this.delUpdater("move:target");
    new MoveTargetUpdater(this, "move:target", {
      position: this.position,
      target,
      v: 1,
    });
  }

  public getPosition() {
    return this.position;
  }
}

export default Player;