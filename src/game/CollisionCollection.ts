import C from "./C";
import Collision from "./Collision";

class CollisionCollection {
  public cs: Collision[] = [];

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

  constructor() {} 

  add(c: Collision) {
    this.cs.push(c);
  }

  del(c: Collision) {
    const cs = this.cs;
    this.cs = cs.filter(_c => _c !== c);
  }

  imitate() {
    const n = this.cs.length;
    const cs = [...this.cs];
    for (let i = 0; i < n; ++i)
      for (let j = i + 1; j < n; ++j) {
        const a = cs[i];
        const b = cs[j];
        if (CollisionCollection.isCollided(a, b)) {
          a.attacked(b.gift());
          a.attackTo(b);
          b.attacked(a.gift());
          b.attackTo(a);
        }
      }
  }
}

export default CollisionCollection;