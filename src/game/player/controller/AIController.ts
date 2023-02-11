import Controller from "./Controller";
import Player from "../Player";
import Game from "@/game/Game";
import { typePosition } from "@/game/types";
import Updater from "@/game/updater/Updater";

class AIController extends Controller {
  constructor(player: Player, options: {
    min: typePosition,
    max: typePosition,
  }) {
    super(player);
    const { min, max } = options;
    new Updater(player, "check:move", () => {
      if (!player.containsUpdater("move:target")) {
        const dx = max.x - min.x;
        const dy = max.y - min.y;
        player.targetTo({
          x: min.x + dx * Math.random(),
          y: min.y + dy * Math.random(),
        });
      }
    });
    
    new Updater(player, "check:skill", () => {
      const players = player.getParent().players;
      const n = players.length;
      Object.keys(player.skill).forEach(key => {
        if (Math.random() < 0.01)
          player.useSkill(key, {
            target: players[Math.floor(Math.random() * n)].position,
            position: player.position,
          });
      });
    });
  }
}

export default AIController;