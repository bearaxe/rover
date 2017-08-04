import { Component, OnInit } from '@angular/core';
import { GameEngineService } from './game-engine.service';
import 'rxjs/Rx';
//
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private engine: GameEngineService) { }

  size;
  width: Number[];
  height: Number[];

  ngOnInit() {
    this.size = this.engine.getBoardSize();
    this.width = Array.apply(null, {length: this.size.width}).map(Number.call, Number);
    this.height = Array.apply(null, {length: this.size.height}).map(Number.call, Number);

    // this.width = Array(this.size.width).fill().map((x,i) => i);
    // this.width = Array(5).fill(5, 1, 1);
    // this.width = ( Array(5)).map((x, i) => x);
    console.log('width:', this.width);
    console.log('height:', this.height);
  }

}
