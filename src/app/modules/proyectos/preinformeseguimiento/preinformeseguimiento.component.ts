import { Component, OnInit } from '@angular/core';
import { Proyectos } from '@shared/models/proyecto';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreinformeService } from '@data/services/api/preinforme.service';
import { ActivatedRoute } from '@angular/router';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { PreInforme } from '@shared/models/informes/preinforme'; 
import Swal from 'sweetalert2';
import { SysdateService } from '@data/services/api/sysdate.service';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';


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
  selector: 'app-preinformeseguimiento',
  templateUrl: './preinformeseguimiento.component.html',
  styleUrls: ['./preinformeseguimiento.component.scss']
})
export class PreinformeseguimientoComponent implements OnInit {
  public proyecto:Proyectos=new Proyectos;
  public anexo1:Anexo1=new Anexo1;
  public anexo1response:Anexo1[]=[];
  public anexo3:Anexo3[]=[];
  public fechaElaborado;
  public fechaRevisado;

  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup; 


  constructor(private sysdateService:SysdateService, private preinformeService:PreinformeService  ,private anexo1Service:Anexo1Service, 
    private proyectoService:ProyectoService,private anexo3Service:Anexo3Service,private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
      
      this.addForm = this.fb.group({
        items: [null, Validators.required],
        items_value: ['no', Validators.required]
      });
      this.rows = this.fb.array([]); 
    }

  ngOnInit(): void { 
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows); 

    this.activatedRoute.params.subscribe( params => {
     let cedula = params['cedula']
     this.anexo1Service.getbyCedula(cedula).subscribe(data=>{
       this.anexo1=data[0]
       this.proyectoService.getProtectid(Number(data[0].idProyectoPPP)).subscribe(datos=>{
         this.proyecto=datos
         this.anexo3Service.getanexo3by(datos.id).subscribe(datos3=>{
        
           this.anexo3=datos3.filter(d=>d.estado=="AN")

           console.log(this.anexo3)
           datos3.filter(d=>d.estado=="AN").forEach(element => {
             this.onAddRow(element)
       
           }); 
         }) 
       })
     })
   }) 
    this.sysdateService.getSysdate().subscribe(data => {
      this.fechaElaborado = data.fecha})
  }

   onAddRow(anexo3:Anexo3) {
    this.rows.push(this.createItemFormGroup(anexo3));
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex)
  }
  createItemFormGroup(anexo3:Anexo3): FormGroup {
    return this.fb.group({
      id:null, 
      cedula:anexo3?.cedula,
      nombreEstudiante:anexo3?.nombresestudiante+" "+anexo3?.apellidosestudiante,
      estado:anexo3?.estado,
      observaciones:null
    });
  } 

  preinforme:PreInforme = new PreInforme;
  obtnerdatos():PreInforme{   
    
    this.preinforme.fechaElaborado=this.fechaElaborado; 
    this.preinforme.fechaRevisado=this.fechaRevisado;
    this.preinforme.idProyectoPPP=this.proyecto.id;
    this.preinforme.estudianteInformeInicial=this.rows.getRawValue();  
    this.preinforme.nombreRevisado=this.anexo1.nombreCoordinador
    this.preinforme.nombreElaborado=this.anexo1.nombreDelegado
    return this.preinforme;
  }
  guardarinforme(){
    Swal.fire({
      title: 'Esta seguro que generar el informe inicial ',
      text: "Para ello debe firmar el siguiente documento con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, generar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.preinformeService.savePreInforme(this.obtnerdatos()).subscribe(datos=>{
          Swal.fire({
            icon: 'success',
            title: 'INFORME GENERADO',
            text: 'Datos guadados correctamente',
            confirmButtonColor: "#0c3255"   
          }) 
          this.preinformeService.getpreinformeById(this.obtnerdatos().idProyectoPPP).subscribe(async dates=>{
            Swal.fire(
              'informe inicial!',
              'Se le descargará un archivo WORD, y deberá subirlo en formato pdf',
              'success'
            )
            this.generate(dates);
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
                          dates.documento=data+''
                          this.preinformeService.updatepreinforme(dates).subscribe(datos=>{
                            Swal.fire({
                              icon: 'success',
                              title: 'GUARDADO',
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
          },err=>{
            Swal.fire({
              icon: 'warning',
              title: 'Al paracer hubo un problema',
              text: err.error.message,
              confirmButtonColor: "#0c3255"   
            }) 
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
    })
  }

  generate(preinforme: PreInforme) {
    console.log(preinforme)
    loadFile( 
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/preinformes.docx' ,
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
          doc.render({
            nombrecarrera:preinforme.nombreCarrera,
            nombreProyecto:preinforme.nombreProyecto,
            nombreDirector:preinforme.nombreDirector, 
            //
            //
            //

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
        saveAs(out, 'informe inicial.docx');
      }
    );
  }


  
}
