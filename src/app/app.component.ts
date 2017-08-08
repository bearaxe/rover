import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'the game';

  width = 10;
  height = 5;
  counter = 0;
  face = 1; // 1 is n, 2 is e, 3 is s, 0 is w
  oldFace = this.face;
  start = {'x': 1, 'y': 1}; // farthest west and south
  oldPos = this.start;
  pos = {'x': 1, 'y': 1};
  moveArr = ['f', 'l', 'b', 'b', 'r', 'f'];

  ngOnInit(){
    this.play();
  }

  play(){
    const move = this.moveArr.pop();
    switch(move){
      case 'f':
        this.move(this.face, 1);
        break;
      case 'b':
        this.move(this.face, -1);
        break;
      case 'l':
        this.face = (this.face - 1 ) % 4;
        this.face = this.face * (this.face < 0 ? -1 : 1); // just in case
        break;
      case 'r':
        this.face = (this.face + 1 ) % 4;
        break;
      default:
        console.log('your array value ' + move + 'is invalid');
    }
    this.logStatus(move);
    // move to own function?
    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;
    this.oldFace = this.face;

    // check for end of game
    if(this.moveArr.length > 0){
      this.play();
    }
  }

  move(face, motion){
    switch(face){
      case 0: // w
        this.pos.x = this.pos.x - motion;
        break;
      case 1: // n
        this.pos.y = this.pos.y + motion;
        break;
      case 2: // e
        this.pos.x = this.pos.x + motion;
        break;
      case 4: // s
        this.pos.y = this.pos.y - motion;
        break;
      default:
        console.log('this direction is impossible. your mod is bad, it gave me: ', face);
    }
  }

  logStatus(lastMove){
    console.log('~~~~~~~~~MOVE ' + this.counter++ + '~~~~~~~~');
    console.log('starting position: (' + this.oldPos.x + ',' + this.oldPos.y + ')');
    console.log('still facing: '
      + (this.oldFace%2? // if it's odd
          (this.oldFace===1? 'north' : 'south') // then face is one of these
        : (this.oldFace===2? 'east' : 'west')// otherwise, number%2 ==1 and face is one of these
      ));
    console.log('move just executed:', lastMove);
    console.log('currently facing: '
      + (this.face%2? // if number%2 ==0 0
          (this.face===1? 'north' : 'south')// then face is one of these
        : (this.face===2? 'east' : 'west') // otherwise, number%2 ==1 and face is one of these
      ));
    console.log('new position: (' + this.pos.x + ',' + this.pos.y + ')');
  }
}
