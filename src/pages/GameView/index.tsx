import Container from "@/components/Container";
import Game from "@/game/Game";
import { useRef, useEffect } from 'react';

function GameView() {
  const $parent = useRef<HTMLDivElement>(null);
  const $canvas = useRef<HTMLCanvasElement>(null);
  let game: Game;

  useEffect(() => {
    if (!$parent.current || !$canvas.current) return ;
    game = new Game($parent.current, $canvas.current);
    game.start("single", {});
    return () => {
      game.stop();
    };
  }, []);

  return (
    <Container>
      <div ref={$parent} className="w-full h-full p-10 flex justify-center items-center">
        <canvas ref={$canvas} className="rounded-xl bg-lime-400 w-full h-full"/>
      </div>
    </Container>
  )
}

export default GameView;