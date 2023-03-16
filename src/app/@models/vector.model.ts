export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public plus(newPosition: Vector): Vector {
    return new Vector(this.x + newPosition.x, this.y + newPosition.y);
  }

  public times(factor: number): Vector {
    return new Vector(this.x * factor, this.y * factor);
  }
}
