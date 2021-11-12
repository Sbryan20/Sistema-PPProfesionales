import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { Cordinadoranexo5Component } from './cordinadoranexo5/cordinadoranexo5.component';

const routes: Routes = [
  {
    path: 'listcv',
    component: CordinadorvinculacionComponent
  },
  {
    path: 'anexo5',
    component: Cordinadoranexo5Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CVinculacionRoutinModule { }