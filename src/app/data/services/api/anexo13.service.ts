import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo13 } from '@shared/models/anexos/anexo13';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Anexo13Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo13';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveAnexo13(anexo13: Anexo13):Observable<Anexo13>{
    console.log(anexo13);
    return this.http.post<Anexo13>(this.urlEndPoint,anexo13,{headers: this.httpHeaders})
  }
}
