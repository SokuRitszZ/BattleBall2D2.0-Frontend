import inner from '@/utils/inner';
import Game from './Game';
import GameObject from './GameObject';
import { typePosition } from './types';

class Camera extends GameObject {
  private scale: number = 1;
  private ratio: number = 1; 
  public position: typePosition = { x: 0, y: 0 };
  private size: typePosition = { x: 0, y: 0 };
  private min: typePosition = { x: 0, y: 0 };
  private max: typePosition = { x: 999, y: 999 };

  constructor(parent: Game) {
    super(parent);

    this.before("destroy", () => {
      this.delUpdater("move");
    });
  }

  public setPosition(position: typePosition) {
    this.position = position;
    return this;
  }

  public setScale(scale: number) {
    this.scale = scale;
    return this;
  }

  public setRatio(ratio: number) {
    this.ratio = ratio;
    return this;
  }

  public setSize(size: typePosition) {
    this.size = size;
    return this;
  }

  public setMinMax(minMax: {min: typePosition, max: typePosition}) {
    const { min, max } = minMax;
    this.min = min;
    this.max = max;
    return this;
  }

  public offset(position: typePosition) {
    const { ox, oy } = this.o();
    return {
      x: Math.floor((position.x - ox) * this.scale * this.ratio),
      y: Math.floor((position.y - oy) * this.scale * this.ratio),
    } as typePosition;
  }
  
  public real(position: typePosition) {
    const { ox, oy } = this.o();
    return {
      x: ox + position.x / (this.scale * this.ratio),
      y: oy + position.y / (this.scale * this.ratio),
    } as typePosition;
  }
  
  public scaled(x: number) {
    return x * this.scale * this.ratio;
  }

  private o() {
    let ox = this.position.x - this.size.x / 2;
    let oy = this.position.y - this.size.y / 2;
    ox = inner(ox, this.min.x, this.max.x);
    oy = inner(oy, this.min.y, this.max.y);
    return { ox, oy };
  }
}

export default Camera;