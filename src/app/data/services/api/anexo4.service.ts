import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo4 } from '@shared/models/anexos/anexo4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo4Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo4';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveanexo3(anexo4:Anexo4):Observable<Anexo4>{
    console.log(anexo4)
    return this.http.post<Anexo4>(this.urlEndPoint,anexo4,{headers:this.httpHeaders})
  }
  updateanexo4(anexo4:Anexo4):Observable<Anexo4>{
    console.log(anexo4)
    return this.http.put<Anexo4>(this.urlEndPoint,anexo4,{headers:this.httpHeaders})
  }

  getanexo4bycedula(cedula?:String):Observable<Anexo4[]>{
    return this.http.get(this.urlEndPoint+"/allByCedulaAnexo4/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo4[]))
  }
}
