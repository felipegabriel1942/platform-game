import { Vector } from './vector';

export class Player {
  public position: Vector;

  constructor(position: Vector) {
    this.position = position;
  }

  get type(): string {
    return 'player';
  }

  public static create(position: Vector): Player {
    return new Player(position.plus(new Vector(0, -0.5)));
  }
}
