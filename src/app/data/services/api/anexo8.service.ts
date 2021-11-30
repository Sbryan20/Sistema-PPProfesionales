import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo6 } from '@shared/models/anexos/anexo6';
import { ActividadesAnexo8Request, Anexo8 } from '@shared/models/anexos/anexo8';
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
  updateActivadades(anexo8: Anexo8):Observable<Anexo8>{
    console.log(anexo8);
    return this.http.put<Anexo8>(this.urlEndPoint,anexo8,{headers: this.httpHeaders})
  }
  deteledActivadades(idAnexo?: Number,idactividad?:Number){
    return this.http.delete<Anexo8>(this.urlEndPoint+'/'+idAnexo+"/actividad/"+idactividad,{headers: this.httpHeaders})
  }
  getEntidadById(id?:Number):Observable<Ientity>{
    return this.http.get("http://localhost:8080/api/entidad/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Ientity))
  }
  getAnexo8byCedula(cedula:String):Observable<Anexo8[]>{
    return this.http.get(this.urlEndPoint+"/alumno/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8[]))
  }


}
