import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { SharedModule } from '@shared/shared.module';
import { CVinculacionRoutinModule } from './cordinadorvinculacion-routing.module';
import { CordinadorcvexistComponent } from './cordinadorcvexist/cordinadorcvexist.component';



@NgModule({
  declarations: [
    CordinadorvinculacionComponent,
    CordinadorcvexistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CVinculacionRoutinModule
  ]
})
export class CordinadorvinculacionModule { }
