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
    Anexo61Component
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProyectoModule { }
