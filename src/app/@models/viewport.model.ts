import { ElementRef } from '@angular/core';

export class Viewport {
  public left: number;
  public top: number;
  public width: number;
  public height: number;
  private scale = 20;

  constructor(canvas: ElementRef<HTMLCanvasElement>) {
    this.left = 0;
    this.top = 0;
    this.width = canvas.nativeElement.width / this.scale;
    this.height = canvas.nativeElement.height / this.scale;
  }
}
