import Skill from "./Skill";
import Player from '../player/Player';
import { typePosition } from "../types";
import TrackBall from "../item/TrackBall";

class ShootTrackBallSkill extends Skill {
  constructor(user: Player, cd: number) {
    super(user, cd);
  }

  public use(options: {
    position: typePosition;
  }): void {
    const { position } = options;
    let cnt = 0;
    let timer = setInterval(() => {
      new TrackBall(this.user.getParent(), {
        angle: { deg: (cnt * Math.PI * 2) / 3 },
        user: this.user,
        v: 10,
        t: 2,
        position: { ...position },
      });
      ++cnt;
      if (cnt === 3) clearInterval(timer);
    }, 100);
    this.resetTimer();
  }
}

export default ShootTrackBallSkill;