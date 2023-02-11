class EventEmitter {
  private events: {
    [key: string]: Function[];
  } = {};

  constructor() {}

  on(event: string, fn: Function) {
    const fns = this.events[event] || [];
    fns.push(fn);
    this.events[event] = fns;
  }

  off(event: string) {
    delete this.events[event];
  }

  emit(event: string, ...args: any) {
    const fns = this.events[event] || [];
    fns.forEach(fn => fn(...args));
  }
}

export default EventEmitter;