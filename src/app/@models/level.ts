import { Player } from './player';
import { Vector } from './vector';

export class Level {
  public rows: string[][];
  public height: number;
  public width: number;

  // TODO: colocar variavel em outro local
  public levelChars = {
    '.': 'empty',
    '#': 'wall',
    '+': 'lava',
    '@': Player,
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
      .map((row, y) => {
        return row.map((ch, x) => {
          const type = this.levelChars[ch];

          if (typeof type === 'string') {
            return type;
          }

          // TODO: Realmente precisa ficar vazio, a referencia na rows?
          this.startActors.push(type.create(new Vector(x, y)));

          return 'empty';
        });
      })
      .filter((r) => r.length > 0);
  }

  public touches() {}
}
