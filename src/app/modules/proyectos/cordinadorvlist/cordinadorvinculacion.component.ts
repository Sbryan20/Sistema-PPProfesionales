import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CordinadorVinculacion } from '@shared/models/cordinadorvinculacion';
import { CordinadorvinculacionService } from '@data/services/api/cordinadorvinculacion.service';
import {MatTableDataSource} from '@angular/material/table';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cordinadorvinculacion',
  templateUrl: './cordinadorvinculacion.component.html',
  styleUrls: ['./cordinadorvinculacion.component.scss']
})
export class CordinadorvinculacionComponent implements OnInit,AfterViewInit {
  
  loader='assets/images/progress.gif'
  issloading=true;
 //Filtrar
 public displayedColumns = ['cedula', 'nombres', 'apellidos', 'titulo','carga','estado','boton'];
 public dataSource
 public listacvinculacion: CordinadorVinculacion[]=[];
 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  //Filtrar

  constructor(private cvservice:CordinadorvinculacionService,private router:Router) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
    
    },1000)
  }

  ngOnInit(): void {
    this.listar()
  }
  listar(){
    this.cvservice.getCvinculacion().subscribe(data=>{
      console.log(data)
      this.listacvinculacion=data
      this.dataSource=new MatTableDataSource(this.listacvinculacion);
      this.issloading=false; 
    }) 
  }

  

  quitarcv(docente:CordinadorVinculacion){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Quitar cargo',
      text: "Quitar a: "+`${docente.nombres}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, quitar!',
      cancelButtonText: 'No, quitar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cvservice.getCvnexiste(docente.cedula+"").subscribe(
          data=>{
            docente.estado=false;
            this.cvservice.updateCv(docente).subscribe(data=>{
              swalWithBootstrapButtons.fire(
                'Convocado!',
                (`${docente.nombres}`+', ya no tiene el cargo de Cordinador de Vinculacion'),
                'success'
              )  
            }) 
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

  guardarcv(docente:CordinadorVinculacion):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Convocatoria',
      text: "Convocar a: "+`${docente.nombres}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, convocar!',
      cancelButtonText: 'No, convocar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cvservice.getCvnexiste(docente.cedula+"").subscribe(
          data=>{
            if(data==true){
              docente.estado=true;
              this.cvservice.updateCv(docente).subscribe(data=>{
                swalWithBootstrapButtons.fire(
                  'Convocado!',
                  (`${docente.nombres}`+', obtendra un Correo en el cual se cominicará que le ha sido combocado como Cordinadar de Vinculacion'),
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
            }else{
              docente.estado=true;
        this.cvservice.saveCv(docente).subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Convocado!',
              (`${docente.nombres}`+', obtendra un Correo en el cual se le comunicará que ha sido convocado como Cordinador de Vinculación'),
              'success'
            )  
        },err=>{
          Swal.fire({
            icon: 'warning',
            title: 'Al paracer hubo un problema',
            text: err.error.message,
            confirmButtonColor: "#0c3255"   
          }) 
        })}
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

