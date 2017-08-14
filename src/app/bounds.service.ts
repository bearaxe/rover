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

  constructor() {
    // this.createObsticals();
  }

  checkMove(pos, destination, key){
    console.log('pos:', pos, ' dest:', destination, ' key:', key);
    console.log('comparing to base:', this.basis, ' width:', this.width, ' height:', this.height);
    if(key === 'x'){
      console.log("returning: ", (destination <= this.width && destination >= 0? destination : pos.x))
      return (destination <= this.width && destination >= 0? destination : pos.x);
    } else {
      console.log("returning: ", (destination <= this.height && destination >= 0? destination : pos.y))
      return (destination <= this.height && destination >= 0? destination : pos.y);
    }
    // return destination;
  }

  createObsticals(){
    // if(this.width === undefined){ setTimeout(()=>{this.createObsticals()},1)}
    let i = 0;
    while(i++ <= this.obsticalAmount){
      console.log('i', i);
      this.obstArr.push({'x': this.rand(0, this.baseWidth) * this.basis, 'y': this.rand(0, this.baseHeight) * this.basis})
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
    console.log('min:', min, 'max:', max, 'big:', big, 'small:', small);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

}
