
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoconvocatoriaComponent } from './alumnoconvocatoria/alumnoconvocatoria.component';
import { CompracticasComponent } from './compracticas/compracticas.component';
import { ProyectoatvrqsComponent } from './proyectoatvrqs/proyectoatvrqs.component';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { ProyectolistarComponent } from './proyectolistar/proyectolistar.component';
import { ProyectomiembrosComponent } from './proyectomiembros/proyectomiembros.component';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';

const routes: Routes = [
    {
        path: 'create/:cedula',
        component: ProyectocreateComponent
    },
    {
      path: 'createrespon/:cedula',
      component: ProyectoresponComponent
    },
    {
      path: 'createmienbros/:cedula/:nombrescompletos',
      component: ProyectomiembrosComponent
    },
    {
      path: 'listar',
      component: ProyectolistarComponent
    },
    {
      path: 'actrqs',
      component: ProyectoatvrqsComponent
    },
    {
      path: 'convopracticas',
      component: CompracticasComponent
    },
    {
      path: 'convocatoria/:cedula',
      component: AlumnoconvocatoriaComponent
    }     
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }