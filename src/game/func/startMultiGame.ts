import { typeSocketStore } from "@/store/socket";
import { typeUser } from "@/store/user";
import Game from "../Game";
import Player from "../player/Player";
import { typePosition } from "../types";

function startMultiGame(game: Game, data: any) {
  const { positions, users, local, socket } = data as {
    socket: typeSocketStore;
    local: typeUser;
    positions: typePosition[];
    users: typeUser[];
  };
  users.forEach((u, i) => {
    const p = positions[i];
    const player = new Player(game, {
      avatar: u.avatar,
      position: { ...p },
    });
    player.id = u.id;
    game.addPlayer("ol", {
      isLocal: local.id === u.id,
      socket,
      player,
    });
  });
}

export default startMultiGame;
