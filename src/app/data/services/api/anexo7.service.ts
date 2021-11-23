import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo7 } from '@shared/models/anexos/anexo7';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo7Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo7';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveAnexo7(anexo7: Anexo7):Observable<Anexo7>{
    console.log(anexo7);
    return this.http.post<Anexo7>(this.urlEndPoint,anexo7,{headers: this.httpHeaders})
  }
  updateAnexo7(anexo7: Anexo7):Observable<Anexo7>{
    console.log(anexo7);
    return this.http.put<Anexo7>(this.urlEndPoint,anexo7,{headers: this.httpHeaders})
  }
  getanexo7(idProyecto:Number):Observable<Anexo7[]>{
    return this.http.get(this.urlEndPoint+"/proyecto/"+idProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7[]))
  }
}
