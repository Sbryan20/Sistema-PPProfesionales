import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo12 } from '@shared/models/anexos/anexo12';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo12Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo12';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveAnexo12(anexo12: Anexo12):Observable<Anexo12>{
    console.log(anexo12.cedulaApoyo);
    return this.http.post<Anexo12>(this.urlEndPoint,anexo12,{headers: this.httpHeaders})
  }
  
  updateAnexo12(anexo12: Anexo12):Observable<Anexo12>{
    console.log(anexo12);
    return this.http.put<Anexo12>(this.urlEndPoint,anexo12,{headers: this.httpHeaders})
  }
  getanexo12by(cedula:String):Observable<Anexo12[]>{
    return this.http.get(this.urlEndPoint+"/allApoyo/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo12[]))
  }
}
