import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
  
       UserListComponent,
       UserDetailComponent,
       UserCreateComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserModule { }
