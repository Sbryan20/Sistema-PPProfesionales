import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Ientity } from '../../../shared/models/entidad';
import { BondingCoordinationService } from '../../../data/services/api/bonding-coordination.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Sysdate } from '@shared/models/sysdate';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit,AfterViewInit {
  
  loader='assets/images/progress.gif'
  issloading=true;

  entity:Ientity=new Ientity();
  public secretaria='assets/images/Secretaria.png'  
  public ista='assets/images/ISTA.png'
  public codigo: number=0;
  public sysdate?:Date;
  constructor( private sysdateservice:SysdateService,private BondingCoordinationService:BondingCoordinationService, private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      this.codigo=id;
    })
    this.sysdateservice.getSysdate().subscribe(date=>{
      this.sysdate=date.fecha;
    })
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false; 
    },1000)
  }

  crearEntidad(){
    console.log(this.entity)
     this.entity.idCoordinador=this.codigo;
     this.entity.fechaCreacion=this.sysdate+"";
     this.BondingCoordinationService.postCreate(this.entity).subscribe(data =>{
       console.log(data)
       this.router.navigate(['panel/user/list'])
       Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Entidad Guardada',
        confirmButtonColor: "#0c3255"   
      })
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
