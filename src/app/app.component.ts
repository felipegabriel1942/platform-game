import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ArrowKeyEnum } from './@enums/arrow-key.enum';
import { CanvasDisplay } from './@models/canvas-display.model';
import { Direction } from './@models/direction.model';
import { Level } from './@models/level.model';
import { State } from './@models/state.model';
import { GameMapService } from './@services/game-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  public gameMaps: string[] = [];
  public gameState: State;
  public direction: Direction = new Direction();

  @HostListener('document:keydown', ['$event'])
  private handleKeydownEvent(event: KeyboardEvent): void {
    if (event.key === ArrowKeyEnum.ArrowRight) {
      this.direction.right = true;
    }

    if (event.key === ArrowKeyEnum.ArrowLeft) {
      this.direction.left = true;
    }

    if (event.key === ArrowKeyEnum.ArrowUp) {
      this.direction.up = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  private handleKeyUpEvent(event: KeyboardEvent): void {
    if (event.key === ArrowKeyEnum.ArrowRight) {
      this.direction.right = false;
    }

    if (event.key === ArrowKeyEnum.ArrowLeft) {
      this.direction.left = false;
    }

    if (event.key === ArrowKeyEnum.ArrowUp) {
      this.direction.up = false;
    }
  }

  constructor(private readonly gameMapService: GameMapService) {}

  ngOnInit(): void {
    this.runGame();
  }

  public async runGame(): Promise<void> {
    let life = 3;

    const maps = this.gameMapService.getGameMaps();

    for (let level = 0; level < maps.length; ) {
      if (life === 0) {
        return;
      }

      const state = await this.runLevel(life, new Level(maps[level]));

      this.gameState = state;

      // TODO: STATUS PODERIAM VIRAR ENUMS
      if (state.status === 'won') {
        level++;
      }

      if (state.status === 'lost') {
        life--;

        if (life === 0) {
          if (confirm('Fim de jogo!\nPressione "OK" para jogar novamente.')) {
            life = 3;
          }
        }
      }
    }
  }

  public runLevel(lives: number, level: Level): Promise<State> {
    const display = new CanvasDisplay(this.canvas, level);
    this.gameState = State.start(level);

    return new Promise((resolve) => {
      requestAnimationFrame((time) => {
        this.frame(lives, time, display, resolve);
      });
    });
  }

  private frame(
    lives: number,
    time: number,
    display: CanvasDisplay,
    resolve: any,
    lastTime?: number
  ): PromiseLike<State> {
    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000;

      if (this.animate(lives, timeStep, display) === false) {
        resolve(this.gameState);
        return;
      }
    }

    requestAnimationFrame((actualTime: number) => {
      this.frame(lives, actualTime, display, resolve, time);
    });
  }

  private animate(
    lives: number,
    time: number,
    display: CanvasDisplay
  ): boolean {
    this.gameState = this.gameState.update(time, this.direction);
    display.syncState(lives, this.gameState);
    return this.gameState.status === 'playing';
  }
}
