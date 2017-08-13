import { Injectable } from '@angular/core';
import { BridgeService } from './bridge.service';

@Injectable()
export class KeyHandlerService {

  constructor(private bridge: BridgeService) { }

  handle(data){
    console.log('event data:', data);

  }

}
