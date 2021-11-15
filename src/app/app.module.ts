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
import { CordinadorvinculacionComponent } from '@modules/proyectos/cordinadorvlist/cordinadorvinculacion.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ProyectocreateComponent } from './modules/proyectos/proyectocreate/proyectocreate.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProyectoresponComponent } from '@modules/proyectos/proyectorespon/proyectorespon.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProyectomiembrosComponent } from '@modules/proyectos/proyectomiembros/proyectomiembros.component';
import { ProyectolistarComponent } from '@modules/proyectos/proyectolistar/proyectolistar.component';
import { ProyectoatvrqsComponent } from '@modules/proyectos/proyectoatvrqs/proyectoatvrqs.component';
import { AlumnoconvocatoriaComponent } from '@modules/proyectos/alumnoconvocatoria/alumnoconvocatoria.component';
import { CompracticasComponent } from './modules/proyectos/compracticas/compracticas.component';
import { AlumnosolicitudesComponent } from '@modules/proyectos/alumnosolicitudes/alumnosolicitudes.component';
import { ProyectosolicitudesComponent } from '@modules/proyectos/proyectosolicitudes/proyectosolicitudes.component';
import { MiembroestudiantesComponent } from './modules/miembroestudiantes/miembroestudiantes.component';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSortModule,
  MatTableModule,
];
@NgModule({
  declarations: [
    AppComponent,
    SkaletonComponent,
    FooterComponent,
    NavigationComponent,
    HeaderComponent,
    LeftNavComponent,
    LeftNavMenuComponent,
    CordinadorvinculacionComponent,
    ProyectocreateComponent,
    ProyectoresponComponent,
    ProyectomiembrosComponent,
    ProyectolistarComponent,
    ProyectoatvrqsComponent,
    AlumnoconvocatoriaComponent,
    CompracticasComponent,
    AlumnosolicitudesComponent,
    ProyectosolicitudesComponent,
    MiembroestudiantesComponent
  ],
  imports: [
    
    //core
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSliderModule,
    modules
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
