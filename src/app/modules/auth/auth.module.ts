import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { LoginServiceService } from '../../data/services/login-service.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    SocialLoginModule

  ],
  providers: [

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '687138032046-hincfi1l7jtj5qakdcqmcfk9252875fa.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },LoginServiceService

  ],
})
export class AuthModule { }
