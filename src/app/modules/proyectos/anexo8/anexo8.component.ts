import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Anexo6 } from '@shared/models/anexos/anexo6';
import { ActividadesAnexo8Request, Anexo8 } from '@shared/models/anexos/anexo8';
import { Ientity } from '@shared/models/entidad';
import { Proyectos } from '@shared/models/proyecto';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';

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
  selector: 'app-anexo8',
  templateUrl: './anexo8.component.html',
  styleUrls: ['./anexo8.component.scss']
})
export class Anexo8Component implements OnInit {
  public ista='assets/images/ISTA.png'
  public sum=0;
  public actualzar=false
  public cedula;
  public nombre;
  public anexo3:Anexo3[]=[];
  public anexo8requeste:Anexo8=new Anexo8;
  public proyecto:Proyectos=new Proyectos;
  public edntidad:Ientity=new Ientity;
  binding;

  ////ARRAY
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;

  constructor(private anexo8Service:Anexo8Service,private activatedRoute: ActivatedRoute,private fb: FormBuilder,private anexo3Service:Anexo3Service, private proyectoService:ProyectoService) {
     //ArrayActividades
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre=nombre;
      this.cedula=cedula;
     
      this.anexo3Service.getanexo3(cedula).subscribe(datos=>{
        this.anexo3=datos.filter(d=>d.estado=="AN")
      })
      
    })
      //ArrayActividades
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
  }

  //ArrayActividades
onAddRow(actividades:ActividadesAnexo8Request) {
  this.sum = 0;
  this.rows.push(this.createItemFormGroup(actividades));
  this.rows.getRawValue().forEach(element => {
    this.sum+=element.numHoras;
    console.log(this.sum)
  })
  console.log(this.rows.getRawValue())
}
onRemoveRow(rowIndex:number){
  this.rows.removeAt(rowIndex)
  this.sum = 0;
  this.rows.getRawValue().forEach(element => {
    this.sum+=element.numHoras;
    console.log(this.sum)
  })
}

eliminarActividad(actividades:ActividadesAnexo8Request){
  console.log(this.anexo8requeste.id,actividades.id)
  this.anexo8Service.deteledActivadades(this.anexo8requeste.id,actividades.id).subscribe(data=>{
    Swal.fire({
      icon: 'success',
      title: 'PLAN GUARDADO',
      text: 'Eliminado guadados correctamente',
      confirmButtonColor: "#0c3255"   
    })
    this.actulizar(); 
  },err=>{
    Swal.fire({
      icon: 'warning',
      title: 'Al paracer hubo un problema',
      text: err.error.message,
      confirmButtonColor: "#0c3255"   
    }) 
  })
}

createItemFormGroup(actividades:ActividadesAnexo8Request): FormGroup {
  return this.fb.group({
    id:actividades?.id,
    fecha:actividades?.fecha,
    descripcionActividad:actividades?.descripcionActividad,
    lugar:actividades?.lugar,
    numHoras:actividades?.numHoras,
  });
}
sumar(){
  this.sum = 0;
  this.rows.getRawValue().forEach(element => {
    this.sum+=element.numHoras;
    console.log(this.sum)
    console.log(this.proyecto)
  })
}


selectOpcion(event:any){
  this.proyectoService.getProtectid(event.target.value).subscribe(data=>{
    this.proyecto=data
    this.anexo8Service.getEntidadById(data.entidadbeneficiaria).subscribe(da=>{
      this.edntidad=da;
    })
      
  })
  this.anexo8Service.getAnexo8byCedula(this.cedula).subscribe(datos=>{
    if(datos.length!=0){
      this.anexo8requeste=datos[0]
      if(datos[0].actividades?.length!=0){
        this.actualzar=true;
        
        datos[0].actividades?.forEach(element => {
          this.onAddRow(element)
        });
      }
      console.log(this.actualzar)
    }
  })
  
}
anexo8:Anexo8= new Anexo8;
ontnerDatos():Anexo8{
  this.anexo8.cedulaEstudiante=this.cedula;
  this.anexo8.idProyectoPPP=this.proyecto.id;
  this.anexo8.nombreDirectorProyecto=this.proyecto.nombredirector;
  this.anexo8.nombreDocenteApoyo=""
  this.anexo8.nombreEntidadBeneficiaria=this.edntidad.nombre;
  this.anexo8.nombreEstudiante=this.nombre;
  this.anexo8.nombreProyecto=this.proyecto.nombre;
  this.anexo8.totalHoras=this.sum;
  this.anexo8.actividades=this.rows.getRawValue();
  this.anexo8.nombreAdminEB=this.edntidad.representante;
  return this.anexo8;
}
  guardar(){
    console.log(this.ontnerDatos())
    Swal.fire({
      title: 'Esta seguro',
      text: "Para ello debe firmar el siguiente anexo con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ANEXO 8!',
          'Se le descargará un archivo WORD, y deberá subirlo en formato pdf',
          'success'
        )
        this.generate(this.ontnerDatos());
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
                      this.anexo8.documento=data+''
                      this.anexo8Service.saveAnexo8(this.ontnerDatos()).subscribe(datos=>{
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


  actulizar(){
    console.log(this.ontnerDatos())
    Swal.fire({
      title: 'Esta seguro',
      text: "Para ello debe firmar el siguiente anexo con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ANEXO 3!',
          'Se le descargará un archivo WORD, y deberá subirlo en formato pdf',
          'success'
        )
        this.generate(this.ontnerDatos());
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
                      this.anexo8.id=this.anexo8requeste.id
                      this.anexo8.documento=data+''
                      this.anexo8Service.updateActivadades(this.ontnerDatos()).subscribe(datos=>{
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





  generate(anexo8: Anexo8) {

    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo8.docx',
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
            nombre_proyecto:anexo8.nombreProyecto,
            entidad_beneficiaria:anexo8.nombreEntidadBeneficiaria,
            nombre_estudiante:anexo8.nombreEstudiante,
            identificiacion_est:anexo8.cedulaEstudiante,
            nombre_admin_entidad:anexo8.nombreAdminEB,
            docente_apoyo:anexo8.nombreDocenteApoyo,
            nombre_director:anexo8.nombreDirectorProyecto,
            tb:anexo8.actividades,
            totalHoras:anexo8.totalHoras
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
