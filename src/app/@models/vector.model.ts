export class Vector {
  public posX: number;
  public posY: number;

  constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
  }

  plus(lastPosition: Vector): Vector {
    return new Vector(
      this.posX + lastPosition.posX,
      this.posY + lastPosition.posY
    );
  }
}
