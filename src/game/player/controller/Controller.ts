import Game from '../../Game';
import GameObject from '../../GameObject';
import Player from '../Player';

class Controller extends GameObject {
  private events: {[key: string]: Function[]} = {};
  protected player: Player;
  
  constructor(parent: Game, player: Player) {
    super(parent);
    this.player = player;
  }

  public on(event: string, fn: Function) {
    const fns = this.events[event] || [];
    fns.push(fn);
    this.events[event] = fns;
  }

  public emit(event: string, data: any) {
    const fns = this.events[event] || [];
    fns.forEach(fn => fn(data));
  }
}

export default Controller;