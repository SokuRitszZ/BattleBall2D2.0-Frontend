import Game from '../Game';
import GameObject from '../GameObject';
import Updater from '../updater/Updater';
import MoveTargetUpdater from '../updater/MoveTargetUpdater';
import Skill from '../skill/Skill';
import ShootFireBallSkill from '../skill/ShootFireBallSkill';
import { typeCircle, typePosition } from '@/game/types';
import Collision from '../Collision';
import C from '../C';
import repeat from '@/utils/repeat';
import Particle from '../item/Particle';

class Player extends GameObject {
  private position: typePosition;
  private avatar: string;
  public skill: { [key: string]: Skill } = {};

  private _HP: number = 10;
  get HP() {
    return this._HP;
  }
  set HP(val) {
    if (val <= 0) this.destroy();
    this._HP = val;
  }

  constructor(
    parent: Game,
    options: {
      avatar: string;
      position: typePosition;
    }
  ) {
    super(parent);
    const { position, avatar } = options;

    this.position = position;
    this.avatar = avatar;
    const circle = { r: 0.5 };

    this.after("destroy", () => {
      this.parent.delPlayer(this);
    });

    if (/^\#\d{3}$/.test(this.avatar) || /^\#\d{6}$/.test(this.avatar)) {
      new Updater(this, "render", () => {
        const g = this.parent.g;
        g.cir({
          ...this.position,
          ...circle,
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
          ...circle,
          image: img,
        });
      });
    }

    // test
    this.addSkill("q", new ShootFireBallSkill(this, 0.5));

    this.after("destroy", () => {
      repeat(10 + Math.random() * 10).do(() => {
        new Particle(this.parent, {
          v: 3,
          max: Math.random() * 2,
          angle: Math.random() * Math.PI * 2,
          position: { ...position },
          circle: { r: circle.r / 5 },
          color: "#880000",
        });
      });
    });

    // 设置为碰撞体
    new Collision({
      obj: this,
      groupId: this.id,
      type: "player",
      item: {
        position,
        circle,
      },
      attackTo(c: Collision) {},
      attacked: (g: any) => {
        const { damage, position } = g;
        if (damage) {
          this.HP -= damage;
          if (this.HP < 0) this.HP = 0;
          if (this.HP === 0) this.destroy();
          else {
            const a = 4;
            let v = damage;
            let angle = C.angle(position, this.position);

            const u = new Updater(this, "update:attacked", () => {
              const mov = v * this.delta;
              this.position.x += mov * Math.cos(angle);
              this.position.y += mov * Math.sin(angle);
              v -= a * this.delta;
              if (v < 0) v = 0;
              if (v === 0) {
                u.release();
              }
            });
          }
        }
      },
      gift() {
        return {};
      },
    });

    // 死后要判断游戏是否结束
    this.after("destroy", () => {
      this.parent.players.length <= 1 && this.parent.gameOver();
    }).after("destroy", () => {
      if (this.parent.players.length)
        this.parent.camera.position === this.position &&
          this.parent.camera.setPosition(this.parent.players[0].position);
    });

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
    if (!this.skill[key]) return;
    if (!this.skill[key].try()) return;
    this.skill[key].use(...args);
  }
}

export default Player;