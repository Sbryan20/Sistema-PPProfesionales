import { Pipe, PipeTransform } from '@angular/core';
import { Ientity } from '@shared/models/entidad';


@Pipe({
  name: 'search'
})
export class PipeEntityPipe implements PipeTransform {

  list:Ientity[]=[];

  transform(lista: any[], texto: String): any[] {
    if(!texto)return lista
    return lista.filter(data => this.list=data.nombre.toUpperCase().includes(texto.toUpperCase()))
  }
}
