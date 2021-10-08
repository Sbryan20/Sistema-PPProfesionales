import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ILeftNavMenu } from '../../data/interfaces/ileft-nav-menu.metadata';
import { LEFT_NAV_MENUS } from '../../data/constants/letf-nav-menu.const';
import { Personas } from '../../shared/models/persona';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  public persona:Personas=new Personas();
 
  public faBars=faBars;
  public logo='assets/images/logo.png'  
  foto=sessionStorage.getItem('photo')

  public menus:ILeftNavMenu[]=LEFT_NAV_MENUS;
  constructor() { }

  ngOnInit(): void {
    this.persona.urlFoto=sessionStorage.getItem('photo')+"";
    this.persona.rol=sessionStorage.getItem('rol')+"";
  }

}
