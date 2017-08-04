import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.css']
})
export class GameCellComponent implements OnInit {
  @Input() row: number;
  @Input() col: number;

  constructor() { }

  ngOnInit() {
    console.log('This cell\'s coords are: (' + this.row + ':' + this.col + ')');
  }

}
