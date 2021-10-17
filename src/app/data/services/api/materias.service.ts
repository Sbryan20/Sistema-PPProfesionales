import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materias } from '@shared/models/materias';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private urlEndPoint:string='http://localhost:8080/api/materias';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})
 

  constructor(private http:HttpClient) { }


  getProtectid(codigo:String):Observable<Materias[]>{
    return this.http.get(this.urlEndPoint+"/"+codigo,{headers: this.httpHeaders}).pipe(map(Response => Response as Materias[]))

  }

  
}
