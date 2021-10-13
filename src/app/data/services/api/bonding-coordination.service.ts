import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ientity } from '../../../shared/models/entidad';

@Injectable({
  providedIn: 'root'
})
export class BondingCoordinationService {

  nombre?:String;
  private urlEndPoint:string='http://localhost:8080/api/entidad';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  postCreate(entidad:Ientity):Observable<Ientity>{
    return this.http.post<Ientity>(this.urlEndPoint,entidad)
  }
  putUdate(entidad:Ientity){
    return this.http.put<Ientity>(this.urlEndPoint,entidad)
  }

  getEntity():Observable<Ientity[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(
      data => data as Ientity[]
    ));
  }

  getEntidadNombre(nombre?:String){
    return this.http.get<Ientity>(this.urlEndPoint+"/all/"+nombre,{headers: this.httpHeaders}).pipe(map(data=>data as Ientity[]))
  }

}
