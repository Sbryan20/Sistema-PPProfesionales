import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from '@data/services/api/carrera.service';
import { CordinadorvinculacionService } from '@data/services/api/cordinadorvinculacion.service';
import { Carreras } from '@shared/models/carrera';
import { CordinadorVinculacion } from '@shared/models/cordinadorvinculacion';
import { Ientity } from '@shared/models/entidad';
import { Proyectos } from '@shared/models/proyecto';
import { BondingCoordinationService } from '../../../data/services/api/bonding-coordination.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-proyectocreate',
  templateUrl: './proyectocreate.component.html',
  styleUrls: ['./proyectocreate.component.scss']
})
export class ProyectocreateComponent implements OnInit {
  public ista='assets/images/ISTA.png'
  public secretaria='assets/images/Secretaria.png'  
  listacvinculacion: CordinadorVinculacion[]=[];
  proyectos:Proyectos = new Proyectos();
  entity:Ientity[]=[];
  listacarrera:Carreras[]=[];
  
  //Director
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;
  ////
  //Docente
  addFormd: FormGroup;
  rowsd: FormArray;
  itemFormd?: FormGroup;
  ////

  constructor(private fb: FormBuilder,private cvservice:CordinadorvinculacionService,private BondingCoordinationService:BondingCoordinationService,private router:Router,private carreraService:CarreraService) { 
    this.cvservice.getCvinculacion().subscribe(data=>{
      this.listacvinculacion=data
      console.log(data)
    })  

    //Director
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
    ////
    //Docente
    this.addFormd = this.fb.group({
      itemsD: [null, Validators.required],
      items_valueD: ['no', Validators.required]
    });
    this.rowsd = this.fb.array([]);
    ////
  }

  ngOnInit(): void {
    this.BondingCoordinationService.getEntity().subscribe(data=>this.entity=data)
    this.carreraService.getCarreras().subscribe(data=>this.listacarrera=data)

    //DIRECTOR
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
    ////

    //DIRECTOR
    this.addFormd.get("items_valued")?.setValue("yes");
    this.addFormd.addControl('rowsd', this.rowsd);
    ////

  }

  //DIRECTOR
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      description: null,
    });
  }
  ////
   //DOCENTE
   onAddRowd() {
    this.rowsd.push(this.createItemFormGroupd());
  }

  onRemoveRowd(rowIndex:number){
    this.rowsd.removeAt(rowIndex);
  }

  createItemFormGroupd(): FormGroup {
    return this.fb.group({
      description: null,
    });
  }
  ////
  crearEntidad(){

    
  }
  titulo?:string;
 



  ///
  selectResponsablePPP (event: any) {
    
  }
  selectDirectorProyecto (event: any) {
    this.proyectos.directorProyecto=event.target.value;
  }
  selectDocenteApoyo (event: any) {
    this.proyectos.responsablePPP= event.target.value;
  }
  selectEntidadBeneficaria(event: any) {
    this.proyectos.entidadbeneficiaria= event.target.value;
  }
  selectCarreta(event: any) {
    this.proyectos.codigocarrera= event.target.value;
  }
  selectEstado(event: any) {
    this.proyectos.estado= event.target.value;
  }
  selectLineaAccion(event: any) {
    this.proyectos.lineaaccion= event.target.value;
  }









  dfgfd?:string;


  ////Impresion del Convocatoria

  generate(fecha:string,titulo:string,last_name:string,carrerad:string,rol:string,atanta:string) {

    loadFile(
      
      'https://docxtemplater.com/docs/simple.docx',
      function (error, content) {
        
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render({
            // titulo: 'Doctor en medicina',
            // fecha: '11/10/2021',
            // nombreResponsable: 'Edisson',
            // siglascarrera: 'DAm',
            // nombreEstudiante: 'Bryan',
            // cedula: '0150919751',
            // nombrecarrera: 'desarrollo',
            // paralelo: 'm4b',
            // nombreproyecto: 'sistemappp'
            fecha:"",
            titulo: "",
            last_name: "Tenemea",
            carrerad: "09999999999",
            rol: "Alumno de ista",
            atanta: ""

          });
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));
        }
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        // Output the document using Data-URI
        saveAs(out, 'Solicitud.docx');
      }
    );
  }

}
