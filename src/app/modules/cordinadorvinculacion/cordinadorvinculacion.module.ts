import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CordinadorvinculacionComponent } from './cordinadorvlist/cordinadorvinculacion.component';
import { SharedModule } from '@shared/shared.module';
import { CVinculacionRoutinModule } from './cordinadorvinculacion-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { Cordinadoranexo5Component } from './cordinadoranexo5/cordinadoranexo5.component';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    CordinadorvinculacionComponent,
    Cordinadoranexo5Component,
  ],
  imports: [
    CommonModule,
    CVinculacionRoutinModule,
    modules
  ]
})
export class CordinadorvinculacionModule { }
