import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Ientity } from '@shared/models/entidad';
import { Proyectos } from '@shared/models/proyecto';
import { Anexo2 } from '@shared/models/anexos/anexo2';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Anexo13 } from '@shared/models/anexos/anexo13';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';
import { Anexo13Service } from '@data/services/api/anexo13.service';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};

@Component({
  selector: 'app-anexo13',
  templateUrl: './anexo13.component.html',
  styleUrls: ['./anexo13.component.scss']
})
export class Anexo13Component implements OnInit {

  public anexo3:Anexo3[]=[];
  public anexo1:Anexo1=new Anexo1;
  public anexo2:Anexo2 = new Anexo2;
  public proyecto:Proyectos=new Proyectos;
  public edntidad:Ientity=new Ientity;
  
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;

  addForm1: FormGroup;
  rows1: FormArray;
  itemForm1?: FormGroup;


  constructor(private anexo13Service:Anexo13Service,private anexo2Service:Anexo2Service,private anexo8Service:Anexo8Service,private anexo1Service:Anexo1Service, private proyectoService:ProyectoService,private anexo3Service:Anexo3Service,private activatedRoute: ActivatedRoute,private fb: FormBuilder) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);

    this.addForm1 = this.fb.group({
      items1: [null, Validators.required],
      items_value1: ['no', Validators.required]
    });
    this.rows1 = this.fb.array([]);
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo1Service.getbyCedula(cedula).subscribe(datos=>{ 
        this.anexo1=datos[0]
        this.proyectoService.getProtectid(Number(datos[0].idProyectoPPP)).subscribe(data=>{
          this.proyecto=data
          this.anexo3Service.getanexo3by(data.id).subscribe(dates=>{
            this.anexo3=dates.filter(d=>d.estado=="AN")
          })
          this.anexo2Service.getAnexoM(data.id).subscribe(datos=>{
            this.anexo2=datos;
          })
          this.anexo8Service.getEntidadById(data.entidadbeneficiaria).subscribe(da=>{
            this.edntidad=da;
          })
          
        })
      })
    })


    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);


    this.addForm1.get("items_value")?.setValue("yes");
    this.addForm1.addControl('rows', this.rows1);
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
      asunto:null,
      actividades:null,
      observaciones:null,
      horaInicio:null,
      horaFin:null,
      fecha:null,
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
      cedula:null,
      nombre:null
    });
  }

  anexo13:Anexo13= new Anexo13;
  obtnenardatos():Anexo13{
    this.anexo13.cedulaDirectorDocenteApoyo=this.anexo1.cedulaDelegado;
    this.anexo13.nombreDirectorDocenteApoyo=this.anexo1.nombreDelegado;
    this.anexo13.empresa=this.edntidad.nombre;
    this.anexo13.ciclo=this.anexo2.ciclo;
    this.anexo13.proyectoId=this.proyecto.id;
    this.anexo13.representanteLegal=this.edntidad.representante;
    this.anexo13.estudiantesVisitas=this.rows1.getRawValue()
    this.anexo13.informes=this.rows.getRawValue()
    return this.anexo13;
  }

  guardar(){
    console.log(this.obtnenardatos())
    Swal.fire({
      title: 'Esta seguro',
      text: "Para ello debe firmar el siguiente anexo con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ANEXO 3!',
          'Se le descargará un archivo WORD, y deberá subirlo en formato pdf',
          'success'
        )
        this.generate(this.obtnenardatos(),this.proyecto);
        this.anexo13Service.saveAnexo13(this.obtnenardatos()).subscribe(datos=>{
          Swal.fire({
            icon: 'success',
            title: 'PLAN GUARDADO',
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
    })
  }



  generate(anexo13: Anexo13,proyecto:Proyectos) {

    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo13.docx',
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
            direc_docenProyecto:anexo13.nombreDirectorDocenteApoyo,
            nombreProyecto:proyecto.nombre,
            representanteEntidad:anexo13.representanteLegal,
            peridoAcademico:anexo13.periodoAcademicon,
            entidadBeneficiaria:anexo13.empresa,
            ciclo:anexo13.ciclo,
            estudiante:anexo13.estudiantesVisitas,
            registro:anexo13.informes,
            observacionGeneral:anexo13.observaciones  
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
        saveAs(out, 'Convocataria para Vinculacion.docx');
      }
    );
  }

}
