import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CordinadorcvexistComponent } from './cordinadorcvexist/cordinadorcvexist.component';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';


const routes: Routes = [
  {
    path: 'listcv',
    component: CordinadorvinculacionComponent
  },
  {
    path: 'listcvexist',
    component: CordinadorcvexistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CVinculacionRoutinModule { }