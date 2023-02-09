class Updater {
  private fn: Function;

  constructor(fn: Function) {
    this.fn = fn;
  }
  
  public use() {
    this.fn();
  }
}

export default Updater;