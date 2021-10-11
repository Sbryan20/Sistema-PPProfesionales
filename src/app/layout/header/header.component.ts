import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Personas } from '@shared/models/persona';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() showMenu= new EventEmitter<any>();
  public faBars=faBars;
  public logo='assets/images/logo.png'
  public persona:Personas=new Personas();

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.persona=JSON.parse(sessionStorage.user);
    sessionStorage.clear;
  }

  logout():void{
    console.log("rr")
    this.router.navigate(['/auth/login']);   
  }

}
