import { GameActorTypeEnum } from '../@enums/game-actor-type.enum';
import { Direction } from './direction.model';
import { State } from './state.model';
import { Vector } from './vector.model';

export abstract class GameActor {
  public position: Vector;
  public size: Vector;

  public abstract create(vector: Vector, char?: string): GameActor;
  public abstract update(time: number, state?: State, direction?: Direction): GameActor;
  public abstract type(): GameActorTypeEnum;
}
