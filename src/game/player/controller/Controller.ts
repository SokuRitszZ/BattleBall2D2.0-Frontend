import Game from '@/game/Game';
import GameObject from '@/game/GameObject';
import Player from '../Player';

class Controller {
  private events: {[key: string]: Function[]} = {};
  protected player: Player;
  
  constructor(player: Player) {
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