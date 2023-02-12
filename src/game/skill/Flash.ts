import C from "../C";
import Player from "../player/Player";
import { typePosition } from "../types";
import Skill from "./Skill";

class Flash extends Skill {
  constructor(user: Player, cd: number) {
    super(user, cd);
  }

  public use(options: { target: typePosition }): void {
    const { target } = options;
    let d = C.dist(this.user.position, target);
    let angle = C.angle(this.user.position, target);
    if (d > 5) d = 5;
    this.user.position.x += d * Math.cos(angle);
    this.user.position.y += d * Math.sin(angle);
    this.resetTimer();
  }
}

export default Flash;