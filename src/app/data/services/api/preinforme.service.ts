import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { PreInforme } from '@shared/models/informes/preinforme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreinformeService {

  private urlEndPoint:string='http://localhost:8080/api/informeInicial';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) {
    console.log(JSON.parse(sessionStorage.user).token)
  }
  savePreInforme(preinforme: PreInforme):Observable<PreInforme>{
    console.log(preinforme);
    return this.http.post<PreInforme>(this.urlEndPoint,preinforme,{headers: this.httpHeaders})
  } 
}

 