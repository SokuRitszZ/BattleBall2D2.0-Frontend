
import GameObject from './../GameObject';

class Updater {
  protected obj: GameObject;
  protected tag: string;
  protected fn: Function;

  constructor(obj: GameObject, tag: string, fn: Function) {
    this.obj = obj;
    this.tag = tag;
    this.fn = fn;
    
    this.obj.addUpdater(tag, this);
  }
  
  public use() {
    this.fn();
  }

  public release() {
    this.obj.delUpdater(this.tag);
  }
}

export default Updater;