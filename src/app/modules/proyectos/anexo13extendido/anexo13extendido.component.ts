import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo13Service } from '@data/services/api/anexo13.service';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo13 } from '@shared/models/anexos/anexo13';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { saveAs } from 'file-saver';
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
  selector: 'app-anexo13extendido',
  templateUrl: './anexo13extendido.component.html',
  styleUrls: ['./anexo13extendido.component.scss']
})
export class Anexo13extendidoComponent implements OnInit {
  anexo13:Anexo13[]=[]

  constructor(private anexo13Service:Anexo13Service,private anexo2Service:Anexo2Service,private anexo8Service:Anexo8Service,private anexo1Service:Anexo1Service, private proyectoService:ProyectoService,private anexo3Service:Anexo3Service,private activatedRoute: ActivatedRoute,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo1Service.getbyCedula(cedula).subscribe(datos=>{ 
        this.anexo13Service.getanexo12by(Number(datos[0].idProyectoPPP)).subscribe(da=>{
          this.anexo13=da;
        })
      })
    })
  }

  modificar(anexo13:Anexo13){

    this.update(anexo13)  
  }
  async update(anexo13:Anexo13){
    console.log(anexo13)
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
              anexo13.documento=docx+'';    
              this.anexo13Service.updateAnexo13(anexo13).subscribe(data=>{
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

}
