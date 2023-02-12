import Game from "@/game/Game";
import Player from "../Player";
import Controller from "./Controller";

type typeHandler = {
  target: HTMLElement | Window;
  event: string;
  fn: any;
};

class PlayerController extends Controller {
  private handlers: typeHandler[] = [];

  constructor(player: Player) {
    super(player);

    this.addHandler({
      target: player.getParent().$canvas,
      event: "mousedown",
      fn: (e: MouseEvent) => {
        if ([0, 2].includes(e.button)) {
          const { x, y } = player.getParent().camera.real({
            x: e.offsetX,
            y: e.offsetY,
          });
          if (player.HP > 0) player.targetTo({ x, y });
        }
      }
    });

    this.addHandler({
      target: player.getParent().$canvas,
      event: "mousemove",
      fn: (e: MouseEvent) => {
        const { x, y } = player.getParent().camera.real({
          x: e.offsetX,
          y: e.offsetY,
        });
        player.getParent().mouse.x = x;
        player.getParent().mouse.y = y;
      } 
    });

    this.addHandler({
      target: player.getParent().$canvas,
      event: "contextmenu",
      fn: (e: MouseEvent) => {
        e.preventDefault();
      } 
    });

    this.addHandler({
      target: window,
      event: "keyup",
      fn: (e: KeyboardEvent) => {
        if (player.HP === 0) return ;
        player.useSkill(e.key, {
          target: player.getParent().mouse,
          position: player.position,
        });
      }
    });

    player.before("destroy", () => {
      this.clear();
    });
  }

  private addHandler(handler: typeHandler) {
    const { target, event, fn } = handler;
    target.addEventListener(event, fn);
    this.handlers.push(handler);
  }

  private clear() {
    this.handlers.forEach((handler) => {
      const { target, event, fn } = handler;
      target.removeEventListener(event, fn);
    });
  }
}

export default PlayerController;