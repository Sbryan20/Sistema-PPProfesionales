import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo5 } from '@shared/models/anexos/anexo5';
import { Anexo6 } from '@shared/models/anexos/anexo6';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo6Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo6';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }



  saveAnexo5(anexo6: Anexo6):Observable<Anexo5>{
    console.log(anexo6);
    return this.http.post<Anexo5>(this.urlEndPoint,anexo6,{headers: this.httpHeaders})
  }

  getanexo6all():Observable<Anexo6[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6[]))
  }
}


