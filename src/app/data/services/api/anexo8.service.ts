import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo6 } from '@shared/models/anexos/anexo6';
import { Anexo8 } from '@shared/models/anexos/anexo8';
import { Ientity } from '@shared/models/entidad';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo8Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo8';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveAnexo8(anexo8: Anexo8):Observable<Anexo8>{
    console.log(anexo8);
    return this.http.post<Anexo8>(this.urlEndPoint,anexo8,{headers: this.httpHeaders})
  }
  getEntidadById(id?:Number):Observable<Ientity>{
    return this.http.get("http://localhost:8080/api/entidad/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Ientity))
  }


}
