import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService } from '@data/services/api/carrera.service';
import { CordinadorvinculacionService } from '@data/services/api/cordinadorvinculacion.service';
import { Carreras } from '@shared/models/carrera';
import { CordinadorVinculacion } from '@shared/models/cordinadorvinculacion';
import { Ientity } from '@shared/models/entidad';
import { Proyectos } from '@shared/models/proyecto';
import { BondingCoordinationService } from '../../../data/services/api/bonding-coordination.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { ProyectoService } from '@data/services/api/proyecto.service';
import Swal from 'sweetalert2';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { CarreasDoc } from '@shared/models/dto/carrerasdo';
import { SysdateService } from '@data/services/api/sysdate.service';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min; 
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-proyectocreate',
  templateUrl: './proyectocreate.component.html',
  styleUrls: ['./proyectocreate.component.scss']
})
export class ProyectocreateComponent implements OnInit,AfterViewInit  {

  loader='assets/images/progress.gif'
  issloading=true;

  public ista='assets/images/ISTA.png'
  public secretaria='assets/images/Secretaria.png'  
  listacvinculacion: CordinadorVinculacion[]=[];
  proyectos:Proyectos = new Proyectos();
  resPPP:ResponsablePPP[]=[];
  entity:Ientity[]=[];
  listacarrera:Carreras[]=[];
  nombre?:String;
  fecha;
  private cedula?:string;
  public carrera?: string;

  //ArrayAntividades
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;



  constructor(private fb: FormBuilder,private sysdateService:SysdateService,private pesposablepppServiceprivate:ResposablepppService, private proyectoService:ProyectoService,private cvservice:CordinadorvinculacionService,private BondingCoordinationService:BondingCoordinationService,private router:Router,private carreraService:CarreraService,private activatedRoute: ActivatedRoute) { 
    this.cvservice.getCvinculacion().subscribe(data=>{
      this.listacvinculacion=data
      console.log(data)
    })
    this.sysdateService.getSysdate().subscribe(data=>this.fecha=data.fecha) 
    //ArrayActividades
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
      this.cedula=cedula;
    })
    this.pesposablepppServiceprivate.getcarrera(this.cedula+"").subscribe(data=>{
      for(let carrera of data){
        this.carrera=carrera.codigo;
        this.BondingCoordinationService.getEntity().subscribe(data=>this.entity=data)
        this.carreraService.getCarreras().subscribe(data=>this.listacarrera=data.filter(d=>d.codigo==carrera.codigo))
        this.pesposablepppServiceprivate.cargarresponsables().subscribe(cres=>{
          this.resPPP=cres.filter(d=>d.estado==true&&d.codigoCarrera==carrera.codigo)
          console.log(this.resPPP)
          this.issloading=false; 
        })}
    })   
    

    //ArrayActividades
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
  }

  //ArrayActividades
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      descripcion:null
    });
  }

 
  titulo?:string;
 


  selectEntidadBeneficaria(event: any) {
    this.proyectos.entidadbeneficiaria= event.target.value;
  }
  selectCarreta(event: any) {
    this.proyectos.codigocarrera= event.target.value;
    console.log(getRandomArbitrary(0,1000000000000))
  }
  selectEstado(event: any) {
    this.proyectos.estado= event.target.value;
  }
  selectLineaAccion(event: any) {
    this.proyectos.lineaaccion= event.target.value;
  }
  selectResposablepp(event: any) {
    this.proyectos.responsablePPP= event.target.value;
  }
  selectalcanceTerritorial(event: any) {
    this.proyectos.alcanceTerritorial= event.target.value;
  }

  validacion():boolean{
    if(this.proyectos.codigocarrera==""||this.proyectos.lineaaccion==""||this.proyectos.responsablePPP==""){
      return true;
    }else{
      return false;
    }
  }

  crearproyecto(){ 
    if(this.validacion()==false){
      this.proyectos.codigo="Proyecto "+getRandomArbitrary(0,1000000000000)
      this.proyectos.fechaat=this.fecha;
      this.proyectos.objetivosEspecificosProyecto=this.rows.getRawValue();
    console.log(this.proyectos)
    this.proyectoService.savePr(this.proyectos).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Creacién de proyecto',
        text: 'Proyecto creado correctamente',
        confirmButtonColor: "#0c3255"   
      }) 
      this.router.navigate(['/panel/proyecto/listar']);
    },err=>{
      Swal.fire({
        icon: 'warning',
        title: 'Al paracer hubo un problema',
        text: err.error.message,
        confirmButtonColor: "#0c3255"   
      })   
    }
    )}else{
      Swal.fire({
        icon: 'warning',
        title: 'DATOS INCOMPLETOS',
        text: 'SELECCIONE LOS DATOS',
        confirmButtonColor: "#0c3255"   
      })
    }  
  }



  dfgfd?:string;


  ////Impresion del Convocatoria

  generate(fecha:string,titulo:string,last_name:string,carrerad:string,rol:string,atanta:string) {

    loadFile(
      
      'https://docxtemplater.com/docs/simple.docx',
      function (error, content) {
        
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render({
            // titulo: 'Doctor en medicina',
            // fecha: '11/10/2021',
            // nombreResponsable: 'Edisson',
            // siglascarrera: 'DAm',
            // nombreEstudiante: 'Bryan',
            // cedula: '0150919751',
            // nombrecarrera: 'desarrollo',
            // paralelo: 'm4b',
            // nombreproyecto: 'sistemappp'
            fecha:"",
            titulo: "",
            last_name: "Tenemea",
            carrerad: "09999999999",
            rol: "Alumno de ista",
            atanta: ""

          });
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));
        }
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        // Output the document using Data-URI
        saveAs(out, 'Solicitud.docx');
      }
    );
  }

}
