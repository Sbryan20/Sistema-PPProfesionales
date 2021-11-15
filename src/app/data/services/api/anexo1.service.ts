import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getanexo1by(proyecto?:Number):Observable<Anexo1[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+proyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo1[]))
  }

  getbyCarrera(codigocarrera?:String):Observable<Anexo1[]>{
    return this.http.get(this.urlEndPoint+"/allByCarrera/"+codigocarrera,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo1[]))
  }
  getbyCedula(cedula?:String):Observable<Anexo1[]>{
    return this.http.get(this.urlEndPoint+"/allByCedula/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo1[]))
  }
}
