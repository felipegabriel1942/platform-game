import { Coin } from './coin.model';
import { GameActor } from './game-actor.model';
import { Lava } from './lava.model';
import { Monster } from './monster.model';
import { Player } from './player.model';
import { Vector } from './vector.model';

// TODO: ACHAR UMA MELHOR FORMA DE REPRESENTAR ISSO
const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  o: Coin,
  '=': Lava,
  '|': Lava,
  v: Lava,
  m: Monster,
};

export class Level {
  public height: number;
  public width: number;
  public startActors: Array<GameActor> = [];

  // TODO: SEM TIPAGEM
  public rows: any[];

  // TODO: CONSTRUTOR FAZENDO MUITA COISA
  constructor(map: string) {
    const rows = map
      .trim()
      .split('\n')
      .map((l) => [...l]);

    this.height = rows.length;
    this.width = rows[0].length;

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        // TODO: criação de objetos poderia ser melhor com o padrão Factory?
        const actor = levelChars[ch];

        if (typeof actor === 'string') {
          return actor;
        }

        let gameActor: GameActor;

        if (ch === '@') {
          gameActor = new Player();
        }

        if (ch === 'o') {
          gameActor = new Coin();
        }

        if (ch === '=' || ch === '|' || ch === 'v') {
          gameActor = new Lava();
        }

        if (ch === 'm') {
          gameActor = new Monster();
        }

        if (gameActor == null) {
          return;
        }

        this.startActors.push(gameActor.create(new Vector(x, y), ch));

        return 'empty';
      });
    });
  }

  public touches(position: Vector, size: Vector, type: string): boolean {
    const xStart = Math.floor(position.x);
    const xEnd = Math.ceil(position.x + size.x);
    const yStart = Math.floor(position.y);
    const yEnd = Math.ceil(position.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        const here = isOutside ? 'wall' : this.rows[y][x];

        if (here === type) {
          return true;
        }
      }
    }

    return false;
  }
}
