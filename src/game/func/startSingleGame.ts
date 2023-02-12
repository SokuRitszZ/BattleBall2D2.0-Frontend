import { typeUser } from "@/store/user";
import leftpad from "@/utils/leftpad";
import repeat from "@/utils/repeat";
import Game from "../Game";
import Player from "../player/Player";

function startSingleGame(game: Game, data: any) {
  const player = new Player(game, {
    avatar: (data as typeUser).avatar || "#654321",
    position: {
      x: Math.random() * 32,
      y: Math.random() * 18,
    },
  });
  game.addPlayer("pc", { player });
  repeat(10).do(() => {
    const player = new Player(game, {
      avatar: `#${leftpad((Math.random() * 1000000) >>> 0, 6)}`,
      position: {
        x: Math.random() * 16,
        y: Math.random() * 9,
      },
    });
    game.addPlayer("ai", { player });
  });
}

export default startSingleGame;
