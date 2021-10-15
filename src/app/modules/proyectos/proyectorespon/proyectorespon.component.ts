import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { AsignacionRol, Docentes } from '@shared/models/docentesfull';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { Sysdate } from '@shared/models/sysdate';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyectorespon',
  templateUrl: './proyectorespon.component.html',
  styleUrls: ['./proyectorespon.component.scss'],
})
export class ProyectoresponComponent implements OnInit {

  Docs:Docentes[]=[];
  resPPP:ResponsablePPP[]=[];
  asignacion:AsignacionRol=new AsignacionRol();
  fecha?:String;
  rolDoc="2";
  private cedula?:string;
  public sysdate?:Date;
  public responsable:ResponsablePPP=new ResponsablePPP();
  public habilitar?: boolean= false;
  public fecha_final?:Date;

  constructor( private sysdateservice:SysdateService,private resposableppservice:ResposablepppService,private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
    })
    this.resposableppservice.cargardocente().subscribe(resp =>{
    this.Docs=resp
    this.dataSourcedoc=new MatTableDataSource(this.Docs); 
  })
  this.resposableppservice.cargarresponsables().subscribe(cres=>{
    this.resPPP=cres;
  })
  this.sysdateservice.getSysdate().subscribe(date=>{
    this.sysdate=date.fecha;
  })}
  //Filtrar
 public displayedColumns = ['cedula', 'nombres_completo', 'titulo', 'docente_tipo_tiempo','materias','carreas','fecha','boton'];
 public dataSourcedoc

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourcedoc.filter = filterValue;
  }

  //Filtrar
  obtener(fecha:String, rol:String){
    let cedula=localStorage.getItem("cedula");
    console.log(fecha+" "+rol+cedula);
  }
  //HABILITAR/DESABILITAR
  setHabilitar(): void{
    this.habilitar=(this.habilitar==true)? false: true;
  }
  //
  saverppp(cedula:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Dar cargo',
      text: "CARGO: ",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, dar cargo!',
      cancelButtonText: 'No, dar cargo!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsable.cedula=cedula;
        this.responsable.coordinador_id=this.cedula;
        this.responsable.estado=true;
        this.responsable.cargo="RPPP"
        this.responsable.fecha_fin=this.fecha_final;
        console.log(this.responsable)
        this.resposableppservice.saverppp(this.responsable).subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Convocado!',
              (`${cedula}`+', resivira un Carreo el que se le convocare que a sido asigando como Resposanble PPP'),
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
  
  guardarRol():void{
   console.log(this.asignacion.coordinador_id)
    // this.adminservice.asignacionrol(this.asignacion).subscribe(data =>{
    //   console.log('guardado'+data.coordinador_id)
    // })
  }

}
