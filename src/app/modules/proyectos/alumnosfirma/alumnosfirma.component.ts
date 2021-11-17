import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo4Service } from '@data/services/api/anexo4.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Anexo4 } from '@shared/models/anexos/anexo4';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnosfirma',
  templateUrl: './alumnosfirma.component.html',
  styleUrls: ['./alumnosfirma.component.scss']
})
export class AlumnosfirmaComponent implements OnInit {
  public anexo4:Anexo4[]=[];
  file;
  constructor(private activatedRoute: ActivatedRoute,private anexo4Service:Anexo4Service,private sysdateService:SysdateService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      console.log(cedula)
      this.anexo4Service.getanexo4bycedula(cedula).subscribe(data=>{
        this.anexo4=data;
      })
    })
  }
  async update(anexo4:Anexo4){
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
              anexo4.documento=reader.result+''};
              this.sysdateService.getSysdate().subscribe(dta=>anexo4.fechaRecepcionEst=dta.fecha)
              
              this.anexo4Service.updateanexo4(anexo4).subscribe(data=>{
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
