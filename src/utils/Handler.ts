class Handler {
  private handlers: typeHandler[] = [];

  constructor() {}

  add(handler: typeHandler) {
    const { target, event, fn } = handler;
    target.addEventListener(event, fn);
    this.handlers.push(handler);
  }

  clear() {
    this.handlers.forEach((handler) => {
      const { target, event, fn } = handler;
      target.removeEventListener(event, fn);
    });
    this.handlers = [];
  }
}

export default Handler;

type typeHandler = {
  target: HTMLElement | Window;
  event: string;
  fn: any;
};
  
