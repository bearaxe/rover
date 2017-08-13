import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private bridge: BridgeService) { }

  ngOnInit() {
  }

  //bind your form to the options in bridge service.
  // The board should take care of itself after.

}
