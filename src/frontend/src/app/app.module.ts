import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Error404Component} from "./shared/components/error/404/error404.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {SharedModule} from "./shared/shared.module";
import {HomeModule} from "./components/home/home.module";
import {LoginModule} from "./components/login/login.module";
import {DevicesModule} from "./components/devices/devices.module";
import {About} from "./components/about/about.component";
import {RoomsRoutingModule} from "./components/rooms/rooms-routing.module";
import {RoomsModule} from "./components/rooms/rooms.module";
import {ManageModule} from "./components/manage/manage.module";
import {ManageRoutingModule} from "./components/manage/manage-routing.module";
import {FlashMessagesModule} from "angular2-flash-messages";

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    HeaderComponent,
    About,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    LoginModule,
    DevicesModule,
    RoomsModule,
    RoomsRoutingModule,
    ManageModule,
    ManageRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
