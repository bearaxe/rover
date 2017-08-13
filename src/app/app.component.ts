import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';
import { BridgeService } from './bridge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'the game';


  constructor(private bridge: BridgeService) { }
  width = this.bridge.width;
  height = this.bridge.height;
  basis = this.bridge.basis;
  pos = this.bridge.pos;

  safeTransform = this.bridge.safeTransform;

  ngOnInit(){
    // console.log('moveArr lenght:', this.moveArr.length);
    // this.moveArr = this.moveArr.reverse();
    this.bridge.isPlaying = true;
    setTimeout(()=>{this.bridge.play()},1000);
    // console.log('moves in reverse:', this.dbLog);
  }

}
