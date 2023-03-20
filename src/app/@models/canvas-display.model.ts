import { Viewport } from './viewport.model';
import { Level } from './level.model';
import { ElementRef } from '@angular/core';
import { State } from './state.model';
import { Player } from './player.model';
import { GameActor } from './game-actor.model';
import { GameActorTypeEnum } from '../@enums/game-actor-type.enum';

export class CanvasDisplay {
  public ctx: CanvasRenderingContext2D;
  public flipPlayer = false;
  public viewport: Viewport;
  public canvas: ElementRef<HTMLCanvasElement>;
  private otherSprites: HTMLImageElement;
  private playerSprites: HTMLImageElement;
  private playerXOverlap = 4;

  constructor(canvas: ElementRef<HTMLCanvasElement>, level: Level) {
    this.canvas = canvas;
    this.canvas.nativeElement.width = Math.min(600, level.width * 20);
    this.canvas.nativeElement.height = Math.min(450, level.height * 20);
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.viewport = new Viewport(this.canvas);
    this.otherSprites = document.createElement('img');
    this.otherSprites.src = '../../assets/images/sprites.png';
    this.playerSprites = document.createElement('img');
    this.playerSprites.src = '../../assets/images/player.png';
  }

  public clear(): void {
    this.canvas.nativeElement.remove();
  }

  public syncState(lives: number, state: State): void {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
    this.drawLivesQtd(lives);
    this.drawCoinsLeft(state);
  }

  private updateViewport(state: State): void {
    const view = this.viewport;
    const margin = view.width / 3;
    const player = state.player;
    const center = player.position.plus(player.size.times(0.5));

    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(
        center.x + margin - view.width,
        state.level.width - view.width
      );
    }

    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(
        center.y + margin - view.height,
        state.level.height - view.height
      );
    }
  }

  private clearDisplay(status: string): void {
    if (status === 'won') {
      this.ctx.fillStyle = 'rgb(68, 191, 255)';
    } else if (status === 'lost') {
      this.ctx.fillStyle = 'rgb(44, 136, 214)';
    } else {
      this.ctx.fillStyle = 'rgb(52, 166, 251)';
    }

    this.ctx.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  private drawBackground(level: Level): void {
    const { left, top, width, height } = this.viewport;
    const xStart = Math.floor(left);
    const xEnd = Math.ceil(left + width);
    const yStart = Math.floor(top);
    const yEnd = Math.ceil(top + height);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const tile = level.rows[y][x];
        if (tile === 'empty') {
          continue;
        }

        const screenX = (x - left) * 20;
        const screenY = (y - top) * 20;
        const tileX = tile === 'lava' ? 20 : 0;

        this.ctx.drawImage(
          this.otherSprites,
          tileX,
          0,
          20,
          20,
          screenX,
          screenY,
          20,
          20
        );
      }
    }
  }

  // TODO: deve ser modificado
  private drawActors(actors: GameActor[]): void {
    const scale = 20;

    for (const actor of actors) {
      const width = actor.size.x * scale;
      const height = actor.size.y * scale;
      const x = (actor.position.x - this.viewport.left) * scale;
      const y = (actor.position.y - this.viewport.top) * scale;

      if (actor.type() === GameActorTypeEnum.PLAYER) {
        this.drawPlayer(actor as Player);
      } else {
        const tileX = (actor.type() === GameActorTypeEnum.COIN ? 2 : 1) * scale;

        this.ctx.drawImage(
          this.otherSprites,
          tileX,
          0,
          width,
          height,
          x,
          y,
          width,
          height
        );
      }
    }
  }

  private drawPlayer(player: Player): void {
    let width = player.size.x * 20;
    const height = player.size.y * 20;
    let x = (player.position.x - this.viewport.left) * 20;
    const y = (player.position.y - this.viewport.top) * 20;

    width += this.playerXOverlap * 2;
    x -= this.playerXOverlap;

    if (player.speed.x !== 0) {
      this.flipPlayer = player.speed.x < 0;
    }

    let tile = 8;

    if (player.speed.y !== 0) {
      tile = 9;
    } else if (player.speed.x !== 0) {
      tile = Math.floor(Date.now() / 60) % 8;
    }

    this.ctx.save();

    if (this.flipPlayer) {
      this.flipHorizontally(x + width / 2);
    }

    const tileX = tile * width;

    this.ctx.drawImage(
      this.playerSprites,
      tileX,
      0,
      width,
      height,
      x,
      y,
      width,
      height
    );

    this.ctx.restore();
  }

  flipHorizontally(around: number): void {
    this.ctx.translate(around, 0);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-around, 0);
  }

  private drawLivesQtd(lives: number): void {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Vidas: ' + lives, 20, 40);
  }

  private drawCoinsLeft(state: State): void {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(
      'Moedas: ' +
        state.actors.filter((a) => a.type() === GameActorTypeEnum.COIN).length,
      this.ctx.canvas.width - 100,
      40
    );
  }
}
