export type typePosition = {
  x: number;
  y: number;
};

export type typeCircle = {
  r: number;
};

export type typeCollisionItem = {
  position: typePosition;
  circle: typeCircle;
};

export type typeAngle = {
  deg: number;
};

export type typeColor = string | CanvasGradient | CanvasPattern;
