import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USERS_ENTITY } from '../../../data/constants/users.const';
import { Ientity } from '../../../shared/models/entidad';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {


  public users: Ientity[] = USERS_ENTITY;
  public id: number;
  public currentUser?:Ientity;
  constructor(
    private route: ActivatedRoute) 
    {
    this.id = this.route.snapshot.params.id;
    this.currentUser= this.users.find(user => user.id === this.id);
  }

}
