import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anexo6Service } from '@data/services/api/anexo6.service';
import { Anexo6 } from '@shared/models/anexos/anexo6';

@Component({
  selector: 'app-anexo61',
  templateUrl: './anexo61.component.html',
  styleUrls: ['./anexo61.component.scss']
})
export class Anexo61Component implements OnInit {
  public anexo6:Anexo6[]=[]
   //ArrayAntividades
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;

  constructor(private fb: FormBuilder,private anexo6Service:Anexo6Service) {
     //ArrayActividades
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
   }

  ngOnInit(): void {
    this.anexo6Service.getanexo6all().subscribe(data=>this.anexo6=data)

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
      actividadesEstudiante:null,
      controlEstudiante:null,
      desempenoEstudiante:null,
      asignaturasBase:null
    });
  }

  selectProyecto(event: any) {
    console.log(event.target.value)
  }

}
