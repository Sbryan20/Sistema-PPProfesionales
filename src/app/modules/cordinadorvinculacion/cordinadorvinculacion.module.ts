import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { SharedModule } from '@shared/shared.module';
import { CVinculacionRoutinModule } from './cordinadorvinculacion-routing.module';
import { CordinadorcvexistComponent } from './cordinadorcvexist/cordinadorcvexist.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    CordinadorvinculacionComponent,
    CordinadorcvexistComponent
  ],
  imports: [
    CommonModule,
    CVinculacionRoutinModule,
    modules
  ]
})
export class CordinadorvinculacionModule { }
