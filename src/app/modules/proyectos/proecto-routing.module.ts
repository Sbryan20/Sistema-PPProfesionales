
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoconvocatoriaComponent } from './alumnoconvocatoria/alumnoconvocatoria.component';
import { AlumnosolicitudesComponent } from './alumnosolicitudes/alumnosolicitudes.component';
import { Anexo6Component } from './anexo6/anexo6.component';
import { CompracticasComponent } from './compracticas/compracticas.component';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { MiembroestudiantesComponent } from './miembroestudiantes/miembroestudiantes.component';
import { ProyectoatvrqsComponent } from './proyectoatvrqs/proyectoatvrqs.component';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { ProyectolistarComponent } from './proyectolistar/proyectolistar.component';
import { ProyectomiembrosComponent } from './proyectomiembros/proyectomiembros.component';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';
import { ProyectosolicitudesComponent } from './proyectosolicitudes/proyectosolicitudes.component';

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
      path: 'convocatoria/:cedula/:nombrescompletos',
      component: AlumnoconvocatoriaComponent
    } ,
    {
      path: 'solicidudes/:cedula',
      component: AlumnosolicitudesComponent
    },
    {
      path: 'ver_solicidudes',
      component: ProyectosolicitudesComponent
    },
    {
      path: 'listcv',
      component: CordinadorvinculacionComponent
    },
    {
      path: 'asigancion_docentes_a_estudiente/:cedula',
      component: MiembroestudiantesComponent
    },
    {
      path: 'anexo6',
      component: Anexo6Component
    }        
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }