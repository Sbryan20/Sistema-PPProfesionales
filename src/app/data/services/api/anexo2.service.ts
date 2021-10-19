import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo2 } from '@shared/models/anexos/anexo2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo2Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo2';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  getAnexo2():Observable<Anexo2[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo2[]))

  }

  saveanexo2(anexo2:Anexo2):Observable<Anexo2>{
    console.log(anexo2)
    return this.http.post<Anexo2>(this.urlEndPoint,anexo2,{headers:this.httpHeaders})
  }

  getAnexoM(id:Number):Observable<Anexo2>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo2))

  }


}
