import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SkaletonComponent } from './layout/skaleton/skaleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { LeftNavMenuComponent } from './layout/left-nav/left-nav-menu/left-nav-menu.component';
import { AuthorityComponent } from './modules/super-user/authority/authority.component';
import { CordinadorvinculacionComponent } from '@modules/cordinadorvinculacion/cordinadorvlist/cordinadorvinculacion.component';
import { CordinadorcvexistComponent } from '@modules/cordinadorvinculacion/cordinadorcvexist/cordinadorcvexist.component';



@NgModule({
  declarations: [
    AppComponent,
    SkaletonComponent,
    FooterComponent,
    NavigationComponent,
    HeaderComponent,
    LeftNavComponent,
    LeftNavMenuComponent,
    AuthorityComponent,
    CordinadorvinculacionComponent,
    CordinadorcvexistComponent
  ],
  imports: [
    
    //core
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide:LocationStrategy,
      useClass:PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
