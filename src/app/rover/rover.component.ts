import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.css']
})
export class RoverComponent implements OnInit, OnChanges {
  @Input() size;
  @Input() x;
  @Input() y;

  constructor() { }

  ngOnChanges() {
    console.log('ayy found somethin')
  }

  ngOnInit() {
  }

  // Forward, backward are move functions
  // Left, Right are turn motions
  move(list: string[]){


  }

  explode(){

  }

}
