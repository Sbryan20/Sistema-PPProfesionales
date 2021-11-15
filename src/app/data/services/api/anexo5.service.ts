import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo5 } from '@shared/models/anexos/anexo5';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Anexo5Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo5';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveAnexo5(anexo5: Anexo5):Observable<Anexo5>{
    console.log(anexo5);
    return this.http.post<Anexo5>(this.urlEndPoint,anexo5,{headers: this.httpHeaders})
  }
}