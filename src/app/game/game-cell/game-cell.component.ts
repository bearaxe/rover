import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.css']
})
export class GameCellComponent implements OnInit {
  @Input() row: number;
  @Input() col: number;
  point: {'x': number, 'y': number};

  constructor() { }

  ngOnInit() {
    this.point = {'x': this.row, 'y': this.col};
    console.log('This cell\'s coords are: (' + this.row + ':' + this.col + ')\nIt has been recorded as: '
      + this.pointForm());
  }
  pointForm(){
    return '(' + this.point.x + ',' + this.point.y + ')';
  }
}
