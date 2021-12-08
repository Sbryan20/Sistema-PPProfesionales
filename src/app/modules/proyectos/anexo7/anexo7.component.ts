import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo6 } from '@shared/models/anexos/anexo6';
import { Anexo6Service } from '@data/services/api/anexo6.service';
import { Anexo6_1 } from '@shared/models/anexos/anexo6_1';
import Docxtemplater from 'docxtemplater';
import Swal from 'sweetalert2';
import { Proyectos } from '@shared/models/proyecto';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { Ientity } from '@shared/models/entidad';
import { Anexo7 } from '@shared/models/anexos/anexo7';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import * as PizZip from 'pizzip';
import { Anexo7Service } from '@data/services/api/anexo7.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Anexo1 } from '@shared/models/anexos/anexo1';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};
@Component({
  selector: 'app-anexo7',
  templateUrl: './anexo7.component.html',
  styleUrls: ['./anexo7.component.scss']
})
export class Anexo7Component implements OnInit {
  public anexo6:Anexo6[]=[]
  public anexo6es:Anexo6 = new Anexo6;
  public edntidad:Ientity=new Ientity;
  public resposanle:ResponsablePPP[]=[]
  public proyecto:Proyectos=new Proyectos;
  public anexo3:Anexo3[]=[];
  public anexo1:Anexo1[]=[];  
   //ArrayAntividades
   addForm: FormGroup;
   rows: FormArray;
   itemForm?: FormGroup;

   addForm1: FormGroup;
   rows1: FormArray;
   itemForm1?: FormGroup;

  constructor(private anexo3Service:Anexo3Service,private anexo7Service:Anexo7Service,private anexo8Service:Anexo8Service,private resposablepppService:ResposablepppService, private anexo1Service:Anexo1Service, private proyectoService:ProyectoService,private fb: FormBuilder,private activatedRoute: ActivatedRoute, private anexo6Service:Anexo6Service) {
     //ArrayActividades
     this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);



    this.addForm1 = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows1 = this.fb.array([]);


   }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      console.log(cedula)
      let nombre = params['nombrescompletos']
      this.anexo1Service.getbyCedula(cedula).subscribe(datos=>{
        this.proyectoService.getProtectid(Number(datos[0].idProyectoPPP)).subscribe(data=>{
          this.proyecto=data;
          this.anexo3Service.getanexo3by(data.id).subscribe(dates=>{
            this.anexo3=dates
          })
          this.anexo1Service.getanexo1by(data.id).subscribe(datosap=>{
            this.anexo1=datosap.filter(d=>d.nombreRol=="apoyo")
          })
          this.anexo8Service.getEntidadById(data.entidadbeneficiaria).subscribe(da=>{
            this.edntidad=da;
          })
          console.log(this.proyecto)
        })
      })
    })
    this.anexo6Service.getanexo6all().subscribe(data=>this.anexo6=data)
    //ArrayActividades
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);

    this.addForm1.get("items_value")?.setValue("yes");
    this.addForm1.addControl('rows1', this.rows1);
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
      resultados:null,
      actividad:null,
      nombreDocenteApoyo:null,
      cedulaDocente:null,
      numHoras:null,
      fechaInicio:null,
      fechaFin:null,
      observaciones:null
    });
  }

  onAddRow1() {
    this.rows1.push(this.createItemFormGroup1());
    console.log(this.rows1.getRawValue())
  }
  onRemoveRow1(rowIndex:number){
    this.rows1.removeAt(rowIndex);
  }

  createItemFormGroup1(): FormGroup {
    return this.fb.group({
      resultados:null,
      actividad:null,
      nombreEstudiante:null,
      cedulaEstudiante:null,
      numHoras:null,
      fechaInicio:null,
      fechaFin:null,
      observaciones:null
    });
  }



  
  anexo7:Anexo7=new Anexo7;
  obtnerdatos():Anexo7{
    this.anexo7.nombreDirectorProyecto=this.proyecto.nombredirector;
    this.anexo7.nombreEntidadBeneficiaria=this.edntidad.nombre;
    this.anexo7.idProyecto=this.proyecto.id;
    this.anexo7.horasDocentes=this.rows.getRawValue();
    this.anexo7.horasEstudiantes=this.rows1.getRawValue();
    return this.anexo7;
  }

  
  guardar(){
    console.log(this.obtnerdatos())
    Swal.fire({
      title: 'Esta seguro ',
      text: "Para ello debe firmar el siguiente anexo con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ANEXO 7!',
          'Se le descargará un archivo WORD, y no se olvide de subir el archivo un ves firmado',
          'success'
        )
        this.generate(this.obtnerdatos(),this.proyecto)
        this.anexo7Service.saveAnexo7(this.obtnerdatos()).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Anexo',
            text: 'Se le descargará un archivo WORD, y no se olvide de subir el archivo un ves firmado',
            confirmButtonColor: "#0c3255"})
        },err=>{
          Swal.fire({
            icon: 'error',
            title: 'Anexo',
            text: 'Hubo un error: '+err.error.message,
            confirmButtonColor: "#0c3255"})
        })
      }
    })
  }


 
  //Docs
 generate(anexo7: Anexo7,proyecto:Proyectos) {

  loadFile(
    'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo7.docx',
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
          nombre_proyecto:proyecto.nombre,
          entidad_beneficiaria:anexo7.nombreEntidadBeneficiaria,
          fecha_realizacion:anexo7.fechaPlanificacion,
          nombre_director:anexo7.nombreDirectorProyecto,
          mes_anio:anexo7.mesAnioPlanificado,
          tb:anexo7.horasDocentes,
          tb2:anexo7.horasEstudiantes,
          es:anexo7.horasEstudiantes   

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
      saveAs(out, 'Convocataria Anexo7.docx');
    }
  );
}

}
