import { GameActorTypeEnum } from '../@enums/game-actor-type.enum';
import { GameActor } from './game-actor.model';
import { GameObject } from './game-object.model';
import { State } from './state.model';
import { Vector } from './vector.model';

export class Coin extends GameObject {
  public basePosition: Vector;
  public wobble: number;
  private wobbleSpeed = 8;
  private wobbleDistance = 0.07;

  constructor(position?: Vector, basePosition?: Vector, wobble?: number) {
    super();

    this.position = position;
    this.basePosition = basePosition;
    this.wobble = wobble;
    this.size = new Vector(0.6, 0.6);
  }

  public type(): GameActorTypeEnum {
    return GameActorTypeEnum.COIN;
  }

  public create(vector: Vector): GameActor {
    const basePosition = vector.plus(new Vector(0.2, 0.1));
    return new Coin(basePosition, basePosition, Math.random() * Math.PI * 2);
  }

  public update(time: number): GameActor {
    const wobble = this.wobble + time * this.wobbleSpeed;
    const wobblePos = Math.sin(wobble) * this.wobbleDistance;

    return new Coin(
      this.basePosition.plus(new Vector(0, wobblePos)),
      this.basePosition,
      wobble
    );
  }

  public collide(state: State): State {
    const filtered = state.actors.filter((a) => a !== this);
    let status = state.status;

    if (!filtered.some((a) => a.type() === GameActorTypeEnum.COIN)) {
      status = 'won';
    }

    return new State(state.level, filtered, status);
  }
}
