import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarreasAlum } from '@shared/models/dto/correraAlum';
import { Sysdate } from '@shared/models/sysdate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SysdateService {

  private urlEndPoint:string='http://localhost:8080/api/fecha';
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage.user).token})

  constructor(private http:HttpClient) {}
  
  getSysdate():Observable<Sysdate>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(
      data => data as Sysdate
    )); 
  }

  getCarrera(cedula:String):Observable<CarreasAlum>{
    return this.http.get("http://localhost:8080/api/auth/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as CarreasAlum))
   }
}




