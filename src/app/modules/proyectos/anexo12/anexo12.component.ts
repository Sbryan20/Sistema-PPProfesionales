import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo12Service } from '@data/services/api/anexo12.service';
import { Anexo5Service } from '@data/services/api/anexo5.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { BondingCoordinationService } from '@data/services/api/bonding-coordination.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Anexo12 } from '@shared/models/anexos/anexo12';
import { Anexo5 } from '@shared/models/anexos/anexo5';
import { Ientity } from '@shared/models/entidad';
import { Proyectos } from '@shared/models/proyecto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-anexo12',
  templateUrl: './anexo12.component.html',
  styleUrls: ['./anexo12.component.scss']
})
export class Anexo12Component implements OnInit {

  loader='assets/images/progress.gif'
  issloading=true;

  public ista='assets/images/ISTA.png'
  public fech;
  public proyectos:Proyectos[]=[];
  public proyectoresponse:Proyectos = new Proyectos;
  public entidad:Ientity=new Ientity;
  public anexo5:Anexo5[]=[];
  public cedula;
  nombre
  ////ARRAY
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;
  constructor(private anexo5Service:Anexo5Service,private anexo12Service:Anexo12Service,private anexo8Service:Anexo8Service,private proyectoService:ProyectoService,private fb: FormBuilder,private sysdateService:SysdateService,private activatedRoute:ActivatedRoute) { 
     //Array
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {  
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
    this.sysdateService.getSysdate().subscribe(data => {
      this.fech = data.fecha
    })
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre=nombre;
      this.cedula=cedula;
      this.anexo12.cedulaApoyo=cedula
      console.log(nombre)
      this.anexo5Service.getanexo5bycedula(cedula).subscribe(data=>{
        this.anexo5=data;
      })
      
    })
    this.proyectoService.getProyectos().subscribe(data=>{
      this.proyectos=data;
      this.issloading=false;  
    })
}
ngAfterViewInit(): void {
  setTimeout(()=>{
    
  },1000)
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
    nombresCompletos:null,
    cedula:null,
    observaciones:null, 
  });
}
  selectProyecto(event:any){ 
    this.proyectoService.getProtectid(event.target.value).subscribe(data=>{
      this.proyectoresponse=data;
      this.anexo8Service.getEntidadById(data.entidadbeneficiaria).subscribe(dates=>{
        this.entidad=dates;
        this.sysdateService.getSysdate().subscribe(data => {
          this.anexo12.fechaCapacitacion=data.fecha
        })
        console.log(dates)
      })
    })
    console.log(event.target.value)
  }

  anexo12:Anexo12=new Anexo12;
  obtnerdatos():Anexo12{
    
    this.anexo12.nombreAdministrador=this.entidad.nombreAdministrador;
    this.anexo12.nombreApoyo=this.nombre;
    this.anexo12.idProyectoPPP=this.proyectoresponse.id;
    
    this.anexo12.actividadesAnexo12=this.rows.getRawValue()
    return this.anexo12;
  }

  guardar(){
    Swal.fire({
      title: 'Esta seguro que desaa guardar el REGISTRO DE BENEFICIARIOS',
      text: "COORDINACIÓN DE VINCULACIÓN CON LA SOCIEDAD",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.obtnerdatos())
        this.anexo12Service.saveAnexo12(this.obtnerdatos()).subscribe(data=>{
          Swal.fire(
            'Guardado',
            'Documento Guardado.',
            'success'
          )
          window.location.reload();  
        },err=>{
          Swal.fire(
            'No guardado!',
            'Hubo un error '+err.error.Mensaje,
            'error'
          )
          window.location.reload();  
        })
      }
     
     
    })
  }
}