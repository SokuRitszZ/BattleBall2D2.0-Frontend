import G from './G';
import GameObject from './GameObject';
import Camera from './Camera';
import GameMap from './GameMap';

type typeMode = "single" | "multi";

class Game {
  static cnt = 0;

  public g: G;
  public camera: Camera;

  private hasStarted = false;
  private hasStopped = false;
  
  private $parent: HTMLDivElement;
  private $canvas: HTMLCanvasElement;
  
  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    this.$parent = $parent;
    this.$canvas = $canvas;

    this.camera = new Camera(this).setPosition({x: 0, y: 0}).setRatio(4);
    this.g = new G($canvas.getContext("2d")!, this.camera);
  }

  private objs: GameObject[] = [];
  private mode: typeMode = "single";
  private engine: number = 0;
  private timeStepLast: number = -1;

  public start(mode: typeMode, data: any) {
    this.mode = mode;
    const engine = (timeStepLast: number) => {
      if (this.hasStopped) return ;
      this.objs.forEach((obj) => {
        if (obj.hasCreated) {
          obj.delta = timeStepLast - this.timeStepLast;
          obj.update();
        } else {
          obj.start();
        }
      });
      this.timeStepLast = timeStepLast;
      requestAnimationFrame(engine);
      this.hasStarted = true;
    };
    this.engine = requestAnimationFrame(engine);
    
    this.resize();
    this.addHandler(window, "resize", () => {
      this.resize();
    });

    // game map
    new GameMap(this, {
      size: {
        x: 16,
        y: 9,
      }
    });
  }

  public stop() {
    this.hasStopped = true;
    this.objs.forEach((obj) => obj.destroy());
    this.objs = [];
    cancelAnimationFrame(this.engine);
    this.clearHandler();
  }

  public addObj(obj: GameObject) {
    this.objs.push(obj);
  }

  public delObj(obj: GameObject) {
    this.objs = this.objs.filter(_obj => obj !== _obj);
  }

  private handlers: { target: HTMLElement | Window; event: string; fn: any }[] = [];

  private addHandler(target: HTMLElement | Window, event: string, fn: any) {
    target.addEventListener(event, fn);
    this.handlers.push({
      target,
      event,
      fn,
    });
  }

  private clearHandler() {
    this.handlers.forEach(handler => {
      const { target, event, fn } = handler;
      target.removeEventListener(event, fn);
    });
  }

  private resize() {
    const rect = this.$parent.getBoundingClientRect();
    const {
      width,
      height,
    } = {
      width: rect.width * 5 / 6,
      height: rect.height * 5 / 6,
    };
    const scale = Math.floor(Math.min(width / 16, height / 9));
    this.$canvas.style.setProperty('width', `${16 * scale}px`);
    this.$canvas.style.setProperty('height', `${9 * scale}px`);
    // 记得同时也要修改画布的大小
    this.g.c.canvas.width = 16 * scale;
    this.g.c.canvas.height = 9 * scale;
    this.camera
      .setScale(scale)
      .setSize({ x: 4, y: 2.25 })
      .setMinMax({
        min: {
          x: 0, y: 0,
        },
        max: {
          x: 16 - 8, y: 9 - 4.5,
        }
      });
      
  }
}

export default Game;