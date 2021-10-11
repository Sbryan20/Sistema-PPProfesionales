import { Component, OnInit } from '@angular/core';
import { Ientity } from '../../../shared/models/entidad';
import { BondingCoordinationService } from '../../../data/services/api/bonding-coordination.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  entity:Ientity=new Ientity();
  public secretaria='assets/images/Secretaria.png'  
  public ista='assets/images/ISTA.png'
  public codigo: number=0;
 

  constructor( private BondingCoordinationService:BondingCoordinationService, private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      this.codigo=id;
    })
    console.log(this.codigo)

  }

  crearEntidad(){
    console.log(this.entity)
     this.BondingCoordinationService.postCreate(this.entity).subscribe(data =>{
       console.log(data)
       this.router.navigate(['panel/user/list'])
     },err=>{
      Swal.fire({
        icon: 'warning',
        title: 'Al paracer hubo un problema',
        text: err.error.message,
        confirmButtonColor: "#0c3255"   
      }) 
     }
     )
  }


}
