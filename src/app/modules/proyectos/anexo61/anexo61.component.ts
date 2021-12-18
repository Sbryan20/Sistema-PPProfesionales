import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo6Service } from '@data/services/api/anexo6.service';
import { ActividadesAnexo6Request, Anexo6 } from '@shared/models/anexos/anexo6';
import { Anexo6_1 } from '@shared/models/anexos/anexo6_1';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';
import { Anexo61Service } from '@data/services/api/anexo6-1.service';

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
  selector: 'app-anexo61',
  templateUrl: './anexo61.component.html',
  styleUrls: ['./anexo61.component.scss']
})
export class Anexo61Component implements OnInit,AfterViewInit {

  loader='assets/images/progress.gif'
  issloading=true;

  public anexo6:Anexo6[]=[]
  public anexo6es:Anexo6 = new Anexo6;
  nombre?:String;
   //ArrayAntividades
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;

  constructor(private fb: FormBuilder,private anexo6Service:Anexo6Service,private activatedRoute: ActivatedRoute,private anexo3Service:Anexo3Service,private anexo61Service:Anexo61Service) {
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
      let nombre = params['nombrescompletos']
      this.nombre=nombre;
      console.log(cedula)
    })
    this.anexo6Service.getanexo6all().subscribe(data=>{
      this.anexo6=data
      this.issloading=false; 
    })

    //ArrayActividades
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
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
      actividadesEstudiante:null,
      controlEstudiante:null,
      desempenoEstudiante:null,
      asignaturasBase:null
    });
  }

  selectProyecto(event: any) {
    this.anexo6Service.getanexo6byid(event.target.value).subscribe(data=>{
     this.anexo6es=data
     console.log(this.anexo6es)
    })
  }

  anexo61:Anexo6_1=new Anexo6_1;
  obtnerdatos():Anexo6_1{
    this.anexo61.idProyecto=this.anexo6es.proyectoId;
    this.anexo61.nombreApoyo=this.nombre;
    this.anexo61.actividades=this.rows.getRawValue();
    this.anexo3Service.getDocentedirector(this.anexo6es.proyectoId).subscribe(d=>{
      this.anexo61.nombreDirector=d.nombre+" "+d.apellidos
      this.anexo61.cedulaDirector=d.cedula;
    })
    return this.anexo61;
  }


  guardar(){
    console.log(this.obtnerdatos())
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
  
          this.generate(this.obtnerdatos())
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
                  getBase64(value).then(docx=>{
                    this.anexo61.documento=docx+''
                    this.anexo61Service.saveAnexo6_1(this.obtnerdatos()).subscribe(data=>{
                      Swal.fire({
                        icon: 'success',
                        title: 'Anexo',
                        text: 'Postulacion relizada espera una respuesta',
                        confirmButtonColor: "#0c3255"})
                        window.location.reload();  
                    },err=>{
                      Swal.fire({
                        icon: 'error',
                        title: 'Anexo',
                        text: 'Hubo un error: '+err.error.message,
                        confirmButtonColor: "#0c3255"})
                    })
                    window.location.reload();  
                  })  
                }
              })
            }
          })
      
      }
    })
  }



  //Docs
 generate(anexo6_1: Anexo6_1) {

  loadFile(
    'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo6%20.1.docx',
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
          tb:anexo6_1.actividades,
          docente_apoyo:anexo6_1.nombreApoyo,
          director_proyeto:anexo6_1.nombreDirector
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
