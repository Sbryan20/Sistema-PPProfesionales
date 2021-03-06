
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoconvocatoriaComponent } from './alumnoconvocatoria/alumnoconvocatoria.component';
import { AlumnosencargoComponent } from './alumnosencargo/alumnosencargo.component';
import { AlumnosfirmaComponent } from './alumnosfirma/alumnosfirma.component';
import { AlumnosolicitudesComponent } from './alumnosolicitudes/alumnosolicitudes.component';
import { Anexo10Component } from './anexo10/anexo10.component';
import { Anexo10extendidoComponent } from './anexo10extendido/anexo10extendido.component';
import { Anexo10firmaComponent } from './anexo10firma/anexo10firma.component';
import { Anexo12Component } from './anexo12/anexo12.component';
import { Anexo12extendidoComponent } from './anexo12extendido/anexo12extendido.component';
import { Anexo13Component } from './anexo13/anexo13.component';
import { Anexo13extendidoComponent } from './anexo13extendido/anexo13extendido.component';
import { Anexo6Component } from './anexo6/anexo6.component';
import { Anexo61Component } from './anexo61/anexo61.component';
import { Anexo7Component } from './anexo7/anexo7.component';
import { Anexo8Component } from './anexo8/anexo8.component';
import { Anexo8firmaComponent } from './anexo8firma/anexo8firma.component';
import { Anexo9Component } from './anexo9/anexo9.component';
import { Anexo9firmaComponent } from './anexo9firma/anexo9firma.component';
import { CompracticasComponent } from './compracticas/compracticas.component';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { DocenteapoyoconvocatoriaComponent } from './docenteapoyoconvocatoria/docenteapoyoconvocatoria.component';
import { InfomesegimientofirmaComponent } from './infomesegimientofirma/infomesegimientofirma.component';
import { InformeseguimientoComponent } from './informeseguimiento/informeseguimiento.component';
import { MiembroestudiantesComponent } from './miembroestudiantes/miembroestudiantes.component';
import { PlanaprendizajefirmaComponent } from './planaprendizajefirma/planaprendizajefirma.component';
import { PreinformefirmaComponent } from './preinformefirma/preinformefirma.component';
import { PreinformeseguimientoComponent } from './preinformeseguimiento/preinformeseguimiento.component';
import { ProyectoatvrqsComponent } from './proyectoatvrqs/proyectoatvrqs.component';
import { ProyectocreateComponent } from './proyectocreate/proyectocreate.component';
import { ProyectolistarComponent } from './proyectolistar/proyectolistar.component';
import { ProyectomiembrosComponent } from './proyectomiembros/proyectomiembros.component';
import { ProyectoresponComponent } from './proyectorespon/proyectorespon.component';
import { ProyectosolicitudesComponent } from './proyectosolicitudes/proyectosolicitudes.component';
import { SegumientoparcialfirmaComponent } from './segumientoparcialfirma/segumientoparcialfirma.component';
import { SocializacionComponent } from './socializacion/socializacion.component';

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
      path: 'anexo6/:cedula/:nombre',
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
    },{
      path: 'resistro_de_actividades/:cedula/:nombres',
      component: Anexo8Component
    },{
      path: 'resistro_de_actividades_mensual/:cedula',
      component: Anexo9Component
    },{
      path: 'planificacion_de_actividades_mensual/:cedula',
      component: Anexo7Component
    },{
      path: 'socilizacion/:cedula',
      component: SocializacionComponent
    },{
      path: 'informe_de_culminacion/:cedula/:nombres',
      component: Anexo10Component
    },{
      path: 'resgistro_de_Beneficiarios/:cedula/:nombres',
      component: Anexo12Component
    },{
      path: 'resgistro_de_Beneficiarios_firmas/:cedula',
      component: Anexo12extendidoComponent
    },{
      path: 'informe_de_culminacion_firmas/:cedula',
      component: Anexo10extendidoComponent
    },{
      path: 'vistas_de_la_intitucion/:cedula',
      component: Anexo13Component
    },{
      path: 'vistas_de_la_intitucion_firma/:cedula',
      component: Anexo13extendidoComponent
    },{
      path: 'informe_seguimiento/:cedula',
      component: InformeseguimientoComponent
    },{
      path: 'preinforme_seguimiento/:cedula',
      component: PreinformeseguimientoComponent
    },{
      path: 'anexo8firma/:cedula',
      component: Anexo8firmaComponent
    },{
      path: 'preinforefirma/:cedula',
      component: PreinformefirmaComponent
    },{
      path: 'informefirma/:cedula',
      component: InfomesegimientofirmaComponent
    },{
      path: 'anexo9firma/:cedula',
      component: Anexo9firmaComponent
    },{
      path: 'anexo10firma/:cedula',
      component: Anexo10firmaComponent
    }
          
            
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }