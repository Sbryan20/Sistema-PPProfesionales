import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo12Service } from '@data/services/api/anexo12.service';
import { Anexo12 } from '@shared/models/anexos/anexo12';
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
  selector: 'app-anexo12extendido',
  templateUrl: './anexo12extendido.component.html',
  styleUrls: ['./anexo12extendido.component.scss']
})
export class Anexo12extendidoComponent implements OnInit,AfterViewInit {

  loader='assets/images/progress.gif'
  empty='assets/images/siresultado.gif'

  issloading=true;
  
  public anexo12:Anexo12[]=[];

  constructor(private activatedRoute: ActivatedRoute,private anexo12Service:Anexo12Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo12Service.getanexo12by(cedula).subscribe(date=>{
        this.anexo12=date;
        this.issloading=false; 
      })
      
    }) 
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }
 
  async update(anexo12:Anexo12){
    console.log(anexo12)
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
              anexo12.documento=docx+'';    
              this.anexo12Service.updateAnexo12(anexo12).subscribe(data=>{
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

  generate(anexo12: Anexo12) {
    console.log(anexo12)
    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo12.docx',
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
            nombreproyecto:anexo12.nombreProyecto,
            fecha:anexo12.fechaCapacitacion,
            entidadbeneficiaria:anexo12.entidadBeneficiaria,
            representanteEntidad:anexo12.repreentanteEntidad,
            asunto:anexo12.asuntoCapacitacion,
            numHoras:anexo12.horasCapacitacion,
            repreTelefono:anexo12.telefonoEntidad,
            repreEmail:anexo12.telefonoEntidad,
            nombreAdminEntidadBeneficiaria:anexo12.nombreAdministrador,
            nombreDocenteApoyoRespoActivid:anexo12.nombreApoyo,
            tb:anexo12.actividadesAnexo12


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
