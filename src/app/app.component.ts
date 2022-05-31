import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameMapService } from './@services/game-map.service';
import { Level } from './@models/level.model';
import { GameObject } from './@models/game-object.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  public gameMaps: string[] = [];

  constructor(private readonly gameMapService: GameMapService) {}

  ngOnInit(): void {
    this.runGame();
  }

  public runGame(): void {
    console.log('Running Game...');

    this.gameMapService.getGameMaps().forEach((map) => {
      let gameState = this.runLevel(new Level(map));
    });
  }

  public runLevel(level: Level): any {
    console.log('Running Level...');
  }
}
