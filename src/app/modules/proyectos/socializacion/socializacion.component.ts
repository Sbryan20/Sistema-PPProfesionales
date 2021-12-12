import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo6Service } from '@data/services/api/anexo6.service';
import { Anexo7Service } from '@data/services/api/anexo7.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { Anexo7 } from '@shared/models/anexos/anexo7';
import Swal from 'sweetalert2';
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
  selector: 'app-socializacion',
  templateUrl: './socializacion.component.html',
  styleUrls: ['./socializacion.component.scss']
})
export class SocializacionComponent implements OnInit,AfterViewInit{


  loader='assets/images/progress.gif'
  issloading=true;

  public anexo7:Anexo7[]=[]

  constructor(private anexo7Service:Anexo7Service,private resposablepppService:ResposablepppService, private anexo1Service:Anexo1Service, private proyectoService:ProyectoService,private fb: FormBuilder,private activatedRoute: ActivatedRoute, private anexo6Service:Anexo6Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo1Service.getbyCedula(cedula).subscribe(datos=>{
        this.anexo7Service.getanexo7(Number(datos[0].idProyectoPPP)).subscribe(data=>{
          this.anexo7=data;
          this.issloading=false; 
        })
      })
    })
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }

  async update(anexo7:Anexo7){
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
              docx+'';    
              this.anexo7Service.updateAnexo7(anexo7).subscribe(data=>{
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
