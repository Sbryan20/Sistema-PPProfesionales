import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo13Service } from '@data/services/api/anexo13.service';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { Anexo9Service } from '@data/services/api/anexo9.service';
import { Informe1Service } from '@data/services/api/informe1.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Informe1 } from '@shared/models/informes/informe1';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import PizZipUtils from 'pizzip/utils/index.js';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};

@Component({
  selector: 'app-infomesegimientofirma',
  templateUrl: './infomesegimientofirma.component.html',
  styleUrls: ['./infomesegimientofirma.component.scss']
})
export class InfomesegimientofirmaComponent implements OnInit {

  constructor(private informe1Service:Informe1Service,private anexo9Service:Anexo9Service,private anexo13Service:Anexo13Service,private anexo2Service:Anexo2Service,private anexo8Service:Anexo8Service,private anexo1Service:Anexo1Service, private proyectoService:ProyectoService,private anexo3Service:Anexo3Service,private activatedRoute: ActivatedRoute,private fb: FormBuilder) { }


  loader='assets/images/progress.gif'
  empty='assets/images/siresultado.gif'
  issloading=true;

  public informe1:Informe1[]=[]
  file;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.informe1Service.getAll().subscribe(data=>{
        this.informe1=data.filter(d=>d.cedulaCoordinadorVinculacion==cedula)
        console.log(this.informe1)
        this.issloading=false;  
      })
    })
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }
  async update(informe1:Informe1){
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
              informe1.documento=docx+'';
              this.informe1Service.updateAnexoInforme1(informe1).subscribe(data=>{
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



  
     //convert a pdf
     convertFile(docum) {
      console.log(docum)
      //Usage example:
      var file = this.dataURLtoFile(docum, 'Convocatoria.pdf');
      console.log(file);
      this.file = file;
      saveAs(file, 'Convocatoria.pdf');
    }
  dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }


}
