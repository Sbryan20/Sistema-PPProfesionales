import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo9 } from '@shared/models/anexos/anexo9.';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo9Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo9';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }


  saveAnexo9(anexo9: Anexo9):Observable<Anexo9>{
    console.log(anexo9);
    return this.http.post<Anexo9>(this.urlEndPoint,anexo9,{headers: this.httpHeaders})
  }


  updateAnexo9(anexo9: Anexo9):Observable<Anexo9>{
    console.log(anexo9);
    return this.http.put<Anexo9>(this.urlEndPoint,anexo9,{headers: this.httpHeaders})
  }
  getAnexo9ById(proyectoId?:Number):Observable<Anexo9>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+proyectoId,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo9))
  }

  getAll():Observable<Anexo9[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo9[]))
  }
}
