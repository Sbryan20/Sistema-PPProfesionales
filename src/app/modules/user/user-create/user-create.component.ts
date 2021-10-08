import { Component, OnInit } from '@angular/core';
import { Ientity } from '../../../shared/models/entidad';
import { BondingCoordinationService } from '../../../data/services/api/bonding-coordination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  entity:Ientity=new Ientity();
  public secretaria='assets/images/Secretaria.png'  
  public ista='assets/images/ISTA.png'  

  constructor( private BondingCoordinationService:BondingCoordinationService, private router:Router) { }

  ngOnInit(): void {
  }

  crearEntidad(){
    console.log(this.entity)
     this.BondingCoordinationService.postCreate(this.entity).subscribe(data =>{
       console.log(data)
       this.router.navigate(['panel/user/list'])

     })
  }


}
