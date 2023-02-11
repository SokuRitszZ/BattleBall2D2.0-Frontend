import G from './G';
import GameObject from './GameObject';
import Camera from './Camera';
import GameMap from './GameMap';
import Player from './player/Player';
import PlayerController from './player/controller/PlayerController';
import AIController from './player/controller/AIController';
import leftpad from '@/utils/leftpad';
import { typePosition } from '@/game/types';
import Updater from './updater/Updater';
import Collision from './Collision';
import { typeUser } from '@/store/user';
import { nanoid } from 'nanoid';
import CollisionCollection from './CollisionCollection';
import { typeSocketStore } from '@/store/socket';
import Handler from '@/utils/Handler';
import OnlineController from './player/controller/OnlineController';

type typeMode = "single" | "multi";

class Game {
  static cnt = 0;

  public id = nanoid(11);
  public g: G;
  public camera: Camera;
  public mouse: typePosition = { x: 0, y: 0 };

  private hasStarted = false;
  private hasStopped = false;

  public players: Player[] = [];

  private $parent: HTMLDivElement;
  public $canvas: HTMLCanvasElement;

  public localUser?: typeUser;
  public cc: CollisionCollection = new CollisionCollection();

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    this.$parent = $parent;
    this.$canvas = $canvas;

    this.camera = new Camera(this).setPosition({ x: 0, y: 0 }).setRatio(1);
    this.g = new G($canvas.getContext("2d")!, this.camera);
  }

  private objs: GameObject[] = [];
  private mode: typeMode = "single";
  private engine: number = 0;
  private timeStepLast: number = -1;

  private hd: Handler = new Handler();

  public start(mode: typeMode, data: any) {
    this.mode = mode;
    const engine = (timeStepLast: number) => {
      if (this.hasStopped) return;
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
    };
    this.engine = requestAnimationFrame(engine);

    this.resize();
    
    this.hd.add({
      target: window,
      event: "resize",
      fn: () => {
        this.resize();
      },
    });

    // game map
    new GameMap(this, {
      size: {
        x: 32,
        y: 18,
      },
    });

    this.startWithMode(data);
    this.hasStarted = true;
  }

  public stop() {
    this.hasStopped = true;
    this.objs.forEach((obj) => obj.destroy());
    this.objs = [];
    cancelAnimationFrame(this.engine);
    this.hd.clear();
  }

  public addObj(obj: GameObject) {
    this.objs.push(obj);
  }

  public delObj(obj: GameObject) {
    this.objs = this.objs.filter((_obj) => obj !== _obj);
  }

  public addPlayer(type: string, options: any) {
    switch (type) {
      case "pc":
        {
          new PlayerController(options.player);
          this.camera.setPosition(options.player.position);
        }
        break;
      case "ai":
        {
          new AIController(options.player, {
            min: { x: 0, y: 0 },
            max: { x: 32, y: 18 },
          });
        }
        break;
      case "ol":
        {
          const { player, socket, isLocal } = options;
          new OnlineController(player, socket, isLocal);
          isLocal && this.camera.setPosition(options.player.position);
        }
        break;
    }
    this.players.push(options.player);
  }

  public delPlayer(player: Player) {
    this.players = this.players.filter((_player) => _player !== player);
  }

  public gameOver() {
    this.emit("over");
  }

  private events: { [key: string]: Function[] } = {};

  public on(event: string, fn: Function) {
    const fns = this.events[event] || [];
    fns.push(fn);
    this.events[event] = fns;
  }

  public off(event: string, ) {
    this.events[event] = [];
  }

  public emit(event: string, ...args: any[]) {
    const fns = this.events[event] || [];
    fns.forEach(fn => fn(...args));
  }

  private startWithMode(data: any) {
    switch (this.mode) {
      case "single":
        {
          const player = new Player(this, {
            avatar: (data as typeUser).avatar || "#654321",
            position: {
              x: Math.random() * 32,
              y: Math.random() * 18,
            },
          });
          this.addPlayer("pc", { player });

          for (let i = 0; i < 10; ++i) {
            const player = new Player(this, {
              avatar: `#${leftpad((Math.random() * 1000000) >>> 0, 6)}`,
              position: {
                x: Math.random() * 16,
                y: Math.random() * 9,
              },
            });
            this.addPlayer("ai", { player });
          }
        }
        break;
      case "multi":
        {
          const { positions, users, local, socket } = data as {
            socket: typeSocketStore,
            local: typeUser,
            positions: typePosition[];
            users: typeUser[];
          };
          users.forEach((u, i) => {
            const p = positions[i];
            const player = new Player(this, {
              avatar: u.avatar,
              position: { ...p },
            });
            player.id = u.id;
            this.addPlayer("ol", {
              isLocal: local.id === u.id,
              socket,
              player,
            });
          });
        }
        break;
    }
    const c = new GameObject(this);
    new Updater(c, "collision", () => {
      this.cc.imitate();
    });
  }

  private resize() {
    const rect = this.$parent.getBoundingClientRect();
    const { width, height } = {
      width: (rect.width * 5) / 6,
      height: (rect.height * 5) / 6,
    };
    const scale = Math.floor(Math.min(width / 16, height / 9));
    this.$canvas.style.setProperty("width", `${16 * scale}px`);
    this.$canvas.style.setProperty("height", `${9 * scale}px`);
    // 记得同时也要修改画布的大小
    this.g.c.canvas.width = 16 * scale;
    this.g.c.canvas.height = 9 * scale;
    this.camera
      .setScale(scale)
      .setSize({ x: 16, y: 9 })
      .setMinMax({
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: 32 - 16,
          y: 18 - 9,
        },
      });
  }
}

export default Game;