import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { AsignacionRol, Docentes } from '@shared/models/docentesfull';
import { CarreasDoc } from '@shared/models/dto/carrerasdo';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { Sysdate } from '@shared/models/sysdate';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyectorespon',
  templateUrl: './proyectorespon.component.html',
  styleUrls: ['./proyectorespon.component.scss'],
})
export class ProyectoresponComponent implements OnInit,AfterViewInit {

  loader='assets/images/progress.gif'
  empty='assets/images/siresultado.gif'
  
  issloading=true;

  Docs:Docentes[]=[];
  resPPP:Docentes= new Docentes;
  asignacion:AsignacionRol=new AsignacionRol();
  fecha?:String;
  rolDoc="2";
  private cedula?:string;
  public sysdate?:Date;
  public responsable:ResponsablePPP=new ResponsablePPP();
  public habilitar?: boolean= false;
  public fecha_final?:Date;
  public carrera?: string;

  constructor( private sysdateservice:SysdateService,private resposableppservice:ResposablepppService,private router:Router,private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
    })
    this.listarres();
    
  
  this.resposableppservice.getcarrera(this.cedula+"").subscribe(data=>{
    for(let carrera of data){
      this.carrera=carrera.codigo;
      this.resposableppservice.getResposable(carrera.codigo+'').subscribe(cres=>{
        this.resPPP=cres
        console.log(cres)
      })
      console.log(this.carrera)}
  })
  
  this.sysdateservice.getSysdate().subscribe(date=>{
    this.sysdate=date.fecha;
  })}
  listarres(){
    this.resposableppservice.cargardocente().subscribe(resp =>{
      this.Docs=resp
      this.dataSourcedoc=new MatTableDataSource(this.Docs);
      this.issloading=false;  
    })
  }
  //Filtrar
 public displayedColumns = ['cedula', 'nombres_completo', 'titulo', 'docente_tipo_tiempo','materias','carreas','boton'];
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
      title: 'Asignar Cargo',
      text: "CARGO: ",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsable.cedula=cedula;
        this.responsable.coordinador_id=this.cedula;
        this.responsable.codigoCarrera=this.carrera;
        this.responsable.estado=true;
        this.responsable.cargo="RPPP"
        console.log(this.responsable)
        this.resposableppservice.saverppp(this.responsable).subscribe(
          data=>{
            window.location.reload();               
        },err=>{
          Swal.fire({
            icon: 'warning',
            title: 'Al parecer hubo un problema',
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
          'No se relizó ningún cambio',
          'error'
        )
      }
    })
  }
  //
  quitar(responsable:ResponsablePPP){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Remover cargo',
      text: "CARGO: ",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        responsable.estado=false;
        console.log(responsable)
        this.resposableppservice.updateppp(responsable).subscribe(
          data=>{
            window.location.reload();             
        },err=>{
          Swal.fire({
            icon: 'warning',
            title: 'Al parecer hubo un problema',
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
          'No se relizó ningún cambio',
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
