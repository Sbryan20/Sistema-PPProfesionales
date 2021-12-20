import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo5Service } from '@data/services/api/anexo5.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { Anexo9Service } from '@data/services/api/anexo9.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo9 } from '@shared/models/anexos/anexo9.';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';



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
  selector: 'app-anexo9firma',
  templateUrl: './anexo9firma.component.html',
  styleUrls: ['./anexo9firma.component.scss']
})
export class Anexo9firmaComponent implements OnInit {

  anexo9:Anexo9 []=[];

  loader='assets/images/progress.gif'
  empty='assets/images/siresultado.gif'
  issloading=true;

  file

  constructor(private anexo9Service:Anexo9Service,private anexo8Service:Anexo8Service,private fb: FormBuilder,private activatedRoute: ActivatedRoute,private anexo5Service:Anexo5Service,private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo9Service.getAll().subscribe(data=>{
        this.anexo9=data.filter(d=>d.nombreDirector==cedula)
        console.log( this.anexo9)
        this.issloading=false; 
      })
      
    }) 
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }


  async update(anexo9:Anexo9){
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
              anexo9.documento=docx+'';
              this.anexo9Service.updateAnexo9(anexo9).subscribe(data=>{
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
    try {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
      
    } catch (error) {
      let arr = dataurl,
        mime = arr,
        bstr = atob(arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
      
    }

}
