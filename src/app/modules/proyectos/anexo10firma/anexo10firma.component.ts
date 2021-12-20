import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo10Service } from '@data/services/api/anexo10.service';
import { Anexo10 } from '@shared/models/anexos/anexo10';
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
  selector: 'app-anexo10firma',
  templateUrl: './anexo10firma.component.html',
  styleUrls: ['./anexo10firma.component.scss']
})
export class Anexo10firmaComponent implements OnInit {

  loader='assets/images/progress.gif'
  empty='assets/images/siresultado.gif'
  issloading=true;

  file

  anexo10:Anexo10[]=[];

  constructor(private activatedRoute: ActivatedRoute,private anexo10Service:Anexo10Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo10Service.getAnexo10All().subscribe(data=>{
        this.anexo10=data.filter(d=>d.nombreDirector==cedula)
        this.issloading=false; 
      })
    }) 
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }

  async update(anexo10:Anexo10){
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
