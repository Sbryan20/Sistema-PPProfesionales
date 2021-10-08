import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../../../data/services/login-service.service';
import { Personas } from '../../../shared/models/persona';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public fondo='assets/images/fondo.png';
  public logog='assets/images/logog.png'

  
  public userRequest: Personas = new Personas();
  status: number = 0;
  habilitar: boolean = true;
  
  nombre!: String;
  foto!: String;

  //dato para roles y su ventana 


  socialUser!: SocialUser;
  userLogged!: SocialUser;
  @Input() islogged!: boolean


  constructor(private authService: SocialAuthService,private router: Router, private loginServiceService: LoginServiceService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(data =>{
      this.userLogged=data;
      this.islogged=(this.userLogged!=null);
    })
  }
  logOut(): void{
    this.authService.signOut();
    
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => { 
        this.userRequest.email=data.email;
        this.userRequest.urlFoto=data.photoUrl;
        this.userRequest.rol='';
        this.loginServiceService.postLogin(this.userRequest).subscribe(
          data=>{
            console.log(data.urlFoto);
            sessionStorage.clear;
            sessionStorage.setItem("cedula",data.cedula+"");
            sessionStorage.setItem("rol","CV");
            sessionStorage.setItem("nombres",data.nombrescompletos+"");
            sessionStorage.setItem("photo",data.urlFoto+"");
            sessionStorage.setItem("email",data.email+"");
            this.islogged=true;   
            this.router.navigate(['/panel/user']);   
          },
          err =>{
            console.log(err.error.mensaje);
            if(err.error.mensaje=="No existe"){
              this.setHabilitar(false);
              this.islogged=false;
            }
          }
        )
      }
    )
  }
  public create():void{
    console.log(this.userRequest)
    this.loginServiceService.postSignup(this.userRequest).subscribe(
      data => {
            this.router.navigate(['/estructura']);
            sessionStorage.clear;
            sessionStorage.setItem("cedula",data.cedula+"");
            sessionStorage.setItem("rol",data.rol+"");
            sessionStorage.setItem("nombres",data.nombrescompletos+"");
            sessionStorage.setItem("photo",data.urlFoto+"");
            sessionStorage.setItem("email",data.email+"");
            this.islogged=true;
      }
    )
  }
  setHabilitar(habilitar:boolean):void{
    this.habilitar=(this.habilitar==true)? false: true;
  }
  
  getSesion(): boolean{
    return this.islogged;
    
  }

  

}
