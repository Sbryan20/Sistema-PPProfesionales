import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo6Service } from '@data/services/api/anexo6.service';
import { BondingCoordinationService } from '@data/services/api/bonding-coordination.service';
import { CarreraService } from '@data/services/api/carrera.service';
import { MateriasService } from '@data/services/api/materias.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Anexo2, listanexo2 } from '@shared/models/anexos/anexo2';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Anexo6 } from '@shared/models/anexos/anexo6';
import { Carreras } from '@shared/models/carrera';
import { Ientity } from '@shared/models/entidad';
import { Materias } from '@shared/models/materias';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { Sysdate } from '@shared/models/sysdate';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';
import { CordinadorvinculacionService } from '@data/services/api/cordinadorvinculacion.service';
import { Docx } from '@shared/models/dto/docemento';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



@Component({
  selector: 'app-anexo6',
  templateUrl: './anexo6.component.html',
  styleUrls: ['./anexo6.component.scss']
})
export class Anexo6Component implements OnInit {
  public listproyecto:Anexo2[]=[];
  public listalm:Anexo3[]=[];
anexoss2:Anexo2=new Anexo2();
anexo6:Anexo6=new Anexo6(); 
public nombreetidad?:String
proyecto: listanexo2 = new listanexo2();
sysdate: Sysdate = new Sysdate();
entidad: Ientity = new Ientity();
public cicl
public fech
public entidadb
public docxs:Docx=new Docx;

public nombrepro
public nombresestudiante?:String;
public cedula?:String;
public nombreD
public idproyecto
public materiasp
public nombreResponsa
resPPP:ResponsablePPP[]=[];
id?: number;
public number_a?
idProyectoPPP?: number;
public number?
periodoAcademico?:String;
entity:Ientity[]=[];
public sum = 0;
listacarrera:Carreras[]=[];
nombre?:String; 
public carrera?: string;
anexoss3: Anexo3=new Anexo3;
public materias:Materias[]=[]



    public anexo1response:Anexo1[]=[];
    anexo3: Anexo3=new Anexo3;
    anexo1: Anexo1=new Anexo1();
    anexo1es: Anexo1=new Anexo1;
//

  //cargar input

  public secretaria='assets/images/Secretaria.png'  
  public ista='assets/images/ISTA.png'

   //ArrayAntividades
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;

