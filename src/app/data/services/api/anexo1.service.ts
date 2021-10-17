import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Anexo1Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo1';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }



  saveanexo1(anexo1: Anexo1):Observable<Anexo1>{
    console.log(anexo1);
    return this.http.post<Anexo1>(this.urlEndPoint,anexo1,{headers: this.httpHeaders})
  }
}
