import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo5Service } from '@data/services/api/anexo5.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Anexo5 } from '@shared/models/anexos/anexo5';
import { Anexo9 } from '@shared/models/anexos/anexo9.';
import { Ientity } from '@shared/models/entidad';
import { Proyectos } from '@shared/models/proyecto';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';
import { Anexo9Service } from '@data/services/api/anexo9.service';

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
  selector: 'app-anexo9',
  templateUrl: './anexo9.component.html',
  styleUrls: ['./anexo9.component.scss']
})
export class Anexo9Component implements OnInit {
  public anexo5:Anexo5[]=[];
  public ista='assets/images/ISTA.png'
  public proyectoselact:Proyectos = new Proyectos;
  public anexo5response:Anexo5=new Anexo5;
  public edntidad:Ientity=new Ientity;
  ////ARRAY
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;
  constructor(private anexo9Service:Anexo9Service,private anexo8Service:Anexo8Service,private fb: FormBuilder,private activatedRoute: ActivatedRoute,private anexo5Service:Anexo5Service,private proyectoService:ProyectoService) { 
     //Array
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo5Service.getanexo5bycedula(cedula).subscribe(data=>{
        this.anexo5=data;
      })
      
    }) 
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows) 
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
    numero:null,
    actividadesPlanificacion:null,
    estudianteResponsable:null,
    fechaPlanificacion:null,
    finalizacion:null,

    Finalizada:null,
    Porcentajeavance:null
  });
}

  selectProyecto(event:any){
    this.anexo5Service.getanexo5byid(event.target.value).subscribe(datos=>{
      this.anexo5response=datos
      this.proyectoService.getProtectid(Number(datos.idProyectoPPP)).subscribe(data=>{
        this.proyectoselact=data;
        this.anexo8Service.getEntidadById(data.entidadbeneficiaria).subscribe(da=>{
          this.edntidad=da;
        })
      })
    })
    
  }

  selectmes(event:any){
    this.anexo9.mesPlanificaccion=event.target.value;
  }

  anexo9:Anexo9 = new Anexo9;
  obtnerdatos():Anexo9{
    this.anexo9.actividadesAnexo9=this.rows.getRawValue();
    this.anexo9.entidadBeneficiaria=this.edntidad.nombre;
    this.anexo9.idProyecto=this.anexo5response.idProyectoPPP;
    this.anexo9.nombreApoyo=this.anexo5response.nombreDocenteReceptor;
    this.anexo9.nombreDirector=this.proyectoselact.nombredirector;
    this.anexo9.nombreProyecto=this.proyectoselact.nombre;

    return this.anexo9;
  }

  guardar(){
    console.log(this.obtnerdatos())
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
        this.generate(this.anexo9);
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
                      this.anexo9.documento=data+''
                      this.anexo9Service.saveAnexo9(this.anexo9).subscribe(datos=>{
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




  generate(anexo9: Anexo9) {

    loadFile(
      'https://download1521.mediafire.com/0ncixrb2l7yg/h8vdyoccijwghs5/anexo9.docx',
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
            nombre_proyecto:anexo9.nombreProyecto,
            entidad_beneficiaria:anexo9.entidadBeneficiaria,
            mes_planificacion:anexo9.mesPlanificaccion,
            fecha_seguimiento:anexo9.fechaSeguimeinto,
            docente_apoyo:anexo9.nombreApoyo,
            director_apoyo:anexo9.nombreDirector             
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
