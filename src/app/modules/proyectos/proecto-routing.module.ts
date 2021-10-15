
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectoatvrqsComponent } from './proyectoatvrqs/proyectoatvrqs.component';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { ProyectolistarComponent } from './proyectolistar/proyectolistar.component';
import { ProyectomiembrosComponent } from './proyectomiembros/proyectomiembros.component';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';

const routes: Routes = [
    {
        path: 'create',
        component: ProyectocreateComponent
    },
    {
      path: 'createrespon/:cedula',
      component: ProyectoresponComponent
    },
    {
      path: 'createmienbros/:cedula',
      component: ProyectomiembrosComponent
    },
    {
      path: 'listar',
      component: ProyectolistarComponent
    },
    {
      path: 'actrqs',
      component: ProyectoatvrqsComponent
    }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }