import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-anexo6',
  templateUrl: './anexo6.component.html',
  styleUrls: ['./anexo6.component.scss']
})
export class Anexo6Component implements OnInit {
  public secretaria='assets/images/Secretaria.png'  
  public ista='assets/images/ISTA.png'

   //ArrayAntividades
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;

  constructor (private fb: FormBuilder) { 
    //ArrayActividades
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
      //ArrayActividades
      this.addForm.get("items_value")?.setValue("yes");
      this.addForm.addControl('rows', this.rows);
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
      actividad:null,
      asignatura:null,
      resultado:null,
      horasAsignadas:null
    });
  }

}
