import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informe1 } from '@shared/models/informes/informe1';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Informe1Service {

  private urlEndPoint:string='http://localhost:8080/api/informeSeguimiento';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) {
    console.log(JSON.parse(sessionStorage.user).token)
  }
  saveAnexoInforme1(informe1: Informe1):Observable<Informe1>{
    console.log(informe1);
    return this.http.post<Informe1>(this.urlEndPoint,informe1,{headers: this.httpHeaders})
  }
  updateAnexoInforme1(informe1: Informe1):Observable<Informe1>{
    console.log(informe1);
    return this.http.put<Informe1>(this.urlEndPoint,informe1,{headers: this.httpHeaders})
  }
  getoInforme1ById(proyectoId?:Number):Observable<Informe1>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+proyectoId,{headers: this.httpHeaders}).pipe(map(Response => Response as Informe1))
  }

  getAll():Observable<Informe1[]>{
    return this.http.get(this.urlEndPoint+"/all/",{headers: this.httpHeaders}).pipe(map(Response => Response as Informe1[]))
  }
}
