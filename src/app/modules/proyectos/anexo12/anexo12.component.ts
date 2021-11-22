import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysdateService } from '@data/services/api/sysdate.service';
@Component({
  selector: 'app-anexo12',
  templateUrl: './anexo12.component.html',
  styleUrls: ['./anexo12.component.scss']
})
export class Anexo12Component implements OnInit {


  public ista='assets/images/ISTA.png'
public fech;
  ////ARRAY
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;
  constructor(private fb: FormBuilder,private sysdateService:SysdateService) { 
     //Array
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {  
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);

    this.sysdateService.getSysdate().subscribe(data => {
      this.fech = data.fecha})
}

onAddRow() {
  this.rows.push(this.createItemFormGroup());
  console.log(this.rows.getRawValue())
}
onRemoveRow(rowIndex:number){
  this.rows.removeAt(rowIndex);
}
createItemFormGroup(): FormGroup {
  return this.fb.group({
    ActividadesGenerales:null,
    ActividadesEspecificas:null,
    ProductoGenerado:null, 
  });
}

}