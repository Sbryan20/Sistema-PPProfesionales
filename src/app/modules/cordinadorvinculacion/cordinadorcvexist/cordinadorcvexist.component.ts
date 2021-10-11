import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CordinadorvinculacionService } from '@data/services/api/cordinadorvinculacion.service';
import { CordinadorVinculacion } from '@shared/models/cordinadorvinculacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cordinadorcvexist',
  templateUrl: './cordinadorcvexist.component.html',
  styleUrls: ['./cordinadorcvexist.component.scss']
})
export class CordinadorcvexistComponent implements OnInit {
  
  listacvinculacion: CordinadorVinculacion[]=[];

  constructor(private cvservice:CordinadorvinculacionService,private router:Router) { }

  ngOnInit(): void {
    this.cvservice.getCvinculacionExist().subscribe(data=>{
      this.listacvinculacion=data
      console.log(data)
    })
  }

  modificarcv(docente:CordinadorVinculacion):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Dar de bajo',
      text: "Dar de baja a: "+`${docente.nombres}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, dar de baja!',
      cancelButtonText: 'No, dar de baja!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        docente.estado=false;
        this.cvservice.updateCv(docente).subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Convocado!',
              (`${docente.nombres}`+', Ya no forma parte de ningun proceso de vinculación'),
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


