import Container from "@/components/Container";
import Game from "@/game/Game";
import { useRef, useEffect } from 'react';
import { useContext } from 'react';
import { UserStore } from '@/store/user';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function GameView() {
  const $parent = useRef<HTMLDivElement>(null);
  const $canvas = useRef<HTMLCanvasElement>(null);
  const { user } = useContext(UserStore);
  const nav = useNavigate();
  const [isOver, setOver] = useState<boolean>(false);

  let game: Game;

  useEffect(() => {
    const _game = startGame();
    if (!_game) return ;
    game = _game;
    return () => {
      game.stop();
    };
  }, []);

  function startGame() {
    setOver(false);
    if (!$parent.current || !$canvas.current) return ;
    const _game = new Game($parent.current, $canvas.current);
    _game.start("single", user);
    let hasShown = false;
    _game.on("over", () => {
      if (hasShown) return ;
      hasShown = true;
      setOver(true);
    });
    return _game;
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
          <Button onClick={() => startGame()} > 再来 </Button>
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
  )
}

export default GameView;