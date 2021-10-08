import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import *as fromComponents from './components';
import { RouterModule } from '@angular/router';
//angular material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';






@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    //angular material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    
  ],
  declarations: [...fromComponents.components],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ...fromComponents.components
  ]
  
})
export class SharedModule {}
