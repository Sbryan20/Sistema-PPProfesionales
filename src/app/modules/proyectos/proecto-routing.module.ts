
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';

const routes: Routes = [
    {
        path: 'create',
        component: ProyectocreateComponent
    }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }