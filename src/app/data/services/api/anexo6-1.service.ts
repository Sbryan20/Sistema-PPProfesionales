import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo6_1 } from '@shared/models/anexos/anexo6_1';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo61Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo6_1';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveAnexo6_1(anexo6_1: Anexo6_1):Observable<Anexo6_1>{
    console.log(anexo6_1);
    return this.http.post<Anexo6_1>(this.urlEndPoint,anexo6_1,{headers: this.httpHeaders})
  }

  updateAnexo6_1(anexo6_1: Anexo6_1):Observable<Anexo6_1>{
    console.log(anexo6_1);
    return this.http.put<Anexo6_1>(this.urlEndPoint,anexo6_1,{headers: this.httpHeaders})
  }
  getanexo6bycedula(cedula:String):Observable<Anexo6_1[]>{
    return this.http.get(this.urlEndPoint+"/allAnexos/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6_1[]))
    
  }

}
