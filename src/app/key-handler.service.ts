import { Injectable } from '@angular/core';
import { BridgeService } from './bridge.service';

@Injectable()
export class KeyHandlerService {
  keyType;
  up = ['w','i','ArrowUp'];
  left = ['a', 'j', 'ArrowLeft'];
  right = ['d', 'l', 'ArrowRight'];
  down = ['s', 'k', 'ArrowDown'];
  set = 0;
  locked = false;
  constructor(private bridge: BridgeService) { }

  handle(data){
    if(!this.locked){
      this.locked = true;
      console.log('event data:', data.key);
      const key = data.key;

      console.log('test:', this.up[this.set] === key)
      if(this.up[this.set] === key){
        this.bridge.addMove('f');
      } else if(this.left[this.set] === key){
        this.bridge.addMove('l');
      } else if(this.right[this.set] === key){
        this.bridge.addMove('r');
      } else if(this.down[this.set] === key){
        this.bridge.addMove('b');
      } else {
        console.log('not valid input :(');
      }
      setTimeout(()=>{},500); //prevents a whoooole lot of accidental spamming
      this.locked = false;
    }
  }

  setKeyType(newType){
    this.keyType = newType;
    this.set = (newType === 'wasd' ? 0
                  : (newType === 'ijkl' ? 1 : 2));
  }

}
