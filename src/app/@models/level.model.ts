import { GameObjectFactory } from '../@factory/game-object.factory';
import { Player } from './player.model';
import { Vector } from './vector.model';

export const enum objectsTypes {
  PLAYER = '@',
}
type Char = '.' | '#';

interface GameObjects {
  [key: string]: any;
}

export class Level {
  public rows: string[][];
  public height: number;
  public width: number;

  // TODO: colocar variavel em outro local
  public levelChars = {
    '.': 'empty',
    '#': 'wall',
    '+': 'lava',
    '@': 'player',
    o: 'coin',
    '=': 'lava',
    '|': 'lava',
    v: 'lava',
    m: 'lava',
  };

  public startActors: any[] = [];

  constructor(map: string) {
    this.rows = this.createRows(map);

    // TODO: Possivel erro nessas referencias
    this.height = this.rows.length;
    this.width = this.rows[0].length;
  }

  // TODO: Função fazendo muita coisa
  private createRows(map: string): string[][] {
    let rows: string[][];

    rows = map
      .split('\n')
      .map((m) => m.trim())
      .map((m) => [...m]);

    return rows
      .map((row, posY) => {
        return row.map((objectType, posX) => {
          const type = this.levelChars[objectType];

          if (typeof type === 'string') {
            return type;
          }

          // TODO: Realmente precisa ficar vazio, a referencia na rows?
          const gameObject = GameObjectFactory.buildGameObject(
            objectType,
            new Vector(posX, posY)
          );

          this.startActors.push(gameObject);
          console.log(this.startActors);

          return 'empty';
        });
      })
      .filter((r) => r.length > 0);
  }

  public touches() {}
}
