import Player from "../player/Player";
import { typePosition } from "../types";
import Skill from "./Skill";

class Flash extends Skill {
  constructor(user: Player, cd: number) {
    super(user, cd);
  }

  public use(options: { target: typePosition }): void {
    const { target } = options;
    this.user.position.x = target.x;
    this.user.position.y = target.y;
    this.resetTimer();
  }
}

export default Flash;