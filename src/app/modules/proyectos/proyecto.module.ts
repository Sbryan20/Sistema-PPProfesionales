import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proecto-routing.module';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';



@NgModule({
  declarations: [
    ProyectocreateComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule
  ]
})
export class ProyectoModule { }
