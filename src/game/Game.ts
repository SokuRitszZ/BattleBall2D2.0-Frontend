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
import { typeUser } from '@/store/user';
import { nanoid } from 'nanoid';
import CollisionCollection from './CollisionCollection';
import { typeSocketStore } from '@/store/socket';
import Handler from '@/utils/Handler';
import OnlineController from './player/controller/OnlineController';
import EventEmitter from '@/utils/EventEmitter';
import startSingleGame from './func/startSingleGame';
import startMultiGame from './func/startMultiGame';

type typeMode = "single" | "multi";

class Game {
  static cnt = 0;

  public id = nanoid(11);
  public g: G;
  public camera: Camera;
  public mouse: typePosition = { x: 0, y: 0 };

  private hasStarted = false;
  private hasOver = false;
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
  public ee: EventEmitter = new EventEmitter();

  public start(mode: typeMode, data: any) {
    if (this.hasStarted) return ;
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
    this.ee.emit("start");
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
        new PlayerController(options.player);
        this.camera.setPosition(options.player.position);
        break;
      case "ai":
        new AIController(options.player, {
          min: { x: 0, y: 0 },
          max: { x: 32, y: 18 },
        });
        break;
      case "ol":
        const { player, socket, isLocal } = options as {
          player: Player;
          socket: typeSocketStore;
          isLocal: boolean;
        };
        new OnlineController(player, socket, isLocal);
        isLocal && this.camera.setPosition(options.player.position);
        isLocal &&
          player.after("destroy", () => {
            socket.send("game:die", {});
          });
        break;
    }
    this.players.push(options.player);
  }

  public delPlayer(player: Player) {
    this.players = this.players.filter((_player) => _player !== player);
  }

  public gameOver() {
    if (this.hasOver) return ;
    this.hasOver = true;
    this.ee.emit("over");
  }

  private startWithMode(data: any) {
    switch (this.mode) {
      case "single":
        startSingleGame(this, data);
        break;
      case "multi":
        startMultiGame(this, data);
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