import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // dirMap = ['w', 'n', 'e', 's'];


  constructor(private bridge: BridgeService) { }

  ngOnInit() {
  }

  //bind your form to the options in bridge service.
  // The board should take care of itself after.
  setData(form: NgForm){
    console.log("form data:", form);
    if(form.value.position){
      let pArr = form.value.position.split(',')
      this.bridge.pos.x = this.bridge.basis * pArr[0].trim();
      this.bridge.pos.y = this.bridge.basis * pArr[1].trim();
    }
    if(form.value.facing){
      const dir = this.bridge.dirMap.indexOf(form.value.facing);
      console.log('dir:', dir);
      if (dir > -1){
        this.bridge.face = dir;
        switch(dir){
          case 0:
            this.bridge.setRotation(90);
            break;
          case 1:
            this.bridge.setRotation(180);
            break;
          case 2:
            this.bridge.setRotation(270);
            break;
          case 3:
            this.bridge.setRotation(0);
            break;
          default:
            console.log('somethign went wrong in admin rot set with dir:', dir);
        }
      }
    }
    console.log('admin set pos:', form.value.position);
    console.log('admin set face:', form.value.facing);
  }

}
