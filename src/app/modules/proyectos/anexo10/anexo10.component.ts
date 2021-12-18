import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo10Service } from '@data/services/api/anexo10.service';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo5Service } from '@data/services/api/anexo5.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Anexo10 } from '@shared/models/anexos/anexo10'; 
import { Anexo2 } from '@shared/models/anexos/anexo2';
import { Anexo3 } from '@shared/models/anexos/anexo3'; 
import { Anexo5 } from '@shared/models/anexos/anexo5';
import { DocenteApoyoDatos } from '@shared/models/dto/docenteapoyodatos';
import { Ientity } from '@shared/models/entidad';
import { Proyectos } from '@shared/models/proyecto';
import { ResponsablePPP } from '@shared/models/responsableppp';
import Swal from 'sweetalert2';
 


@Component({
  selector: 'app-anexo10',
  templateUrl: './anexo10.component.html',
  styleUrls: ['./anexo10.component.scss']
})
export class Anexo10Component implements OnInit,AfterViewInit {

  loader='assets/images/progress.gif'
  issloading=true;

public ista='assets/images/ISTA.png'
public fech;
public cedula;
public nombre;
public director;
public nombreproyecto;
public id;
public number_a?
public number?
public anexo3:Anexo3[]=[];
public anexo5:Anexo5[]=[];
public proyecto:Proyectos=new Proyectos;  
anexoss2:Anexo2=new Anexo2();
anexoss5:Anexo5=new Anexo5();
public nombreD
public idproyecto  
public cicl  
correo?:String;
telefono?:String;
nombreEmpresa?:String
ciudad?:String
direccion?:String
cicloo?:Number
nombreDocenteapoyo?:String;
cedulaDocenteApoyo?:String;
correo_DocenteApoyo?:String;
nombreAdministrador?:String;
cedulaAdministrador?:String;
correoAdministrador?:String;
horasRealizadas?:String;
fechaInicio?:Date;
fechaFin?:Date;
public edntidad:Ientity=new Ientity;
public proyectos:Proyectos=new Proyectos;


public DocenteA:DocenteApoyoDatos=new DocenteApoyoDatos;

public anexo1response:Anexo1[]=[];

  ////ARRAY
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;

  constructor(private anexo8Service:Anexo8Service, private anexo10Service:Anexo10Service,private anexo5Service:Anexo5Service, private anexo2Service:Anexo2Service,  private router: Router,private fb: FormBuilder,private sysdateService:SysdateService,private activatedRoute: ActivatedRoute,private anexo3Service:Anexo3Service, private proyectoService:ProyectoService) { 
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }
  
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }

    ngOnInit(): void { 
      this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre = params['nombres'] 
      this.nombre=nombre;
      
      this.cedula=cedula; 
      this.anexo3Service.getanexo3(cedula).subscribe(datos=>{
        this.anexo3=datos.filter(d=>d.estado=="AN")
        this.issloading=false; 
      })
    
    })
    //Array
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
    
    //fechas
      this.sysdateService.getSysdate().subscribe(data => {
        this.fech = data.fecha})
  }

        onAddRow() {
          this.rows.push(this.createItemFormGroup());
          console.log(this.rows.getRawValue())
        }
        onRemoveRow(rowIndex:number){
          this.rows.removeAt(rowIndex);
        }
        createItemFormGroup(): FormGroup {
          return this.fb.group({
            actividadesGenerales:null,
            actividadesEspecificas:null,
            productoGenerado:null, 
          });
        }

  selectProyecto(event: any) {
    this.proyectoService.getProtectid(event.target.value).subscribe(data=>{
      this.idproyecto=data.id
      this.director=data.nombredirector
      this.nombreproyecto=data.nombre
      this.proyectoService.getProtectid(Number(data.id)).subscribe(datas=>{
        this.proyectos=datas;
  
      });
      
      this.anexo8Service.getEntidadById(data.entidadbeneficiaria).subscribe(da=>{
        this.ciudad=da.ciudad;
        this.direccion=da.direccion;
        this.nombreEmpresa=da.nombre;
        this.cedulaAdministrador=da.cedulaAdministrador;
        this.nombreAdministrador=da.nombreAdministrador;
        this.correoAdministrador=da.correoAdministrador;
      })
      
    })
    this.anexo2Service.getAnexoM(event.target.value).subscribe(data => {
      this.number=data.id;
      this.anexoss2=data;  
        this.cicl=data.ciclo;
    })
    this.anexo5Service.getDocentesApoyo(this.cedula,event.target.value).subscribe(data=>{
      console.log(this.cedula,event.target.value)
    this.nombreDocenteapoyo=data.nombreDApoyo
    this.cedulaDocenteApoyo=data.cedulaDAapoyo
    this.correo_DocenteApoyo=data.correoDApoyo
    console.log(this.nombreDocenteapoyo,this.cedulaDocenteApoyo,this.correo_DocenteApoyo)
      }) 
    
    



  }




 public anexo10:Anexo10 = new Anexo10;
 ObtenerDatos():Anexo10{  
   this.anexo10.actividadesAnexo10s=this.rows.getRawValue(); 
   this.anexo10.nombreProyecto=this.nombreproyecto;
   this.anexo10.idProyectoPPP=this.idproyecto;
   this.anexo10.nombreDirector=this.director;
   this.anexo10.fecha=this.fech;   

   this.anexo10.cedulaDocenteApoyo=this.cedulaDocenteApoyo;
   this.anexo10.nombreDocenteapoyo=this.nombreDocenteapoyo
   this.anexo10.correo_DocenteApoyo=this.correo_DocenteApoyo; 

   this.anexo10.nombreEmpresa=this.nombreEmpresa;
   this.anexo10.ciudad=this.ciudad;
   this.anexo10.direccion=this.direccion;

   this.anexo10.nombreEstudiante=this.nombre;
   this.anexo10.cedulaEstudiante=this.cedula;
   this.anexo10.telefonoEstudiante=this.telefono;
   this.anexo10.correoEstudiante=this.correo; 

   this.anexo10.nombreAdministrador=this.nombreAdministrador;
   this.anexo10.cedulaAdministrador=this.cedulaAdministrador;
   this.anexo10.correoAdministrador=this.correoAdministrador;

   this.anexo10.horasRealizadas=this.horasRealizadas;
   this.anexo10.fechaFin=this.fechaFin;
   this.anexo10.fechaInicio=this.fechaInicio;

   return this.anexo10
 }



save(){ 
  console.log(this.ObtenerDatos().descripcionEmpresa)
  this.anexo10Service.saveAnexo10(this.ObtenerDatos()).subscribe(datos=>{
    Swal.fire({
      icon: 'success',
      title: 'INFORME GENERADO',
      text: 'Datos guadados correctamente',
      confirmButtonColor: "#0c3255"   
    }) 
    this.router.navigate(['/panel/proyecto/informe_de_culminacion/']);
    window.location.reload();  
  },err=>{
    Swal.fire({
      icon: 'warning',
      title: 'Al paracer hubo un problema',
      text: err.error.message,
      confirmButtonColor: "#0c3255"   
    }) 
   
  })

}

}