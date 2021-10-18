import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarreasAlum } from '@shared/models/dto/correraAlum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Personas } from '../../shared/models/persona';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private urlEndPoint:string='http://localhost:8080/api/auth';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  postLogin(userRequest: Personas):Observable<Personas>{
     return this.http.post<Personas>(this.urlEndPoint+"/login",userRequest)
  }
  postSignup(userRequest: Personas):Observable<Personas>{
    return this.http.post<Personas>(this.urlEndPoint+"/signup",userRequest)
 }

 getCarrera(cedula:String):Observable<CarreasAlum>{
  return this.http.get(this.urlEndPoint+"/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as CarreasAlum))
 }

 
}
