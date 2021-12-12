import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocentesDirector } from '@shared/models/docentesapoyo/docentesdirecto';
import { DocentesRoles } from '@shared/models/docentesapoyo/docentesroles';
import { Docentes } from '@shared/models/docentesfull';
import { CarreasDoc } from '@shared/models/dto/carrerasdo';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResposablepppService {

  private urlEndPoint:string='http://localhost:8080/api/docentes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  cargardocente():Observable<Docentes[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Docentes[]))
  }

  cargarresponsables():Observable<ResponsablePPP[]>{
    return this.http.get(this.urlEndPoint+"/all/responsable",{headers: this.httpHeaders}).pipe(map(Response => Response as ResponsablePPP[]))
  }

  getResposable(codigoppp:String):Observable<Docentes>{
    return this.http.get(this.urlEndPoint+"/responsable/"+codigoppp,{headers: this.httpHeaders}).pipe(map(Response => Response as Docentes))
  }

  saverppp(responsableppp:ResponsablePPP):Observable<ResponsablePPP>{
    return this.http.post<ResponsablePPP>(this.urlEndPoint+"/save/responsable",responsableppp,{headers: this.httpHeaders})
  }
  saverdirector(docentesDirector:DocentesDirector):Observable<DocentesDirector>{
    return this.http.post<DocentesDirector>(this.urlEndPoint+"/save/director",docentesDirector,{headers: this.httpHeaders})
  }
  saverapoyo(docentesRoles:DocentesRoles):Observable<ResponsablePPP>{
    return this.http.post<DocentesRoles>(this.urlEndPoint+"/save/apoyo",docentesRoles,{headers: this.httpHeaders})
  }

  updateppp(responsableppp:ResponsablePPP):Observable<ResponsablePPP>{
    return this.http.put<ResponsablePPP>(this.urlEndPoint+"/update/responsable",responsableppp,{headers: this.httpHeaders})
  }
  getcarrera(cedula:String):Observable<CarreasDoc[]>{
    return this.http.get(this.urlEndPoint+"/carreras/"+cedula,{headers: this.httpHeaders}).pipe(map(
      data => data as CarreasDoc[]
    )); 
  }
  getDocenteId(cedula:String):Observable<Docentes>{
    return this.http.get(this.urlEndPoint+"/"+cedula,{headers: this.httpHeaders}).pipe(map(
      data => data as Docentes
    )); 
  }
  getResponsableId(cedula:String):Observable<CarreasDoc>{
    return this.http.get(this.urlEndPoint+"/responsablePPP/"+cedula,{headers: this.httpHeaders}).pipe(map(
      data => data as CarreasDoc
    )); 
  }
  getbyAll():Observable<ResponsablePPP[]>{
    return this.http.get(this.urlEndPoint+"/all/responsable",{headers: this.httpHeaders}).pipe(map(
      data => data as ResponsablePPP[]
    )); 
  }
}
