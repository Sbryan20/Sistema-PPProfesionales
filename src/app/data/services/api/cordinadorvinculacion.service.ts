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
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

 getCvinculacion():Observable<CordinadorVinculacion[]>{
  return this.http.get(this.urlEndPoint+"/all/docentes").pipe(map(
    data => data as CordinadorVinculacion[]
  )); }

  getCvinculacionExist():Observable<CordinadorVinculacion[]>{
    return this.http.get(this.urlEndPoint+"/all").pipe(map(
      data => data as CordinadorVinculacion[]
    )); }

  saveCv(cordinadorVinculacion: CordinadorVinculacion):Observable<CordinadorVinculacion>{
    console.log(cordinadorVinculacion);
    return this.http.post<CordinadorVinculacion>(this.urlEndPoint+"/save",cordinadorVinculacion,{headers: this.httpHeaders})
  }
  updateCv(cordinadorVinculacion: CordinadorVinculacion):Observable<CordinadorVinculacion>{
    console.log(cordinadorVinculacion);
    return this.http.put<CordinadorVinculacion>(this.urlEndPoint+"/update",cordinadorVinculacion,{headers: this.httpHeaders})
  }
}
