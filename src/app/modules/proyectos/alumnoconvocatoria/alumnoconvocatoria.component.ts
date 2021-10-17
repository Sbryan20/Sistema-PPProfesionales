import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { LoginServiceService } from '@data/services/login-service.service';
import { Anexo2 } from '@shared/models/anexos/anexo2';

@Component({
  selector: 'app-alumnoconvocatoria',
  templateUrl: './alumnoconvocatoria.component.html',
  styleUrls: ['./alumnoconvocatoria.component.scss']
})
export class AlumnoconvocatoriaComponent implements OnInit {
  public anexo2:Anexo2[]=[]
  public carrera?:string;

  constructor(private activatedRoute: ActivatedRoute,private anexo2services:Anexo2Service,private loginServiceService:LoginServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.loginServiceService.getCarrera(cedula).subscribe(data=>{
        this.carrera=data.codigoCarrera;
        console.log(this.carrera)
      })
    })
    this.anexo2services.getAnexo2().subscribe(data=>{
      this.anexo2=data;
    })
  }

}
