import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CordinadorVinculacion } from '@shared/models/cordinadorvinculacion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CordinadorvinculacionService {

  private urlEndPoint:string='http://localhost:8080/api/vinculacion';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) {
    console.log(JSON.parse(sessionStorage.user).token)
  }

 getCvinculacion():Observable<CordinadorVinculacion[]>{
  return this.http.get(this.urlEndPoint+"/all/docentes",{headers: this.httpHeaders}).pipe(map(
    data => data as CordinadorVinculacion[]
  )); }

  getCvinculacionExist():Observable<CordinadorVinculacion[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(
      data => data as CordinadorVinculacion[]
    )); 
  }

  getCvnexiste(cedula:String):Observable<CordinadorVinculacion>{
    return this.http.get(this.urlEndPoint+"/exists/"+cedula,{headers: this.httpHeaders})
  }

  getall():Observable<CordinadorVinculacion>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders})
  }


  saveCv(cordinadorVinculacion: CordinadorVinculacion):Observable<CordinadorVinculacion>{
    console.log(cordinadorVinculacion);
    return this.http.post<CordinadorVinculacion>(this.urlEndPoint,cordinadorVinculacion,{headers: this.httpHeaders})
  }
  updateCv(cordinadorVinculacion: CordinadorVinculacion):Observable<CordinadorVinculacion>{
    console.log(cordinadorVinculacion);
    return this.http.put<CordinadorVinculacion>(this.urlEndPoint,cordinadorVinculacion,{headers: this.httpHeaders})
  }
}
