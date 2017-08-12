import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoverComponent } from './rover/rover.component';
import { GameComponent } from './game/game.component';
import { GameEngineService } from './game/game-engine.service';
import { GameCellComponent } from './game/game-cell/game-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    RoverComponent,
    GameComponent,
    GameCellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GameEngineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
