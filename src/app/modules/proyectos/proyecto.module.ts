import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proecto-routing.module';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';
import { ProyectomiembrosComponent } from './proyectomiembros/proyectomiembros.component';
import { ProyectolistarComponent } from './proyectolistar/proyectolistar.component';
import { CompracticasComponent } from './compracticas/compracticas.component';
import { AlumnoconvocatoriaComponent } from './alumnoconvocatoria/alumnoconvocatoria.component';
import { AlumnosolicitudesComponent } from './alumnosolicitudes/alumnosolicitudes.component';
import { ProyectosolicitudesComponent } from './proyectosolicitudes/proyectosolicitudes.component';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { MiembroestudiantesComponent } from '@modules/proyectos/miembroestudiantes/miembroestudiantes.component';
import { Anexo6Component } from './anexo6/anexo6.component';
import { Anexo61Component } from './anexo61/anexo61.component';
import { DocenteapoyoconvocatoriaComponent } from './docenteapoyoconvocatoria/docenteapoyoconvocatoria.component';
import { AlumnosfirmaComponent } from './alumnosfirma/alumnosfirma.component';
import { AlumnosencargoComponent } from './alumnosencargo/alumnosencargo.component';
import { PlanaprendizajefirmaComponent } from './planaprendizajefirma/planaprendizajefirma.component';
import { SegumientoparcialfirmaComponent } from './segumientoparcialfirma/segumientoparcialfirma.component';
import { Anexo8Component } from './anexo8/anexo8.component';
import { Anexo9Component } from './anexo9/anexo9.component';
import { Anexo7Component } from './anexo7/anexo7.component';
import { SocializacionComponent } from './socializacion/socializacion.component';
import { Anexo10Component } from './anexo10/anexo10.component';
import { Anexo12Component } from './anexo12/anexo12.component';
import { Anexo12extendidoComponent } from './anexo12extendido/anexo12extendido.component';
import { Anexo10extendidoComponent } from './anexo10extendido/anexo10extendido.component';




@NgModule({
  declarations: [
    ProyectocreateComponent,
    ProyectoresponComponent,
    ProyectomiembrosComponent,
    ProyectolistarComponent,
    CompracticasComponent,
    AlumnoconvocatoriaComponent,
    CompracticasComponent,
    AlumnosolicitudesComponent,
    ProyectosolicitudesComponent,
    CordinadorvinculacionComponent,
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
    SocializacionComponent,
    Anexo12extendidoComponent,
    Anexo10extendidoComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProyectoModule { }
