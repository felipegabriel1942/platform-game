import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameMapService {
  constructor() {}

  public getGameMaps(): string[] {
    return [
      `
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
..................................................................###...........
...................................................##......##....##+##..........
....................................o.o......##..................#+++#..........
.................................................................##+##..........
...................................#####..........................#v#...........
............................................................................##..
..##......................................o.o................................#..
..#.....................o....................................................#..
..#......................................#####.............................o.#..
..#..........####.......o....................................................#..
..#..@.......#..#...m.....................m......................#####.......#..
..############..###############...####################.....#######...#########..
..............................#...#..................#.....#....................
..............................#+++#..................#+++++#....................
..............................#+++#..................#+++++#....................
..............................#####..................#######....................
................................................................................
................................................................................
`,
        `
      ................................................................................
      ................................................................................
      ....###############################.............................................
      ...##.............................##########################################....
      ...#.......................................................................##...
      ...#....o...................................................................#...
      ...#................................................m.......................#...
      ...#.o........################...................o..o...........|........o..#...
      ...#.........................#..............................................#...
      ...#....o....................##########.....###################....##########...
      ...#..................................#+++++#.................#....#............
      ...###############....oo.......o.o.o..#######.###############.#....#............
      .....#...............o..o.....m.......#.......#......#........#....#............
      .....#....................#############..######.####.#.########....########.....
      .....#.............########..............#...........#.#..................#.....
      .....#..........####......####...#####################.#..................#.....
      .....#........###............###.......................########....########.....
      .....#.......##................#########################......#....#............
      .....#.......#................................................#....#............
      .....###......................................................#....#............
      .......#...............o...........................................#............
      .......#...............................................o...........#............
      .......#########......###.....############.........................##...........
      .............#..................#........#####....#######.o.........########....
      .............#++++++++++++++++++#............#....#.....#..................#....
      .............#++++++++++++++++++#..........###....###...####.o.............#....
      .............####################..........#........#......#.....|.........#....
      ...........................................#++++++++#......####............#....
      ...........................................#++++++++#.........#........@...#....
      ...........................................#++++++++#.........##############....
      ...........................................##########...........................
      ................................................................................
      `,
        `
      ......................................#++#........................#######....................................#+#..
      ......................................#++#.....................####.....####.................................#+#..
      ......................................#++##########...........##...........##................................#+#..
      ......................................##++++++++++##.........##.............##...............................#+#..
      .......................................##########++#.........#....................................o...o...o..#+#..
      ................................................##+#.........#.....o...o....................................##+#..
      .................................................#+#.........#................................###############++#..
      .................................................#v#.........#.....#...#........................++++++++++++++##..
      .............................................................##..|...|...|..##............#####################...
      ..............................................................##+++++++++++##............v........................
      ...............................................................####+++++####......................................
      ...............................................#.....#............#######........###.........###..................
      ...............................................#.....#...........................#.#.........#.#..................
      ...............................................#.....#.............................#.........#....................
      ...............................................#.....#.............................##........#....................
      ...............................................##....#.............................#.........#....................
      ...............................................#.....#......o..o.....#...#.........#.........#....................
      ...............#######........###...###........#.....#...............#...#.........#.........#....................
      ..............##.....##.........#...#..........#.....#.....######....#...#...#########.......#....................
      .............##.......##........#.o.#..........#....##...............#...#...#...............#....................
      .....@.......#.........#........#...#..........#.....#...............#...#...#...............#....................
      ....###......#.........#........#...#..........#.....#...............#...#####...######......#....................
      ....#.#......#.........#.......##.o.##.........#.....#...............#.....o.....#.#.........#....................
      ++++#.#++++++#.........#++++++##.....##++++++++##....#++++++++++.....#.....m.....#.#.........#....................
      ++++#.#++++++#.........#+++++##.......##########.....#+++++++##+.....#############.##..o.o..##....................
      ++++#.#++++++#.........#+++++#....o.................##++++++##.+....................##.....##.....................
      ++++#.#++++++#.........#+++++#.....................##++++++##..+.....................#######......................
      ++++#.#++++++#.........#+++++##.......##############++++++##...+..................................................
      ++++#.#++++++#.........#++++++#########++++++++++++++++++##....+..................................................
      ++++#.#++++++#.........#++++++++++++++++++++++++++++++++##.....+..................................................
      `,
        `
      ..............................................................................................................
      ..............................................................................................................
      ..............................................................................................................
      ..............................................................................................................
      ..............................................................................................................
      ........................................o.....................................................................
      ..............................................................................................................
      ........................................#.....................................................................
      ........................................#.....................................................................
      ........................................#.....................................................................
      ........................................#.....................................................................
      .......................................###....................................................................
      .......................................#.#.................+++........+++..###................................
      .......................................#.#.................+#+........+#+.....................................
      .....................................###.###................#..........#......................................
      ......................................#...#.................#...oooo...#.......###............................
      ......................................#...#.................#..........#......#+++#...........................
      ......................................#...#.................############.......###............................
      .....................................##...##......#...#......#................................................
      ......................................#...#########...########..............#.#...............................
      ......................................#...#...........#....................#+++#..............................
      ......................................#...#...........#.....................###...............................
      .....................................##...##..........#.......................................................
      ......................................#...#=.=.=.=....#............###........................................
      ......................................#...#...........#...........#+++#.......................................
      ......................................#...#....=.=.=.=#.....o......###.......###..............................
      .....................................##...##..........#.....................#+++#.............................
      ..............................o...o...#...#...........#.....#................##v........###...................
      ......................................#...#...........#..............#.................#+++#..................
      .............................###.###.###.###.....o.o..#++++++++++++++#...................v#...................
      .............................#.###.#.#.###.#..........#++++++++++++++#........................................
      .............................#.............#...#######################........................................
      .............................##...........##.........................................###......................
      ..###.........................#.....#.....#.........................................#+++#................###..
      ..#.#.........................#....###....#..........................................###.................#.#..
      ..#...........................#....###....#######........................#####.............................#..
      ..#...........................#...........#..............................#...#.............................#..
      ..#...........................##..........#..............................#.#.#.............................#..
      ..#.......................................#.......|####|....|####|.....###.###.............................#..
      ..#................###.............o.o....#..............................#.........###.....................#..
      ..#...............#####.......##..........#.............................###.......#+++#..........#.........#..
      ..#...............o###o.......#....###....#.............................#.#........###..........###........#..
      ..#................###........#############..#.oo.#....#.oo.#....#.oo..##.##....................###........#..
      ..#......@..........#.........#...........#++#....#++++#....#++++#....##...##....................#.........#..
      ..#############################...........#############################.....################################..
      ..............................................................................................................
      ..............................................................................................................
      `,
        `
      ..................................................................................................###.#.......
      ......................................................................................................#.......
      ..................................................................................................#####.......
      ..................................................................................................#...........
      ..................................................................................................#.###.......
      ..........................o.......................................................................#.#.#.......
      .............................................................................................o.o.o###.#.......
      ...................###................................................................................#.......
      .......+..o..+................................................#####.#####.#####.#####.#####.#####.#####.......
      .......#.....#................................................#...#.#...#.#...#.#...#.#...#.#...#.#...........
      .......#=.o..#............#...................................###.#.###.#.###.#.###.#.###.#.###.#.#####.......
      .......#.....#..................................................#.#...#.#...#.#...#.#...#.#...#.#.....#.......
      .......+..o..+............o..................................####.#####.#####.#####.#####.#####.#######.......
      ..............................................................................................................
      ..........o..............###..............................##..................................................
      ..............................................................................................................
      ..............................................................................................................
      ......................................................##......................................................
      ...................###.........###............................................................................
      ..............................................................................................................
      ..........................o.....................................................#......#......................
      ..........................................................##.....##...........................................
      .............###.........###.........###.................................#..................#.................
      ..............................................................................................................
      .................................................................||...........................................
      ..###########.................................................................................................
      ..#.........#.o.#########.o.#########.o.##................................................#...................
      ..#.........#...#.......#...#.......#...#.................||..................#.....#.........................
      ..#..@......#####...o...#####...o...#####.....................................................................
      ..#######.....................................#####.......##.....##.....###...................................
      ........#=..................=................=#...#.....................###...................................
      ........#######################################...#+++++++++++++++++++++###+++++++++++++++++++++++++++++++++++
      ..................................................############################################################
      ..............................................................................................................
      `,
    ];
  }
}
