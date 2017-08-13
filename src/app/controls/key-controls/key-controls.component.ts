import { Component, OnInit } from '@angular/core';
import { KeyHandlerService } from '../../key-handler.service';


@Component({
  selector: 'app-key-controls',
  templateUrl: './key-controls.component.html',
  styleUrls: ['./key-controls.component.css']
})
export class KeyControlsComponent implements OnInit {
  keytype = 'akey';

  constructor(private key: KeyHandlerService) {
    // This disables all arrowkey functions
    // This fixes the browser jump bug and the control select hijack bug
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
  }

  ngOnInit() {
    this.key.setKeyType(this.keytype);
  }

}
