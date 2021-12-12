import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnosolicitudes',
  templateUrl: './alumnosolicitudes.component.html',
  styleUrls: ['./alumnosolicitudes.component.scss']
})
export class AlumnosolicitudesComponent implements OnInit,AfterViewInit {

  loader='assets/images/progress.gif'
  issloading=true;
  
  public anexo3:Anexo3[]=[];
  file;
  constructor(private activatedRoute: ActivatedRoute,private anexo3service:Anexo3Service) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo3service.getanexo3(cedula).subscribe(data=>{
        this.anexo3=data;
        console.log(this.anexo3)
        this.issloading=false; 
      })     
    })
  }

  continuarposltulacion(){

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


