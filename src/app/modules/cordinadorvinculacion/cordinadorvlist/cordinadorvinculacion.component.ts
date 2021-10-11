import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CordinadorVinculacion } from '@shared/models/cordinadorvinculacion';
import { CordinadorvinculacionService } from '@data/services/api/cordinadorvinculacion.service';

@Component({
  selector: 'app-cordinadorvinculacion',
  templateUrl: './cordinadorvinculacion.component.html',
  styleUrls: ['./cordinadorvinculacion.component.scss']
})
export class CordinadorvinculacionComponent implements OnInit {

  listacvinculacion: CordinadorVinculacion[]=[];

  constructor(private cvservice:CordinadorvinculacionService,private router:Router) { }

  ngOnInit(): void {
    this.cvservice.getCvinculacion().subscribe(data=>{
      this.listacvinculacion=data
      console.log(data)
    })
  }


  guardarcv(docente:CordinadorVinculacion):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Covocatoaria',
      text: "Convocar a: "+`${docente.nombres}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, convocar!',
      cancelButtonText: 'No, convocar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        docente.estado=true;
        this.cvservice.saveCv(docente).subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Convocado!',
              (`${docente.nombres}`+', obtendra un Correo en el cual se cominicará que le ha sido combocado como Cordindar de Inculacion'),
              'success'
            )  
        },err=>{
          Swal.fire({
            icon: 'warning',
            title: 'Al paracer hubo un problema',
            text: err.error.message,
            confirmButtonColor: "#0c3255"   
          }) 
        }) 
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se relizó ningun cambio',
          'error'
        )
      }
    })
    
  }

}
