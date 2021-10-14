import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignacionRol, Docentes, Extra } from '@shared/models/docentesfull';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocentesfullService {

  private urlEndPoint:string='http://localhost:8080/api/docentes/all';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private htpp:HttpClient) {}
  
  cargardocente():Observable<Docentes[]>{
    return this.htpp.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Docentes[]))
    
  }

  asignacionrol(asignacion:AsignacionRol):Observable<AsignacionRol>{
    console.log(asignacion);
    return this.htpp.post<AsignacionRol>(this.urlEndPoint,asignacion,{headers: this.httpHeaders})
  }
}
