import { GameActorTypeEnum } from '../@enums/game-actor-type.enum';
import { Direction } from './direction.model';
import { GameActor } from './game-actor.model';
import { GameObject } from './game-object.model';
import { Level } from './level.model';
import { Player } from './player.model';

export class State {
  public level: Level;
  public actors: Array<GameActor>;
  public status: string;

  // TODO: STATUS PODERIA VIRAR UM ENUM
  constructor(level: Level, actors: Array<GameActor>, status: string) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  public get player(): Player {
    return this.actors.find(
      (a) => a.type() === GameActorTypeEnum.PLAYER
    ) as Player;
  }

  public static start(level: Level): State {
    return new State(level, level.startActors, 'playing');
  }

  public update(time: number, direction: Direction): State {
    const actors = this.actors.map((actor) =>
      actor.update(time, this, direction)
    );

    let newState = new State(this.level, actors, this.status);

    if (newState.status !== 'playing') {
      return newState;
    }

    const player = newState.player;

    if (this.level.touches(this.player.position, this.player.size, 'lava')) {
      return new State(this.level, actors, 'lost');
    }

    const gameObjects = actors.filter(
      (a) => a instanceof GameObject
    ) as GameObject[];

    for (const object of gameObjects) {
      if (this.overlap(object, player)) {
        newState = object.collide(newState);
      }
    }

    return newState;
  }

  private overlap(actor1: GameActor, actor2: GameActor): boolean {
    if (actor1 == null || actor2 == null) {
      return false;
    }

    return (
      actor1.position.x + actor1.size.x > actor2.position.x &&
      actor1.position.x < actor2.position.x + actor2.size.x &&
      actor1.position.y + actor1.size.y > actor2.position.y &&
      actor1.position.y < actor2.position.y + actor2.size.y
    );
  }

  public gameIsOver(): boolean {
    return this.player.life === 0;
  }
}
