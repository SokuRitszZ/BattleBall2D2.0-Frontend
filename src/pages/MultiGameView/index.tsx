import Container from '@/components/Container';
import Game from '@/game/Game';
import { SocketStore, typeSocketStore } from '@/store/socket';
import { typeUser, UserStore } from '@/store/user';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { typePosition } from '@/game/types';

function MultiGameView() {
  const $parent = useRef<HTMLDivElement>(null);
  const $canvas = useRef<HTMLCanvasElement>(null);
  const { user } = useContext(UserStore);
  const nav = useNavigate();
  const [isOver, setOver] = useState<boolean>(false);
  const socket = useContext(SocketStore);

  let game: Game;

  useEffect(() => {
    socket.on("game:go", (data: any) => {
      startGame({
        ...data,
        socket,
        local: user,
      });
    });
    socket.on("game:over", (data: any) => {
      setOver(true);
    });
    socket.send("game:go", {
      position: {
        x: Math.floor(Math.random() * 32),
        y: Math.floor(Math.random() * 18),
      },
    });
    return () => {
      socket.send("game:act", {
        method: "destroy",
        args: [],
      });
      socket.off("game:go");
      socket.off("game:over");
    };
  }, []);

  useEffect(() => {
    return () => {
      game.stop();
    };
  }, []);

  function startGame(data: {
    useSocket: Function,
    local: typeUser,
    positions: typePosition[],
    users: typeUser[],
  }) {
    setOver(false);
    if (!$parent.current || !$canvas.current) return ;
    const _game = new Game($parent.current, $canvas.current);
    _game.start("multi", data);
    let hasShown = false;
    _game.on("over", () => {
      if (hasShown) return ;
      hasShown = true;
      setOver(true);
    });
    game = _game;
  }

  function Button(props: any) {
    return <button className="rounded-lg text-2xl px-3 py-2 bg-slate-100 hover:bg-slate-200 active:ring-2 ring-slate-300" onClick={props.onClick}>{props.children}</button>
  }

  function isGameOver() {
    return (
      <div
        className="bg-gray-400 opacity-80 rounded-xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[300px] h-[300px] z-10
        p-5
      "
      >
        <div className="text-center text-3xl font-bold">游戏结束</div>
        <div className="flex flex-col items-center mt-10 gap-7">
          <Button onClick={() => nav("/lobby")}>退出</Button>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div ref={$parent} className="relative w-full h-full p-10 flex justify-center items-center">
        {isOver && isGameOver()}
        <canvas ref={$canvas} className="rounded-xl bg-lime-400 w-full h-full"/>
      </div>
    </Container>
  );
}

export default MultiGameView;