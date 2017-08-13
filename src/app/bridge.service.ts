import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BridgeService {
  moveArr = [];
  moveSubj = new Subject<String[]>();
  constructor() { }

}
