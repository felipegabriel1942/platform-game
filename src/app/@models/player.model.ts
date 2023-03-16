import { GameActorTypeEnum } from '../@enums/game-actor-type.enum';
import { Direction } from './direction.model';
import { GameActor } from './game-actor.model';
import { State } from './state.model';
import { Vector } from './vector.model';

export class Player extends GameActor {
  public speed: Vector;
  public life = 3;
  private playerXSpeed = 7;
  private gravity = 30;
  private jumpSpeed = 17;

  constructor(position?: Vector, speed?: Vector) {
    super();

    this.position = position;
    this.speed = speed;
    this.size = new Vector(0.8, 1.5);
  }

  public type(): GameActorTypeEnum {
    return GameActorTypeEnum.PLAYER;
  }

  public create(position: Vector): GameActor {
    return new Player(position.plus(new Vector(0, -0.5)), new Vector(0, 0));
  }

  public update(time: number, state?: State, direction?: Direction): GameActor {
    let xSpeed = 0;

    if (direction.left) {
      xSpeed -= this.playerXSpeed;
    }

    if (direction.right) {
      xSpeed += this.playerXSpeed;
    }

    let position = this.position;

    // MOVE ON 'X' AXIS
    const movedX = position.plus(new Vector(xSpeed * time, 0));

    if (!state.level.touches(movedX, this.size, 'wall')) {
      position = movedX;
    }

    // MOVE ON 'Y' AXIS
    let ySpeed = this.speed.y + time * this.gravity;
    const movedY = position.plus(new Vector(0, ySpeed * time));

    if (!state.level.touches(movedY, this.size, 'wall')) {
      position = movedY;
    } else if (direction.up && ySpeed > 0) {
      ySpeed = -this.jumpSpeed;
    } else {
      ySpeed = 0;
    }

    return new Player(position, new Vector(xSpeed, ySpeed));
  }
}
