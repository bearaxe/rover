import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { NgForm } from '@angular/forms';
import { KeyHandlerService } from '../key-handler.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  keytype = 'wasd';

  constructor(private bridge: BridgeService,
              private key: KeyHandlerService) { }

  ngOnInit() {
    this.key.setKeyType(this.keytype);
  }

  addMoves(form: NgForm){
    const nArr = form.value.newMoves.split(',');
    for(const each of nArr){
      this.bridge.addMove(each);
    }
  }

  addMove(move){
    console.log('caught a :', move);
    this.bridge.addMove(move);
  }

}
