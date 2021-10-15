import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Proyectos } from '@shared/models/proyecto';

@Component({
  selector: 'app-proyectoatvrqs',
  templateUrl: './proyectoatvrqs.component.html',
  styleUrls: ['./proyectoatvrqs.component.scss']
})
export class ProyectoatvrqsComponent implements OnInit {
  public listproyecto:Proyectos[]=[];

  //ArrayAntividades
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;
  
  constructor(private fb: FormBuilder,private proyectoService:ProyectoService) {
    //ArrayActividades
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe(data =>{
      this.listproyecto=data;
    })

    //ArrayActividades
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
  }

  //ArrayActividades
  onAddRow(cedual:String) {
    this.rows.push(this.createItemFormGroup(cedual));
    console.log(cedual)
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(cedual:String): FormGroup {
    return this.fb.group({
      descripciones:null
    });
  }

  selectProyecto(event: any) {
  }

}
