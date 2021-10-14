import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';


const routes: Routes = [
  {
    path: 'listcv',
    component: CordinadorvinculacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CVinculacionRoutinModule { }