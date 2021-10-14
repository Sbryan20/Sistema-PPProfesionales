
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';

const routes: Routes = [
    {
        path: 'create',
        component: ProyectocreateComponent
    },
    {
      path: 'createrespon/:cedula',
      component: ProyectoresponComponent
    }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }