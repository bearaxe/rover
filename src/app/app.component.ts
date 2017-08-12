import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'the game';


  basis = 100; // aka, what is a single unit of motion worth?
  width = 10 * this.basis;
  height = 5 * this.basis;
  counter = 0;
  face = 1; // 1 is n, 2 is e, 3 is s, 0 is w
  oldFace = this.face;
  start = {'x': 0 , 'y': 0}; // farthest west and south (unfortunately this is actually the farthest east and north lol)
  pos = this.start;
  oldPos = {'x': 0, 'y': 0};
  moveArr = ['f', 'r', 'b', 'r', 'b', 'l', 'f', 'b', 'f', 'r', 'l', 'f', 'f', 'f', 'r', 'f', 'f', 'f', 'f', 'f', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'f', 'f', 'f'];
  dbLog = [];



  ngOnInit(){
    console.log('moveArr lenght:', this.moveArr.length);
    this.moveArr = this.moveArr.reverse();
    this.play();
    console.log('moves in reverse:', this.dbLog);
  }

  play(){
    const move = this.moveArr.pop();
    switch(move){
      case 'f':
        this.move(this.face, 1 * this.basis );
        break;
      case 'b':
        this.move(this.face, -1 * this.basis );
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
    this.dbLog.push(move);
    // move to own function?
    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;
    this.oldFace = this.face;

    // check for end of game
    setTimeout(()=>{
      if(this.moveArr.length > 0){
        this.play()
      } else {
        console.log("~~~~~~~~~~~~~~~~~~~~~~")
        console.log("that's all for now! :)")
        console.log("~~~~~~~~~~~~~~~~~~~~~~")
      }
    }, 500);
  }

  move(face, motion){
    switch(face){
      case 0: // w
        this.pos.x = this.checkMove(this.pos.x - motion, 'x');
        break;
      case 1: // n
        this.pos.y = this.checkMove(this.pos.y + motion, 'y');
        break;
      case 2: // e
        this.pos.x = this.checkMove(this.pos.x + motion, 'x');
        break;
      case 3: // s
        this.pos.y = this.checkMove(this.pos.y - motion, 'y');
        break;
      default:
        console.log('this direction is impossible. your mod is bad, it gave me: ', face);
    }
  }

  checkMove(destination, key){
    if(key === 'x'){
      console.log("returning: ", (destination <= this.width && destination >= 0? destination : this.pos.x))
      return (destination <= this.width && destination >= 0? destination : this.pos.x);
    } else {
      console.log("returning: ", (destination <= this.height && destination >= 0? destination : this.pos.y))
      return (destination <= this.height && destination >= 0? destination : this.pos.y);
    }
    // return destination;
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
