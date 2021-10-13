import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CordinadorVinculacion } from '@shared/models/cordinadorvinculacion';
import { CordinadorvinculacionService } from '@data/services/api/cordinadorvinculacion.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cordinadorvinculacion',
  templateUrl: './cordinadorvinculacion.component.html',
  styleUrls: ['./cordinadorvinculacion.component.scss']
})
export class CordinadorvinculacionComponent implements OnInit,AfterViewInit {
  loader='assets/images/loader.gif'
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
    this.issloading=false;
    },1000)
  }

  ngOnInit(): void {
    this.cvservice.getCvinculacion().subscribe(data=>{
      this.listacvinculacion=data
      this.dataSource=new MatTableDataSource(this.listacvinculacion);
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
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