  constructor (private fb: FormBuilder,private proyectoService:ProyectoService, private materiasService:MateriasService,
    private carreraService:CarreraService,private SysdateService: SysdateService,private activatedRoute: ActivatedRoute,
    private resposablepppService:ResposablepppService,private anexo1Service:Anexo1Service,private anexo6Service: Anexo6Service,
    private anexo2Service: Anexo2Service
    ,private anexo3Service: Anexo3Service,
    private cordinadorvinculacionService:CordinadorvinculacionService) { 
    //ArrayActividades
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
    this.anexo2Service.getAnexo2().subscribe(data => {
      this.listproyecto=data;
    })
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      console.log(cedula)
      this.resposablepppService.getResponsableId(cedula).subscribe(data=>{
        console.log(data.codigo)
        this.anexo1Service.getbyCarrera(data.codigo).subscribe(dat=>{
          this.anexo1response=dat.filter(da=>da.nombreRol=="apoyo")
          console.log(this.anexo1response)
        })
      })
    })
    this.SysdateService.getSysdate().subscribe(data => {
      this.sysdate = data
    })

      //ArrayActividades
      this.addForm.get("items_value")?.setValue("yes");
      this.addForm.addControl('rows', this.rows);
  }

  //ArrayActividades
  onAddRow() {
    this.sum = 0;
    this.rows.push(this.createItemFormGroup());
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.horasAsignadas;
      console.log(this.sum)
    })
    
  }
  onRemoveRow(rowIndex:number){
    this.sum = 0;
    this.rows.removeAt(rowIndex);
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.horasAsignadas;
      console.log(this.sum)
    })
  }
  sumar(){
    this.sum = 0;
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.horasAsignadas;
      console.log(this.sum)
    })
  }
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      actividad:null,
      asignatura:null,
      resultado:null,
      horasAsignadas:null,
    });
  }
  public anexo6resposae:Anexo6 = new Anexo6;
  obtenerdatos():Anexo6 { 
    //
    return this.anexo6resposae;
  }
  selectP(event: any) {
   this.anexo2Service.getAnexoM(event.target.value).subscribe(data => {
    this.number=data.id;
    this.anexoss2=data;
    
   
    this.nombreResponsa=data.nombreResponsable; 
      this.id= parseInt(this.proyecto.id + '');
      this.entidadb=data.entidadBeneficiaria;
      this.nombrepro=data.nombreProyecto;
      this.idproyecto=data.idProyectoPPP;
      this.cicl=data.ciclo;
 
/////////materias////////////////////////////////////////////////////////////////////
      this.anexo2Service.getAnexoM(event.target.value).subscribe(data=>{
        this.number_a=data.id
        this.materiasService.getProtectid(data.siglasCarrera).subscribe(data2=>{
          this.materias=data2;
          console.log(this.materias)
        })
      })
    })
  }

 selectCedula(event:any){
this.cedula=event.target.value;
this.anexo3Service.getanexo3(event.target.value).subscribe(data=>{
  this.nombresestudiante=data[0].nombresestudiante+" "+data[0].apellidosestudiante;

})

 }
  selectAlumnos(event: any) {
    console.log(event.target.value)
    if(event.target.value=="SL"){
    }else{
      this.anexo1Service.getbyCedula(event.target.value).subscribe(data=>{
        this.anexo1=data[0]
        this.anexo3Service.getanexo3by(data[0].idProyectoPPP).subscribe(d=>{
          this.listalm=d.filter(da=>da.estado=="AN");
          console.log(this.listalm);
        })
      })   
    }
  }


  crear(){
   this.anexo6.proyectoId=this.idproyecto;
    this.anexo6.nombreProyecto=this.nombrepro;
    this.anexo6.ciclo=this.cicl;
    this.anexo6.nombreEntidad=this.entidadb;
    this.anexo6.fecha=this.fech;
    this.anexo6.periodoAcademico= this.periodoAcademico;
    this.anexo6.nombreResponsableVinculacion=this.nombreResponsa; 
    this.anexo6.nombreDocenteApoyo=this.anexo1.nombreDelegado;
    this.anexo6.cedulaEstudiante=this.cedula;
    this.anexo6.nombreEstudiante=this.nombresestudiante;
    this.anexo6.totalHoras=this.sum+'';
    this.cordinadorvinculacionService.getall().subscribe(data=>{
      this.anexo6.nombreCoordinadorVinculacion=data.nombres+" "+data.apellidos;
      this.anexo6.cedulaCoordinadorVinculacion=data.cedula;
    })
    
    this.anexo6.actividades=this.rows.getRawValue()

    Swal.fire({
      title: 'Esta seguro que apecto la solicitud ',
      text: "Para ello debe firmar el siguiente anexo con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, postular!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ANEXO 3!',
          'Se le descargará un archivo WORD, y deberá subirlo en formato pdf',
          'success'
        )
        this.generate(this.anexo6);
          const { value: file } = await Swal.fire({
            allowOutsideClick: false,
            title: 'SELECCIONE EL PDF',
            text:'Debe subir la covocataria en tipo PDF',
            input: 'file',
            inputAttributes: {
              'accept': 'application/pdf',
              'aria-label': 'Debe subir la covocataria en tipo PDF'
            },
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value === null) {
                  resolve('Es necesario que seleccione el PDF')
                } else {
                  getBase64(value).then(
                    data => {
                      this.anexo6.documento=data+''
                      this.anexo6Service.saveAnexo6(this.anexo6).subscribe(datos=>{
                        Swal.fire({
                          icon: 'success',
                          title: 'PLAN GUARDADO',
                          text: 'Datos guadados correctamente',
                          confirmButtonColor: "#0c3255"   
                        }) 
                      },err=>{
                        Swal.fire({
                          icon: 'warning',
                          title: 'Al paracer hubo un problema',
                          text: err.error.message,
                          confirmButtonColor: "#0c3255"   
                        }) 
                      })
                    }
                  );
                   
                }
              })
            }
          })
      
      }
    })

  }


  generate(anexo6: Anexo6) {

    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo6.docx',
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
            nombre_proyecto:anexo6.nombreProyecto,
            docente_apoyo:anexo6.nombreDocenteApoyo,
            entidad_beneficiaria:anexo6.nombreEntidad,
            estudiante:anexo6.nombreEstudiante ,
            periodo_academico:anexo6.periodoAcademico,
            ciclo:anexo6.ciclo,
            act:anexo6.actividades,
            director_proyeto:anexo6.nombreCoordinadorVinculacion,
            fecha:anexo6.fecha,
            horaTotal:anexo6.totalHoras
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
        saveAs(out, 'Convocataria para Vinculacion.docx');
      }
    );
  }

}