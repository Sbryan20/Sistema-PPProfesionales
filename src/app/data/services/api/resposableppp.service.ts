import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docentes } from '@shared/models/docentesfull';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResposablepppService {

  private urlEndPoint:string='http://localhost:8080/api/docentes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  cargardocente():Observable<Docentes[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Docentes[]))
  }

  cargarresponsables():Observable<ResponsablePPP[]>{
    return this.http.get(this.urlEndPoint+"/all/responsable",{headers: this.httpHeaders}).pipe(map(Response => Response as ResponsablePPP[]))
  }

  saverppp(responsableppp:ResponsablePPP):Observable<ResponsablePPP>{
    return this.http.post<ResponsablePPP>(this.urlEndPoint+"/save/responsable",responsableppp,{headers: this.httpHeaders})
  }
}
