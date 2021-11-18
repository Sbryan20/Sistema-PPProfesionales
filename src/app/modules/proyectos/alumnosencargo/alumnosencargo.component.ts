import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo5Service } from '@data/services/api/anexo5.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Anexo5 } from '@shared/models/anexos/anexo5';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-alumnosencargo',
  templateUrl: './alumnosencargo.component.html',
  styleUrls: ['./alumnosencargo.component.scss']
})
export class AlumnosencargoComponent implements OnInit {
  public anexo5:Anexo5[]=[];
  file;

  constructor(private activatedRoute: ActivatedRoute,private anexo5Service:Anexo5Service,private sysdateService:SysdateService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      console.log(cedula)
      this.anexo5Service.getanexo5bycedula(cedula).subscribe(data=>{
        this.anexo5=data
        console.log(data)
       
      })
    })
  }
  async update(anexo5:Anexo5){
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
              anexo5.documento=docx+''
              this.sysdateService.getSysdate().subscribe(dta=>anexo5.fechaRecepcion=dta.fecha)         
              this.anexo5Service.updateAnexo5(anexo5).subscribe(data=>{
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


