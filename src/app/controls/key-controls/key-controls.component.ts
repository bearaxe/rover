import { Component, OnInit } from '@angular/core';
import { KeyHandlerService } from '../../key-handler.service';


@Component({
  selector: 'app-key-controls',
  templateUrl: './key-controls.component.html',
  styleUrls: ['./key-controls.component.css']
})
export class KeyControlsComponent implements OnInit {
  keytype = 'akey';

  constructor(private key: KeyHandlerService) { }

  ngOnInit() {
    this.key.setKeyType(this.keytype);
  }

}
