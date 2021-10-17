import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Proyectos } from '@shared/models/proyecto';

@Component({
  selector: 'app-proyectolistar',
  templateUrl: './proyectolistar.component.html',
  styleUrls: ['./proyectolistar.component.scss']
})
export class ProyectolistarComponent implements OnInit {
//Filtrar
public displayedColumns = ['id', 'codigo', 'nombre', 'carrera','fechaat','actividadeslistProyectos','requisitoslistProyectos'];
public dataSource
public listaproyctos: Proyectos[]=[];
applyFilter(filterValue: string) {
   filterValue = filterValue.trim(); // Remove whitespace
   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   this.dataSource.filter = filterValue;
 }
  constructor(private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe(data=>{
      this.listaproyctos=data;
      this.dataSource=new MatTableDataSource(this.listaproyctos); 
    })
    
  }

}
