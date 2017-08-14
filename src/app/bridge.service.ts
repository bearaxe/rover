import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { BoundsService } from './bounds.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BridgeService {
  //RULE OF GOD: NORTH IS MINUS, WEST IS MINUS. EXTREAM (0,0) IS (WEST, NORTH)
  //LEAVE THE ROVER POINTING SOUTH AT START (unless you randomize this later, but for now, SOUTH)

  basis = 100; // aka, what is a single unit of motion worth?
  baseWidth = 9;
  baseHeight = 5;
  width = this.baseWidth * this.basis;
  height = this.baseHeight * this.basis;
  isPlaying = false;
  inputLimit = 3;
  inputCount = 0;

  dirMap = ['w', 'n', 'e', 's'];

  counter = 0;
  face = 3; // 1 is n, 2 is e, 3 is s, 0 is w
  rotation = 0; //set this in a different init funciton or something so safeTransform doesn't get borked to heck
  oldFace = this.face;
  start = {'x': 0 , 'y': 0};
  pos = this.start;
  oldPos = {'x': 0, 'y': 0};
  moveArr = ['l'];
  dbLog = [];
  newMoves: string = '';

  rotSubj = new Subject<number>();

  constructor(private boundServ: BoundsService) {
    this.boundServ.basis = this.basis;
    this.boundServ.baseWidth = this.baseWidth;
    this.boundServ.baseHeight = this.baseHeight;
    this.boundServ.width = this.width;
    this.boundServ.height = this.height;
    console.log('wtf');
    this.boundServ.createObsticals();
    this.loadObsticals();
    this.rotSubj.next(this.rotation);
  }

  loadObsticals(){
    console.log('btw');
    // if(this.boundServ.obstInit){ setTimeout(()=>{this.loadObsticals()}, 50);}
    console.log('obsticals generated:',this.boundServ.getObsticals());
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
        this.face = (--this.face < 0 ? 3 : this.face);
        this.rotate(-90);
        break;
      case 'r':
        this.face = ++this.face % 4;
        this.rotate(90);
        break;
      default:
        console.log('your array value ' + move + 'is invalid');
    }
    this.inputCount = (--this.inputCount >= 0? this.inputCount : 0);
    console.log('inputCount--:', this.inputCount)

    // this.logStatus(move);
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
        this.isPlaying = false;
        console.log("~~~~~~~~~~~~~~~~~~~~~~")
        console.log("that's all for now! :)")
        console.log("~~~~~~~~~~~~~~~~~~~~~~")
      }
    }, 1000);
  }

  move(face, motion){
    switch(face){
      case 0: // w
        this.pos.x = this.boundServ.checkMove(this.pos, this.pos.x - motion, 'x');
        break;
      case 1: // n
        this.pos.y = this.boundServ.checkMove(this.pos, this.pos.y - motion, 'y');
        break;
      case 2: // e
        this.pos.x = this.boundServ.checkMove(this.pos, this.pos.x + motion, 'x');
        break;
      case 3: // s
        this.pos.y = this.boundServ.checkMove(this.pos, this.pos.y + motion, 'y');
        break;
      default:
        console.log('this direction is impossible. your mod is bad, it gave me: ', face);
    }
  }

  rotate(rotation){
    this.rotation += rotation;
    this.rotSubj.next(this.rotation);
  }

  setRotation(rotation){
    this.rotation = rotation;
    this.rotSubj.next(this.rotation);
  }

  // checkMove(destination, key){
  //   if(key === 'x'){
  //     console.log("returning: ", (destination <= this.width && destination >= 0? destination : this.pos.x))
  //     return (destination <= this.width && destination >= 0? destination : this.pos.x);
  //   } else {
  //     console.log("returning: ", (destination <= this.height && destination >= 0? destination : this.pos.y))
  //     return (destination <= this.height && destination >= 0? destination : this.pos.y);
  //   }
  //   // return destination;
  // }

  // this is a user input funcation and needs to be limited accordingly
  // user should be allowed up to 3 seconds of built up movement
  // but user should also get feedback to show their input has been recorded
  addInput(move){
    if(this.inputLimit > this.inputCount){
      this.inputCount++;
      console.log('inputCount++:', this.inputCount)
      this.moveArr.unshift(move);
      if(this.isPlaying !== true){
        this.isPlaying = true;
        this.play();
      }
    }
  }

  addMove(move){
    this.moveArr.unshift(move);
    if(this.isPlaying !== true){
      this.isPlaying = true;
      this.play();
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
      + (this.face%2? // if number%2 = 1 (odd)
          (this.face===1? 'north' : 'south')// then face is one of these
        : (this.face===2? 'east' : 'west') // otherwise, number%2 ==1 and face is one of these
      ));
    console.log('new position: (' + this.pos.x + ',' + this.pos.y + ')');
  }

}
