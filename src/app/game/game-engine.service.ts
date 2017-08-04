import { Injectable } from '@angular/core';

@Injectable()
export class GameEngineService {
  width: number = 10;
  height: number = 5;

  constructor() { }

  getBoardSize(){
    return {'width': this.width, 'height': this.height};
  }

}
