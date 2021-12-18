import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreinformeService } from '@data/services/api/preinforme.service';
import { PreInforme } from '@shared/models/informes/preinforme';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

//DOCX
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};

@Component({
  selector: 'app-preinformefirma',
  templateUrl: './preinformefirma.component.html',
  styleUrls: ['./preinformefirma.component.scss']
})
export class PreinformefirmaComponent implements OnInit {

  loader='assets/images/progress.gif'
  empty='assets/images/siresultado.gif'
  issloading=true;
  file;

  preInforme:PreInforme []= []

  constructor(private preinformeService:PreinformeService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.preinformeService.getAll().subscribe(data=>{
        this.preInforme=data.filter(d=>d.nombreRevisado==cedula);
        console.log(this.preInforme)
        this.issloading=false;  
      })
    })

  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }

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

  async update(preInforme:PreInforme){
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
              preInforme.documento=docx+'';
              this.preinformeService.updatepreinforme(preInforme).subscribe(data=>{
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
