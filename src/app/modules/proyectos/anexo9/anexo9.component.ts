import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo5Service } from '@data/services/api/anexo5.service';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Anexo5 } from '@shared/models/anexos/anexo5';

@Component({
  selector: 'app-anexo9',
  templateUrl: './anexo9.component.html',
  styleUrls: ['./anexo9.component.scss']
})
export class Anexo9Component implements OnInit {
  public anexo5:Anexo5[]=[];
  public ista='assets/images/ISTA.png'

  ////ARRAY
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;
  constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute,private anexo5Service:Anexo5Service) { 
     //Array
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo5Service.getanexo5bycedula(cedula).subscribe(data=>{
        this.anexo5=data;
      })
      
    }) 
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows) 
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
    numero:null,
    actividadesPlanificacion:null,
    estudianteResponsable:null,
    fechaPlanificacion:null,
    finalizacion:null,

    Finalizada:null,
    Porcentajeavance:null
  });
}

}
