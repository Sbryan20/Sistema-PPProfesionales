import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo10Service } from '@data/services/api/anexo10.service';
import { Anexo10 } from '@shared/models/anexos/anexo10';
import Swal from 'sweetalert2';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { saveAs } from 'file-saver';
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
  selector: 'app-anexo10extendido',
  templateUrl: './anexo10extendido.component.html',
  styleUrls: ['./anexo10extendido.component.scss']
})
export class Anexo10extendidoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private anexo10Service:Anexo10Service) { }

  anexo10:Anexo10[]=[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo10Service.getAnexo10All().subscribe(data=>{
        this.anexo10=data.filter(d=>d.cedulaEstudiante==cedula)
      })
    }) 
  }
  modificar(anexo10:Anexo10){

    this.update(anexo10)  
  }
  async update(anexo10:Anexo10){
    console.log(anexo10)
    const { value: file } = await Swal.fire({
      allowOutsideClick: false,
      title: 'SELECCIONE EL PDF',
      text:'Debe subir la covocataria en tipo PDF',
      input: 'file',
      inputAttributes: {
        'accept': 'application/pdf',
        'aria-label': 'SUBIR PDF FIRMADO'
      },
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === null) {
            resolve('Es necesario que seleccione el PDF')
          } else {
            getBase64(value).then(docx=>{
              anexo10.documento=docx+'';    
              this.anexo10Service.updateAnexo10(anexo10).subscribe(data=>{
                Swal.fire({
                  icon: 'success',
                  title: 'Anexo',
                  text: 'ARCHIVO SUBIDO',
                  confirmButtonColor: "#0c3255"})
              },err=>{
                Swal.fire({
                  icon: 'error',
                  title: 'Anexo',
                  text: 'Hubo un error: '+err.error.message,
                  confirmButtonColor: "#0c3255"})
              })  
            })   
          }
        })
      }
    })

  }


  generate(anexo10: Anexo10) {
    console.log(anexo10)
    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo10.docx',
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
            fecha:anexo10.fecha,
            nombreProyecto:anexo10.nombreProyecto,
            directorProyecto:anexo10.nombreDirector,
            nombreEmpresa:anexo10.nombreEmpresa,
            ubicacionEmpresa:anexo10.nombreEstudiante,
            nomDocenteApoyo:anexo10.nombreDocenteapoyo,
            cedulaDocA:anexo10.cedulaDocenteApoyo,
            EmailDocenteApoyo:anexo10.correo_DocenteApoyo,
            nombreEstudiante:anexo10.nombreEstudiante,
            cedulaEstudiante:anexo10.cedulaEstudiante,
            ultimoCicloAprobado:anexo10.cicloAprovado,
            emailEstudiante:anexo10.correoEstudiante,
            nombreResponsableEntidadBeneficiaria:anexo10.nombreAdministrador,
            cedulaResponsableEntidadBeneficiaria:anexo10.cedulaAdministrador,
            EmailResponsableEntidadBeneficiaria:anexo10.correoAdministrador,
            horasRealizadas:anexo10.horasRealizadas,
            fechaInicio:anexo10.fechaFin,
            fechaFinalizacion:anexo10.fechaInicio,
            descripcionEmpresa:anexo10.descripcionEmpresa,
            recomendaciones:anexo10.recomendaciones,
            conclusiones:anexo10.conclusiones,
            tb:anexo10.actividadesAnexo10s

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
