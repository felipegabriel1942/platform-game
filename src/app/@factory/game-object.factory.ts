import { GameObject } from '../@models/game-object.model';
import { Player } from '../@models/player.model';
import { Vector } from '../@models/vector.model';

export class GameObjectFactory {
  public static buildGameObject(type: string, position: Vector): GameObject {
    let gameObject = null;

    if (type === '@') {
      gameObject = new Player(position);
    }

    console.log(type);

    return gameObject;
  }
}
