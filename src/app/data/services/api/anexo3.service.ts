import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { AlumnoDatos } from '@shared/models/dto/alumnodatos';
import { DirectorNombre } from '@shared/models/dto/directorNombres';
import { NombreResponsable } from '@shared/models/dto/nombreresponsables';
import { Resposable } from '@shared/models/dto/responsables';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Anexo3Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo3';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) { }

  saveanexo3(anexo3:Anexo3):Observable<Anexo3>{
    console.log(anexo3)
    return this.http.post<Anexo3>(this.urlEndPoint,anexo3,{headers:this.httpHeaders})
  }

  updatinanexo3(anexo3:Anexo3):Observable<Anexo3>{
    console.log(anexo3)
    return this.http.put<Anexo3>(this.urlEndPoint,anexo3,{headers:this.httpHeaders})
  }

  getanexo3(cedula:String):Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByCedula/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }
  getallanexo3():Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByCedula/"+"0150099026",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }

  getanexo3by(proyecto?:Number):Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+proyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }
  getanexo3byCodigo(codigoProyecto?:String):Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByCodigoCarrera/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }

  getdatosalumno(cedula:String):Observable<AlumnoDatos>{
    return this.http.get(this.urlEndPoint+"/datosAlumno/"+cedula,{headers:this.httpHeaders}).pipe(map(Response=>Response as AlumnoDatos))
  }

  getDocentedirector(codigoProyecto?:Number):Observable<DirectorNombre>{
    return this.http.get("http://localhost:8080/api/docentes/director/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as DirectorNombre))

  }

  getReprecentanteproyect(codigoProyecto?:Number):Observable<NombreResponsable>{
    return this.http.get("http://localhost:8080/api/entidad/entidadR/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as NombreResponsable))

  }


  getDocenteTitulo(codigoCarrera?:String):Observable<Resposable>{
    return this.http.get("http://localhost:8080/api/docentes/responsable/"+codigoCarrera,{headers: this.httpHeaders}).pipe(map(Response => Response as Resposable))

  }
  
}
