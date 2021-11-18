
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoconvocatoriaComponent } from './alumnoconvocatoria/alumnoconvocatoria.component';
import { AlumnosencargoComponent } from './alumnosencargo/alumnosencargo.component';
import { AlumnosfirmaComponent } from './alumnosfirma/alumnosfirma.component';
import { AlumnosolicitudesComponent } from './alumnosolicitudes/alumnosolicitudes.component';
import { Anexo6Component } from './anexo6/anexo6.component';
import { Anexo61Component } from './anexo61/anexo61.component';
import { CompracticasComponent } from './compracticas/compracticas.component';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { DocenteapoyoconvocatoriaComponent } from './docenteapoyoconvocatoria/docenteapoyoconvocatoria.component';
import { MiembroestudiantesComponent } from './miembroestudiantes/miembroestudiantes.component';
import { PlanaprendizajefirmaComponent } from './planaprendizajefirma/planaprendizajefirma.component';
import { ProyectoatvrqsComponent } from './proyectoatvrqs/proyectoatvrqs.component';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { ProyectolistarComponent } from './proyectolistar/proyectolistar.component';
import { ProyectomiembrosComponent } from './proyectomiembros/proyectomiembros.component';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';
import { ProyectosolicitudesComponent } from './proyectosolicitudes/proyectosolicitudes.component';
import { SegumientoparcialfirmaComponent } from './segumientoparcialfirma/segumientoparcialfirma.component';

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
      path: 'convopracticas/:nombre',
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
      path: 'ver_solicidudes/:cedula',
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
      path: 'anexo6/:cedula',
      component: Anexo6Component
    },{
      path: 'anexo6_1/:cedula/:nombrescompletos',
      component: Anexo61Component
    },{
      path: 'docentemiebros_convocatoria/:cedula',
      component: DocenteapoyoconvocatoriaComponent
    },{
      path: 'alumno_convocatoria/:cedula',
      component: AlumnosfirmaComponent
    },{
      path: 'alumno_en_cargo/:cedula',
      component: AlumnosencargoComponent
    },{
      path: 'plan_de_aprendizaje/:cedula',
      component: PlanaprendizajefirmaComponent
    },{
      path: 'seguimeinto_parcial_firma/:cedula',
      component: SegumientoparcialfirmaComponent
    }  
            
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }