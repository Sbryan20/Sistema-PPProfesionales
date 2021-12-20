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
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProyectomiembrosComponent } from '@modules/proyectos/proyectomiembros/proyectomiembros.component';
import { ProyectolistarComponent } from '@modules/proyectos/proyectolistar/proyectolistar.component';
import { ProyectoatvrqsComponent } from '@modules/proyectos/proyectoatvrqs/proyectoatvrqs.component';
import { AlumnoconvocatoriaComponent } from '@modules/proyectos/alumnoconvocatoria/alumnoconvocatoria.component';
import { CompracticasComponent } from './modules/proyectos/compracticas/compracticas.component';
import { AlumnosolicitudesComponent } from '@modules/proyectos/alumnosolicitudes/alumnosolicitudes.component';
import { ProyectosolicitudesComponent } from '@modules/proyectos/proyectosolicitudes/proyectosolicitudes.component';
import { MiembroestudiantesComponent } from './modules/proyectos/miembroestudiantes/miembroestudiantes.component';
import { Anexo6Component } from '@modules/proyectos/anexo6/anexo6.component';
import { Anexo61Component } from '@modules/proyectos/anexo61/anexo61.component';
import { DocenteapoyoconvocatoriaComponent } from '@modules/proyectos/docenteapoyoconvocatoria/docenteapoyoconvocatoria.component';
import { AlumnosfirmaComponent } from '@modules/proyectos/alumnosfirma/alumnosfirma.component';
import { AlumnosencargoComponent } from '@modules/proyectos/alumnosencargo/alumnosencargo.component';
import { PlanaprendizajefirmaComponent } from '@modules/proyectos/planaprendizajefirma/planaprendizajefirma.component';
import { SegumientoparcialfirmaComponent } from '@modules/proyectos/segumientoparcialfirma/segumientoparcialfirma.component';
import { Anexo8Component } from '@modules/proyectos/anexo8/anexo8.component';
import { Anexo9Component } from '@modules/proyectos/anexo9/anexo9.component';
import { Anexo7Component } from '@modules/proyectos/anexo7/anexo7.component';
import { SocializacionComponent } from '@modules/proyectos/socializacion/socializacion.component';
import { Anexo10Component } from '@modules/proyectos/anexo10/anexo10.component';
import { Anexo12Component } from '@modules/proyectos/anexo12/anexo12.component';
import { Anexo12extendidoComponent } from '@modules/proyectos/anexo12extendido/anexo12extendido.component';
import { Anexo10extendidoComponent } from '@modules/proyectos/anexo10extendido/anexo10extendido.component';
import { Anexo13Component } from '@modules/proyectos/anexo13/anexo13.component';
import { Anexo13extendidoComponent } from '@modules/proyectos/anexo13extendido/anexo13extendido.component';
import { InformeseguimientoComponent } from '@modules/proyectos/informeseguimiento/informeseguimiento.component';
import { PreinformeseguimientoComponent } from '@modules/proyectos/preinformeseguimiento/preinformeseguimiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { Anexo8firmaComponent } from '@modules/proyectos/anexo8firma/anexo8firma.component';
import { PreinformefirmaComponent } from '@modules/proyectos/preinformefirma/preinformefirma.component';
import { InfomesegimientofirmaComponent } from '@modules/proyectos/infomesegimientofirma/infomesegimientofirma.component';
import { Anexo9firmaComponent } from '@modules/proyectos/anexo9firma/anexo9firma.component';
import { Anexo10firmaComponent } from '@modules/proyectos/anexo10firma/anexo10firma.component';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSortModule,
  MatTableModule
  
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
    MiembroestudiantesComponent,
    Anexo6Component,
    Anexo61Component,
    DocenteapoyoconvocatoriaComponent,
    AlumnosfirmaComponent,
    AlumnosencargoComponent,
    PlanaprendizajefirmaComponent,
    SegumientoparcialfirmaComponent,
    Anexo7Component,
    Anexo8Component,
    Anexo9Component,
    Anexo10Component,
    Anexo12Component,
    Anexo13Component,
    SocializacionComponent,
    Anexo12extendidoComponent,
    Anexo10extendidoComponent,
    Anexo13extendidoComponent,
    InformeseguimientoComponent,
    PreinformeseguimientoComponent,
    Anexo8firmaComponent,
    PreinformefirmaComponent,
    InfomesegimientofirmaComponent,
    Anexo9firmaComponent,
    Anexo10firmaComponent
  ],
  imports: [
    
    //core
    CoreModule,
    SharedModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
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
