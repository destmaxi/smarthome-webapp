import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "./services/auth-guard.service";
import {JwtService} from "./services/jwt.service";
import {AuthenticationService} from "./services/authentication.service";
import {DeviceService} from "./services/DeviceService.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    JwtService,
    AuthenticationService,
    DeviceService
  ],
  declarations: []
})

export class CoreModule {

}
