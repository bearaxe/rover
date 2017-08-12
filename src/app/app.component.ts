import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'the game';
  //RULE OF GOD: NORTH IS MINUS, WEST IS MINUS. EXTREAM (0,0) IS (WEST, NORTH)
  //LEAVE THE ROVER POINTING SOUTH AT START (unless you randomize this later, but for now, SOUTH)


  basis = 100; // aka, what is a single unit of motion worth?
  width = 10 * this.basis;
  height = 5 * this.basis;

  counter = 0;
  face = 3; // 1 is n, 2 is e, 3 is s, 0 is w
  rotation = 0; //set this in a different init funciton or something so safeTransform doesn't get borked to heck
  oldFace = this.face;
  start = {'x': 0 , 'y': 0};
  pos = this.start;
  oldPos = {'x': 0, 'y': 0};
  moveArr = ['f', 'l', 'f', 'r', 'b', 'l', 'l', 'b'];
  dbLog = [];

  constructor(private sanitizer: DomSanitizer) { }

  safeTransform = this.sanitizer.bypassSecurityTrustStyle("rotate( " + this.rotation + "deg)");

  ngOnInit(){
    console.log('moveArr lenght:', this.moveArr.length);
    this.moveArr = this.moveArr.reverse();
    setTimeout(()=>{this.play()},1000);
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
        this.face = this.face * (this.face < 0 ? -1 : 1);
        this.rotate(-90);
        break;
      case 'r':
        this.face = (this.face + 1 ) % 4;
        this.rotate(90);
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
    }, 1000);
  }

  move(face, motion){
    switch(face){
      case 0: // w
        this.pos.x = this.checkMove(this.pos.x - motion, 'x');
        break;
      case 1: // n
        this.pos.y = this.checkMove(this.pos.y - motion, 'y');
        break;
      case 2: // e
        this.pos.x = this.checkMove(this.pos.x + motion, 'x');
        break;
      case 3: // s
        this.pos.y = this.checkMove(this.pos.y + motion, 'y');
        break;
      default:
        console.log('this direction is impossible. your mod is bad, it gave me: ', face);
    }
  }

  rotate(rotation){
    this.rotation += rotation;
    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle("rotate( " + this.rotation + "deg)");
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
