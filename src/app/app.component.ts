import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { BridgeService } from './bridge.service';
import { Subject } from 'rxjs';
import { KeyHandlerService } from './key-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'the game';
  width = this.bridge.width;
  height = this.bridge.height;
  basis = this.bridge.basis;
  pos = this.bridge.pos;
  rotation = 0;
  safeTransform;
  // rotSubj = new Subject<number>();

  constructor(private sanitizer: DomSanitizer,
              private bridge: BridgeService,
              private key: KeyHandlerService) {
                this.bridge.rotSubj.subscribe(
                  (rotation: number) => {
                    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle("rotate( " + rotation + "deg)");
                  }
                )
              }

  ngOnInit(){
    this.bridge.isPlaying = true;
    setTimeout(()=>{this.bridge.play()},1000);
  }

}
