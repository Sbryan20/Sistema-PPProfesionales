import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carreras } from '@shared/models/carrera';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private urlEndPoint:string='http://localhost:8080/api/carreras';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})
  
  constructor(private http:HttpClient) { }

  getCarreras():Observable<Carreras[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(
      data => data as Carreras[]
  )); }


  
}
