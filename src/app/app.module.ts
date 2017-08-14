import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoverComponent } from './rover/rover.component';
import { GameComponent } from './game/game.component';
import { GameEngineService } from './game/game-engine.service';
import { GameCellComponent } from './game/game-cell/game-cell.component';
import { ControlsComponent } from './controls/controls.component';
import { BridgeService } from './bridge.service';
import { KeyHandlerService } from './key-handler.service';
import { KeyControlsComponent } from './controls/key-controls/key-controls.component';
import { AdminComponent } from './admin/admin.component';
import { BoundsService } from './bounds.service';

@NgModule({
  declarations: [
    AppComponent,
    RoverComponent,
    GameComponent,
    GameCellComponent,
    ControlsComponent,
    KeyControlsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GameEngineService, BridgeService, KeyHandlerService, BoundsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
