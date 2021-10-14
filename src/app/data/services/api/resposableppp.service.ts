import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResposablepppService {

  private urlEndPoint:string='http://localhost:8080/api/docentes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saverppp(responsableppp:ResponsablePPP):Observable<ResponsablePPP>{
    return this.http.post<ResponsablePPP>(this.urlEndPoint+"/save/responsable",responsableppp,{headers: this.httpHeaders})
  }
}
