import { Injectable } from '@angular/core';

@Injectable()
export class BoundsService {
  basis;
  baseWidth;
  baseHeight;
  width;
  height;
  obstInit = true;

  obsticalAmount = 3;
  obstArr = [];
  xArr = [];
  yArr = [];

  constructor() {
    // this.createObsticals();
  }

  checkMove(pos, destination, key){
    console.log('pos:', pos, ' dest:', destination, ' key:', key);
    console.log('comparing to base:', this.basis, ' width:', this.width, ' height:', this.height);
    if(key === 'x'){
      // the other way to write this is way harder to read, so leaving for now.
      if(destination <= this.width && destination >= 0){ // if within bounds
        if(!this.xArr.includes(destination)){ //if you're not going to be in the x array
          return destination
        } else if(pos.y !== this.yArr[this.xArr.indexOf(destination)]){ //or, if you are, if you're not matching a forbidden coordinate
          return destination
        }
        console.log('well then');
      }
      return pos.x;
    } else {
      // console.log("returning: ", (destination <= this.height && destination >= 0? destination : pos.y))
      // return (destination <= this.height && destination >= 0? destination : pos.y);
      if(destination <= this.height && destination >= 0){ // if within bounds
        if(!this.yArr.includes(destination)){ //if you're not going to be in the x array
          return destination
        } else if(pos.x !== this.xArr[this.yArr.indexOf(destination)]){ //or, if you are, if you're not matching a forbidden coordinate
          return destination
        }
      }
      return pos.y;
    }
    // return destination;
  }

  createObsticals(){
    // if(this.width === undefined){ setTimeout(()=>{this.createObsticals()},1)}
    let i = 0;
    while(i <= this.obsticalAmount){
      // I'm storing it like this so I can be lazy while checking
      // it may not be the most efficient way, but it /will/ work
      let randX = this.rand(0, this.baseWidth);
      let randY = this.rand(0, this.baseHeight);
      while(randX === 0 && randY === 0){ //if rand is start position, reroll
        randX = this.rand(0, this.baseWidth);
        randY = this.rand(0, this.baseHeight);
      }
      this.xArr.push(randX * this.basis);
      this.yArr.push(randY * this.basis);
      this.obstArr.push({'x': this.xArr[i], 'y': this.yArr[i]});
      i++;
    }
    this.obstInit = false;
  }

  getObsticals(){
    return this.obstArr;
  }

  // this is inclusive of both min and max values
  rand(small, big) {
    const min = Math.ceil(small);
    const max = Math.floor(big);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

}
