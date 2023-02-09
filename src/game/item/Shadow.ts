import Game from "../Game";
import GameObject from "../GameObject";
import { typeColor, typePosition, typeCircle } from '@/game/types';
import Updater from "../updater/Updater";
import rgb2value from "@/utils/rgb2value";
import ZoomUpdater from "../updater/ZoomUpdater";

class Shadow extends GameObject {
  constructor(parent: Game, options: {
    position: typePosition;
    circle: typeCircle;
    color: typeColor;
  }) {
    super(parent);
    const { position, circle, color } = options;
    const timeLast = 0.25;
    let opacity = { value: 1 };
    
    const g = this.parent.g;
    new Updater(this, "render", () => {
      g.cir({
        ...position,
        ...circle,
        color: rgb2value(color as string, opacity.value),
      });
    });

    const vOpacity = Math.pow(0.05 / 1, 1 / timeLast);
    const updaterOpacity = new Updater(this, "update:opacity", () => {
      opacity.value *= Math.pow(vOpacity, this.delta);
      if (opacity.value < 0.05) opacity.value = 0;
      if (opacity.value === 0) {
        updaterOpacity.release();
        this.destroy();
      }
    });

    new ZoomUpdater(this, "update:circle", {
      circle,
      t: timeLast,
    });
  }
}

export default Shadow;