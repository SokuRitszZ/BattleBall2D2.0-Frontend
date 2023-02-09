import Game from "./Game";
import Updater from "./updater/Updater";
import { nanoid } from "nanoid";

type typeEvent = "start" | "update" | "destroy";

type typeCallbackEvent = {
  [key: string]: Function[];
};

class GameObject {
  public hasCreated: boolean = false;
  public hasDestroyed: boolean = false;

  public id: string;

  private eventBefore: typeCallbackEvent;
  private eventAfter: typeCallbackEvent;
  protected parent: Game;

  private _delta: number = 0;

  private updaters: {[key: string]: Updater[]};
  
  get delta() {
    return this._delta / 1000;
  }
  
  set delta(val: number) {
    this._delta = val;
  }
  
  constructor(parent: Game) {
    this.parent = parent;
    this.id = nanoid(11);
    this.eventBefore = {};
    this.eventAfter = {};
    this.updaters = {};

    this.parent.addObj(this);
  }

  public getParent() {
    return this.parent;
  }

  public start() {
    if (this.hasCreated) return ;
    this.callBefore("start");
    this.hasCreated = true;
    this.callAfter("start");
    return this;
  }

  public update() {
    this.callBefore("update");
    const values = Object.values(this.updaters);
    values.forEach((listU) =>
      listU.forEach((u) => u.use())
    );
    this.callAfter("update");
    return this;
  }

  public destroy() {
    if (this.hasDestroyed) return ;
    this.callBefore("destroy");
    this.parent.delObj(this);
    this.hasDestroyed = true;
    this.callAfter("destroy");
    return this;
  }

  public before(event: typeEvent, fn: Function) {
    const fns = this.eventBefore[event] || [];
    fns.push(fn);
    this.eventBefore[event] = fns;
    return this;
  }

  public after(event: typeEvent, fn: Function) {
    const fns = this.eventAfter[event] || [];
    fns.push(fn);
    this.eventAfter[event] = fns;
    return this;
  }

  public addUpdater(tag: string, updater: Updater) {
    const fns = this.updaters[tag] || [];
    fns.push(updater);
    this.updaters[tag] = fns;
    return this;
  }

  public containsUpdater(tag: string) {
    return !!((this.updaters[tag] || []).length);
  }

  public delUpdater(tag: string, u?: Updater) {
    let list = this.updaters[tag] || [];
    if (u) list = list.filter(_u => _u !== u);
    else list = [];
    this.updaters[tag] = list;
    return this;
  }

  private callBefore(event: typeEvent) {
    const fns = this.eventBefore[event] || [];
    fns.forEach(fn => fn());
  }

  private callAfter(event: typeEvent) {
    const fns = this.eventAfter[event] || [];
    fns.forEach(fn => fn());
  }
}

export default GameObject;