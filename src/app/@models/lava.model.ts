import { GameActor } from './game-actor.model';
import { GameObject } from './game-object.model';
import { State } from './state.model';
import { Vector } from './vector.model';

import { GameActorTypeEnum } from '../@enums/game-actor-type.enum';

export class Lava extends GameObject {
  public speed: Vector;
  public reset: Vector;

  constructor(position?: Vector, speed?: Vector, reset?: Vector) {
    super();

    this.position = position;
    this.speed = speed;
    this.reset = reset;
    this.size = new Vector(1, 1);
  }

  public type(): GameActorTypeEnum {
    return GameActorTypeEnum.LAVA;
  }

  public create(position: Vector, char?: string): GameActor {
    if (char === '=') {
      return new Lava(position, new Vector(2, 0));
    } else if (char === '|') {
      return new Lava(position, new Vector(0, 2));
    } else if (char === 'v') {
      return new Lava(position, new Vector(0, 3), position);
    }
  }

  public update(time: number, state?: State): GameActor {
    const newPosition = this.position.plus(this.speed.times(time));

    if (state.level.touches(newPosition, this.size, 'wall')) {
      return new Lava(newPosition, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.position, this.speed.times(-1));
    }
  }

  public collide(state: State): State {
    return new State(state.level, state.actors, 'lost');
  }
}
