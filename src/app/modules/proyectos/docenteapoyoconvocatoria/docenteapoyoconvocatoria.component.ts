import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docenteapoyoconvocatoria',
  templateUrl: './docenteapoyoconvocatoria.component.html',
  styleUrls: ['./docenteapoyoconvocatoria.component.scss']
})
export class DocenteapoyoconvocatoriaComponent implements OnInit {
  file;
  public anexo1:Anexo1[]=[];

  constructor(private activatedRoute: ActivatedRoute,private anexo1Service:Anexo1Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      console.log(cedula)
      this.anexo1Service.getbyCedula(cedula).subscribe(data=>{
        this.anexo1=data;
      })
    })
  }

  async update(anexo1:Anexo1){
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
             const file:any = value;
             const reader = new FileReader();
             reader.readAsDataURL(file);
             reader.onload = () => {
              anexo1.documento=reader.result+''};
              this.anexo1Service.updateanexo1(anexo1).subscribe(data=>{
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
    saveAs(file, 'Convocatoria ANEXO1.pdf');
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
