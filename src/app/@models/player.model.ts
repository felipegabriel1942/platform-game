import { GameObject } from './game-object.model';
import { Vector } from './vector.model';

export class Player extends GameObject {
  constructor(position: Vector) {
    super(position);
  }

  public get type(): string {
    return 'player';
  }

  public create(position: Vector): Player {
    return new Player(position.plus(new Vector(0, -0.5)));
  }
}
