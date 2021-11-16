import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MateriasService } from '@data/services/api/materias.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Materias } from '@shared/models/materias';
import { Proyectos } from '@shared/models/proyecto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectoatvrqs',
  templateUrl: './proyectoatvrqs.component.html',
  styleUrls: ['./proyectoatvrqs.component.scss']
})
export class ProyectoatvrqsComponent implements OnInit {
  public listproyecto:Proyectos[]=[];
  public materias:Materias[]=[]
  public proyectos:Proyectos= new Proyectos();
  public number?

  //ArrayAntividades
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;

  //Array de Rquesitos
  addFormR: FormGroup;
  rowsR: FormArray;
  itemFormR?: FormGroup;
  
  constructor(private fb: FormBuilder,private fbR: FormBuilder,private proyectoService:ProyectoService, private materiasService:MateriasService) {
    //ArrayActividades
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);

     //Array de Rquesitos
    this.addFormR = this.fbR.group({
      itemsR: [null, Validators.required],
      items_valueR: ['no', Validators.required]
    });
    this.rowsR = this.fbR.array([]);
  }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe(data =>{
      this.listproyecto=data;
    })
    //ArrayActividades
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);

    //Array de Rquesitos
    this.addFormR.get("items_valueR")?.setValue("yes");
    this.addFormR.addControl('rowsR', this.rowsR);
  }

  //ArrayActividades
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      descripcion:null
    });
  }
 //Array de Rquesitos
  onAddRowR(decrop:String) {
    this.rowsR.push(this.createItemFormGroupR(decrop));
    console.log()
  }
  onRemoveRowR(rowIndex:number){
    this.rowsR.removeAt(rowIndex);
  }
  createItemFormGroupR(decrop:String): FormGroup {
    return this.fbR.group({
      descripcion:decrop
    });
  }

  selectProyecto(event: any) {
    this.proyectoService.getProtectid(event.target.value).subscribe(data=>{
      this.number=data.id
      this.materiasService.getProtectid(data.codigocarrera+'').subscribe(date=>{
        this.materias=date;
        this.dataSource=new MatTableDataSource(this.materias); 
      })
    })
  }
  //UPDATE
  update(){
    this.proyectos.id=this.number;
    this.proyectos.requisitoslistProyectos=this.rowsR.getRawValue()
    this.proyectos.actividadeslistProyectos=this.rows.getRawValue()

    this.proyectoService.updatePr(this.proyectos).subscribe(datos=>{
      Swal.fire({
        icon: 'success',
        title: 'ACTUVIDADES & REQUISITOS',
        text: 'Datos guadados correctamente',
        confirmButtonColor: "#0c3255"   
      }) 
    },err=>{
      Swal.fire({
        icon: 'warning',
        title: 'Al paracer hubo un problema',
        text: err.error.message,
        confirmButtonColor: "#0c3255"   
      }) 
    })

  }
  //table
  public displayedColumns = ['id', 'codigo', 'nombre','boton'];
  public dataSource

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
