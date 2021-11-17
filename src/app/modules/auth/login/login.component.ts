import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../../../data/services/login-service.service';
import { Personas } from '../../../shared/models/persona';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit{
  public fondo='assets/images/fondo.png';
  public logog='assets/images/logog.png'
  loader='assets/images/loader.gif'
  issloading=true;


  
  public userRequest: Personas = new Personas();
  status: number = 0;
  habilitar: boolean = true;
  
  nombre!: String;
  foto!: String;

  //dato para roles y su ventana 


  socialUser!: SocialUser;
  userLogged!: SocialUser;
  @Input() islogged!: boolean


  constructor(private authService: SocialAuthService,private router: Router, private loginServiceService: LoginServiceService,private title: Title) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
    this.issloading=false;
    },1000)
  }

  ngOnInit(): void {
    this.title.setTitle('Ingreso');
    this.authService.authState.subscribe(data =>{
      this.userLogged=data;
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
            sessionStorage.clear;
            if(data.rol=="DOC"){
              Swal.fire({
                icon: 'info',
                title: 'Sin asigacion',
                text: data.nombrescompletos+", no forma parte de algun proceso de vinculación",
                confirmButtonColor: "#0c3255"   
              })

            }else{
              sessionStorage.setItem('user', JSON.stringify(data));
              console.log(data)
              this.router.navigate(['/panel/user']);
            }
            
               
          },
          err =>{
            console.log(err.error.mensaje);
            if(err.error.mensaje=="No existe"){
              this.setHabilitar(false);
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
            sessionStorage.clear;
            if(data.rol=="DOC"){
              Swal.fire({
                icon: 'info',
                title: 'Sin asigacion',
                text: data.nombrescompletos+", no forma parte de algun proceso de vinculación",
                confirmButtonColor: "#0c3255"   
              })
            }else{
              sessionStorage.setItem('user', JSON.stringify(data));
              this.router.navigate(['/panel/user']);
            }   
      },
      err=>{
        Swal.fire({
          icon: 'warning',
          title: 'Acceso Denegado',
          text: err.error.message,
          confirmButtonColor: "#0c3255"   
        })
      }
    )
  }
  setHabilitar(habilitar:boolean):void{
    this.habilitar=(this.habilitar==true)? false: true;
  }
}
