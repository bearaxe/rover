import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  adminOpen = false;

  constructor(private bridge: BridgeService) { }

  ngOnInit() {
  }

  addMoves(form: NgForm){
    const nArr = form.value.newMoves.split(',');
    for(const each of nArr){
      this.bridge.addMove(each.trim());
    }
  }

}
