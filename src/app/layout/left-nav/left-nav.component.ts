import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ILeftNavMenu } from '../../data/interfaces/ileft-nav-menu.metadata';
import { LEFT_NAV_MENUS } from '../../data/constants/letf-nav-menu.const';
import { Personas } from '../../shared/models/persona';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  public persona:Personas=new Personas();
  public rolnombre:string="";
 
  public faBars=faBars;
  public logo='assets/images/logo.png'  
  public foto?:string;

  public menus:ILeftNavMenu[]=LEFT_NAV_MENUS;
  constructor(private title:Title) { }

  ngOnInit(): void {
    this.persona=JSON.parse(sessionStorage.user);
    this.rolnombre=this.geRolName(JSON.parse(sessionStorage.user).rol);
    console.log(JSON.parse(sessionStorage.user).token)
    console.log(JSON.parse(sessionStorage.user).urlFoto)
    if(JSON.parse(sessionStorage.user).urlFoto==""){ 
       
      this.foto='assets/images/pngwing.png'
    }else{
      this.foto=JSON.parse(sessionStorage.user).urlFoto;
    }
    sessionStorage.clear;
    this.title.setTitle('Inicio');
  }

  geRolName(rol:string):string{
    if(rol=="AUT"){
      return "AUTORIDAD";
    }
    if(rol=="CC"){
      return "COORDINADOR/A DE CARRERA";
    }
    if(rol=="CV"){
      return "COORDINADOR/A DE VINCULACIÓN";
    }
    if(rol=="DP"){
      return "DIRECTOR/A DE PROYECTO";
    }
    if(rol=="DA"){
      return "DOCENTE APOYO";
    }
    if(rol=="RPPP"){
      return "RESPONSABLE DE PRÁCTICAS PREPROFESIONALES";
    }
    if(rol=="EST"){
      return "ESTUDIANTE";
    }
    if(rol=="DOC"){
      return "DOCENTE";
    }
    return "Si rol";
  }

}
