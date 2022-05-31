import { Vector } from './vector.model';

export abstract class GameObject {
  public position: Vector;

  constructor(position: Vector) {
    this.position = position;
  }

  public abstract get type(): string;

  public abstract create(position: Vector): any;
}
