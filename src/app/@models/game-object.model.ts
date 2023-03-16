import { GameActor } from './game-actor.model';
import { State } from './state.model';
export abstract class GameObject extends GameActor {
  public abstract collide(state: State): State;
}
