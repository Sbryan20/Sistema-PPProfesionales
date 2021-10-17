import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proecto-routing.module';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';
import { ProyectomiembrosComponent } from './proyectomiembros/proyectomiembros.component';
import { ProyectolistarComponent } from './proyectolistar/proyectolistar.component';
import { CompracticasComponent } from './compracticas/compracticas.component';



@NgModule({
  declarations: [
    ProyectocreateComponent,
    ProyectoresponComponent,
    ProyectomiembrosComponent,
    ProyectolistarComponent,
    CompracticasComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProyectoModule { }
