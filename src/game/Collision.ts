import GameObject from "./GameObject";
import { typeCollisionItem } from '@/game/types';
import Game from "./Game";

class Collision {
  public static cs: Collision[] = [];

  public type: string;
  private obj: GameObject;
  public groupId: string | number;
  public items: typeCollisionItem[] = [];
  public attacked: (c: any) => void = () => {};
  public attackTo: (c: Collision) => void = () => {};
  public gift: Function = () => {};

  constructor(parent: Game, options: {
    obj: GameObject,
    groupId: string,
    type: string,
    item: typeCollisionItem,
    attacked: (c: Collision) => void,
    attackTo: (c: Collision) => void,
    gift: () => any;
  }) {
    const { obj, groupId, type, item, attackTo, attacked, gift } = options;
    this.obj = obj;
    this.groupId = groupId;
    this.type = type;
    this.attacked = attacked;
    this.attackTo = attackTo;
    this.gift = gift;

    parent.cc.add(this);
    this.addItem(item);

    this.obj.before("destroy", () => {
      parent.cc.del(this);
    });
  }

  public addItem(item: typeCollisionItem) {
    this.items.push(item);
  }

  public getGroupId() {
    return this.groupId;
  }

  public setGroupId(groupId: string | number) {
    this.groupId = groupId;
  }
};

export default Collision;