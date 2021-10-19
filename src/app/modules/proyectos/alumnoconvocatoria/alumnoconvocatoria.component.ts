import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { MateriasService } from '@data/services/api/materias.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { LoginServiceService } from '@data/services/login-service.service';
import { Anexo2 } from '@shared/models/anexos/anexo2';
import { Mayeriasalum } from '@shared/models/dto/maeriasalum';
import { Materias } from '@shared/models/materias';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnoconvocatoria',
  templateUrl: './alumnoconvocatoria.component.html',
  styleUrls: ['./alumnoconvocatoria.component.scss']
})
export class AlumnoconvocatoriaComponent implements OnInit {
  public anexo2:Anexo2[]=[]
  public anexo2M:Anexo2=new Anexo2()
  public carrera?:string;
  public maeriaslim:Mayeriasalum= new Mayeriasalum()
  docum?:string
  file;

  constructor(private materiasService:MateriasService,private activatedRoute: ActivatedRoute,private sysdateService:SysdateService,private anexo2services:Anexo2Service,private loginServiceService:LoginServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.sysdateService.getCarrera(cedula).subscribe(data=>{
        this.carrera=data.codigoCarrera;
        console.log(this.carrera)
      })
      this.materiasService.getProtectCedula(cedula).subscribe(data=>{
        this.maeriaslim=data;
        console.log(this.maeriaslim)
      })
      
    })
    this.anexo2services.getAnexo2().subscribe(data=>{
      this.anexo2=data;
    })

   
  }
  materias(id:Number){
    this.anexo2services.getAnexoM(id).subscribe(data=>{
      this.anexo2M=data;
      console.log(this.anexo2M)
    })
    if(this.anexo2M.materias ===  this.maeriaslim.materias){
      Swal.fire({
        icon: 'info',
        title: 'Anexo',
        text: 'No puede aplicar',
        confirmButtonColor: "#0c3255"   
      })
    }else{

      Swal.fire({
        icon: 'info',
        title: 'Anexo',
        text: 'Si puede aplicar',
        confirmButtonColor: "#0c3255"   
      })
    }
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
