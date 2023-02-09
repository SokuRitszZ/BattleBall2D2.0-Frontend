import GameObject from "./GameObject";
import { typeCollisionItem } from '@/game/types';
import C from "./C";

class Collision {
  public static cs: Collision[] = [];

  public static imitate() {
    const n = this.cs.length;
    const cs = [...this.cs];
    for (let i = 0; i < n; ++i)
      for (let j = i + 1; j < n; ++j) {
        const a = cs[i];
        const b = cs[j];
        if (this.isCollided(a, b)) {
          a.attacked(b.gift());
          a.attackTo(b);
          b.attacked(a.gift());
          b.attackTo(a);
        }
      }
  }

  public static isCollided(a: Collision, b: Collision) {
    if (a.groupId === b.groupId) return ;
    const na = a.items.length,
      nb = b.items.length;

    for (let i = 0; i < na; ++i)
      for (let j = 0; j < nb; ++j) {
        const x = a.items[i],
          y = b.items[j];
        const dist = C.dist(x.position, y.position);
        if (dist < x.circle.r + y.circle.r) {
          return true;
        }
      }

    return false;
  }

  public type: string;
  private obj: GameObject;
  private groupId: string | number;
  private items: typeCollisionItem[] = [];
  private attacked: (c: any) => void = () => {};
  private attackTo: (c: Collision) => void = () => {};
  private gift: Function = () => {};

  constructor(options: {
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

    Collision.cs.push(this);
    this.addItem(item);

    this.obj.before("destroy", () => {
      Collision.cs = Collision.cs.filter((obj) => obj !== this);
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