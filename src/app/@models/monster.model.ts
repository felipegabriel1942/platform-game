import { GameActor } from './game-actor.model';
import { GameObject } from './game-object.model';
import { State } from './state.model';
import { Vector } from './vector.model';
import { GameActorTypeEnum } from '../@enums/game-actor-type.enum';

export class Monster extends GameObject {
  public speed: Vector;
  public chase: boolean;

  constructor(position?: Vector, speed?: Vector, chase?: boolean) {
    super();

    this.position = position;
    this.speed = speed;
    this.chase = chase;
    this.size = new Vector(1, 2);
  }

  public type(): GameActorTypeEnum {
    return GameActorTypeEnum.MONSTER;
  }

  public create(position: Vector, char?: string): GameActor {
    return new Monster(
      position.plus(new Vector(0, -1)),
      new Vector(3, 0),
      char !== 'm'
    );
  }

  public update(time: number, state?: State): GameActor {
    if (this.chase) {
      if (state.player.position.x < this.position.x) {
        this.speed = new Vector(-3, 0);
      } else {
        this.speed = new Vector(3, 0);
      }
    }

    const newPosition = this.position.plus(this.speed.times(time));

    if (!state.level.touches(newPosition, this.size, 'wall')) {
      return new Monster(newPosition, this.speed, this.chase);
    } else {
      return new Monster(this.position, this.speed.times(-1), this.chase);
    }
  }

  public collide(state: State): State {
    const player = state.player;
    const monster = this;

    if (monster.position.y - player.position.y > 1) {
      const filtered = state.actors.filter((a) => a !== this);
      return new State(state.level, filtered, state.status);
    } else {
      return new State(state.level, state.actors, 'lost');
    }
  }
}
