import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo61Service } from '@data/services/api/anexo6-1.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Anexo6_1 } from '@shared/models/anexos/anexo6_1';
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
  selector: 'app-segumientoparcialfirma',
  templateUrl: './segumientoparcialfirma.component.html',
  styleUrls: ['./segumientoparcialfirma.component.scss']
})
export class SegumientoparcialfirmaComponent implements OnInit,AfterViewInit {

  loader='assets/images/progress.gif'
  issloading=true;

  public anexo61:Anexo6_1[]=[]
  file;
  constructor(private activatedRoute: ActivatedRoute,private anexo61Service:Anexo61Service,private sysdateService:SysdateService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo61Service.getanexo6bycedula(cedula).subscribe(data=>{
        this.anexo61=data;
        console.log(this.anexo61)
        this.issloading=false; 
      })
    })
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }
  async update(anexo61:Anexo6_1){
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
              anexo61.documento=docx+'';
              this.sysdateService.getSysdate().subscribe(d=>{
                anexo61.fechaApoyo=d.fecha;
                anexo61.fechaDirector=d.fecha;
              })
              
              this.anexo61Service.updateAnexo6_1(anexo61).subscribe(data=>{
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
