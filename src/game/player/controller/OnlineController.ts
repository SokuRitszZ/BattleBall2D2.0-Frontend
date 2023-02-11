import { typeSocketStore } from "@/store/socket";
import Player from "../Player";
import Controller from "./Controller";
import { typePosition } from "@/game/types";
import Handler from "@/utils/Handler";

class OnlineController extends Controller {
  constructor(player: Player, socket: typeSocketStore, isLocal: boolean) {
    super(player);

    socket.on(`game:act:${player.id}`, (data: any) => {
      const { position, method, args } = data as {
        position: typePosition;
        method: string;
        args: any[];
      };
      player.position.x = position.x;
      player.position.y = position.y;
      // @ts-ignore
      player[method](...args);
    });

    player.before("destroy", () => {
      socket.off(`game:act:${player.id}`);
    });

    if (!isLocal) return;

    const hd = new Handler();
    hd.add({
      target: player.getParent().$canvas,
      event: "mousedown",
      fn: (e: MouseEvent) => {
        if (e.button === 2) {
          const target = player.getParent().camera.real({
            x: e.offsetX,
            y: e.offsetY,
          });
          if (player.HP > 0) {
            socket.send("game:act", {
              position: player.position,
              method: "targetTo",
              args: [target],
            });
          }
        }
      },
    });

    hd.add({
      target: player.getParent().$canvas,
      event: "mousemove",
      fn: (e: MouseEvent) => {
        const { x, y } = player.getParent().camera.real({
          x: e.offsetX,
          y: e.offsetY,
        });
        player.getParent().mouse.x = x;
        player.getParent().mouse.y = y;
      },
    });

    hd.add({
      target: player.getParent().$canvas,
      event: "contextmenu",
      fn: (e: MouseEvent) => {
        e.preventDefault();
      },
    });

    hd.add({
      target: window,
      event: "keyup",
      fn: (e: KeyboardEvent) => {
        const k = e.key; if (player.hasDestroyed) return;
        if (!player.skill[k] || !player.skill[k].try()) return;
        socket.send("game:act", {
          position: player.position,
          method: "useSkillIgnoreCD",
          args: [
            k,
            {
              target: player.getParent().mouse,
              position: player.position,
            },
          ],
        });
      },
    });

    player.before("destroy", () => {
      hd.clear();
    });
  }
}

export default OnlineController;
