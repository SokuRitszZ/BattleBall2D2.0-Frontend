import Skill from "./Skill";
import Player from './../player/Player';
import { typePosition } from "../types";
import FireBall from "../item/FireBall";
import C from "../C";

class ShootFireBallSkill extends Skill {
  constructor(user: Player, cd: number) {
    super(user, cd);
  }

  public use(options: {
    target: typePosition;
    position: typePosition;
  }): void {
    const { target, position } = options;
    const angle = C.angle(position, target);
    new FireBall(this.user.getParent(), {
      angle,
      v: 4,
      max: 8,
      position: { ...position },
    });
    this.resetTimer();
  }
}

export default ShootFireBallSkill;