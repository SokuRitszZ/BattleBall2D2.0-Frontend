import Game from '../Game';
import GameObject from '../GameObject';
import { typePosition } from '../types';
import Updater from '../updater/Updater';
import MoveTargetUpdater from '../updater/MoveTargetUpdater';
import Skill from '../skill/Skill';
import ShootFireBallSkill from '../skill/ShootFireBallSkill';
import { typeCircle } from '@/game/types';

class Player extends GameObject {
  private position: typePosition;
  private circle: typeCircle;
  private avatar: string;
  private speed: number = 0;
  private skill: {[key: string]: Skill} = {};

  constructor(parent: Game, options: {
    avatar: string,
    position: typePosition,
  }) {
    super(parent);
    
    this.position = options.position;
    this.avatar = options.avatar;
    this.circle = { r: 0.5 };

    if (/^\#\d{3}$/.test(this.avatar) || /^\#\d{6}$/.test(this.avatar)) {
      new Updater(this, "render", () => {
        const g = this.parent.g;
        g.cir({
          ...this.position,
          ...this.circle,
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
          ...this.circle,
          image: img, 
        })
      });
    }

    // test
    this.addSkill("q", new ShootFireBallSkill(this, 0.5));
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

  public addSkill(key: string, skill: Skill) {
    this.skill[key] = skill;
  }
  
  public useSkill(key: string, ...args: any) {
    if (!this.skill[key]) return ;
    if (!this.skill[key].try()) return ;
    this.skill[key].use(...args);
  }
}

export default Player;