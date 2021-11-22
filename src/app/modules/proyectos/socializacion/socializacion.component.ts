import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo6Service } from '@data/services/api/anexo6.service';
import { Anexo7Service } from '@data/services/api/anexo7.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { Anexo7 } from '@shared/models/anexos/anexo7';

@Component({
  selector: 'app-socializacion',
  templateUrl: './socializacion.component.html',
  styleUrls: ['./socializacion.component.scss']
})
export class SocializacionComponent implements OnInit {

  public anexo7:Anexo7[]=[]

  constructor(private anexo7Service:Anexo7Service,private resposablepppService:ResposablepppService, private anexo1Service:Anexo1Service, private proyectoService:ProyectoService,private fb: FormBuilder,private activatedRoute: ActivatedRoute, private anexo6Service:Anexo6Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo1Service.getbyCedula(cedula).subscribe(datos=>{
        this.anexo7Service.getanexo7(Number(datos[0].idProyectoPPP)).subscribe(data=>{
          this.anexo7=data;
        })
      })
    })
  }

}
