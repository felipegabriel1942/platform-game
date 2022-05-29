export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  plus(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
}
