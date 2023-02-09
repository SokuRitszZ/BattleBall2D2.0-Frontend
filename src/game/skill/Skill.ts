import Player from "../player/Player";

abstract class Skill {
  protected user: Player;
  protected cd: number;
  private timer: NodeJS.Timer | null = null;

  constructor(user: Player, cd: number) {
    this.user = user;
    this.cd = cd * 1000;
  }

  public try() {
    if (this.timer) return false;
    return true;
  } 

  public abstract use(...args: any): void;

  public resetTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = null;
    }, this.cd);
  }
}

export default Skill;