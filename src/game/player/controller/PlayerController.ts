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

  constructor(parent: Game, player: Player) {
    super(parent, player);

    this.addHandler({
      target: this.parent.$canvas,
      event: "mousedown",
      fn: (e: MouseEvent) => {
        if (e.button === 2) {
          const { x, y } = this.parent.camera.real({
            x: e.offsetX,
            y: e.offsetY,
          });
          player.targetTo({ x, y });
        }
      }
    });

    this.addHandler({
      target: this.parent.$canvas,
      event: "mousemove",
      fn: (e: MouseEvent) => {
        const { x, y } = this.parent.camera.real({
          x: e.offsetX,
          y: e.offsetY,
        });
        this.parent.mouse.x = x;
        this.parent.mouse.y = y;
      } 
    });

    this.addHandler({
      target: this.parent.$canvas,
      event: "contextmenu",
      fn: (e: MouseEvent) => {
        e.preventDefault();
      } 
    });

    this.addHandler({
      target: window,
      event: "keyup",
      fn: (e: KeyboardEvent) => {
        player.useSkill(e.key, {
          target: this.parent.mouse,
          position: player.getPosition(),
        });
      }
    })

    this.before("destroy", () => {
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