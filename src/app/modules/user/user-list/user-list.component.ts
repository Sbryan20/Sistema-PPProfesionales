import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BondingCoordinationService } from '../../../data/services/api/bonding-coordination.service';
import { Ientity } from '../../../shared/models/entidad';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  entity:Ientity[]=[];
  handleSearch(value:String){
  this.filtro_valor=value
  }
  filtro_valor:String='';

 
  // public users:Ientity[]=USERS_ENTITY;
  constructor(private BondingCoordinationService:BondingCoordinationService,private router:Router) { }

  ngOnInit(): void {
    this.BondingCoordinationService.getEntity().subscribe(data=>this.entity=data)
  }

}
