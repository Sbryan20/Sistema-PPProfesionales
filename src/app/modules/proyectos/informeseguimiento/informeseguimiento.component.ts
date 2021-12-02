import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo13Service } from '@data/services/api/anexo13.service';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo8Service } from '@data/services/api/anexo8.service';
import { Anexo9Service } from '@data/services/api/anexo9.service';
import { Informe1Service } from '@data/services/api/informe1.service';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { ActividadesAnexo9 } from '@shared/models/anexos/anexo9.';
import { Informe1 } from '@shared/models/informes/informe1';
import { Proyectos } from '@shared/models/proyecto';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';


function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};

@Component({
  selector: 'app-informeseguimiento',
  templateUrl: './informeseguimiento.component.html',
  styleUrls: ['./informeseguimiento.component.scss']
})
export class InformeseguimientoComponent implements OnInit {

  public proyecto:Proyectos=new Proyectos;
  public anexo1:Anexo1=new Anexo1;
  public anexo1response:Anexo1[]=[];
  public anexo3:Anexo3[]=[];

  //DOCENTESPARTICIPANTES
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;

  //ALUMNPSPARTICIPANTES
  addForm1: FormGroup;
  rows1: FormArray;
  itemForm1?: FormGroup;

  //ACTIVIDADES
  addForm2: FormGroup;
  rows2: FormArray;
  itemForm2?: FormGroup;

  //OBSERVACIONES
  addForm3: FormGroup;
  rows3: FormArray;
  itemForm3?: FormGroup;
  

  constructor(private informe1Service:Informe1Service,private anexo9Service:Anexo9Service,private anexo13Service:Anexo13Service,private anexo2Service:Anexo2Service,private anexo8Service:Anexo8Service,private anexo1Service:Anexo1Service, private proyectoService:ProyectoService,private anexo3Service:Anexo3Service,private activatedRoute: ActivatedRoute,private fb: FormBuilder) {
    //DOCENTESPARTICIPANTES
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);

    //ALUMNPSPARTICIPANTES
    this.addForm1 = this.fb.group({
      items1: [null, Validators.required],
      items_value1: ['no', Validators.required]
    });
    this.rows1 = this.fb.array([]);

    //ACTIVIDADES
    this.addForm2 = this.fb.group({
    items2: [null, Validators.required],
    items_value2: ['no', Validators.required]
    });
    this.rows2 = this.fb.array([]);

    //OBSERVACIONES
    this.addForm3 = this.fb.group({
      items3: [null, Validators.required],
      items_value3: ['no', Validators.required]
      });
      this.rows3 = this.fb.array([]);
    
   }

  ngOnInit(): void {
     //DOCENTESPARTICIPANTES
     this.addForm.get("items_value")?.setValue("yes");
     this.addForm.addControl('rows', this.rows);
     //ALUMNPSPARTICIPANTES
     this.addForm1.get("items_value")?.setValue("yes");
     this.addForm1.addControl('rows', this.rows1);
     //ACTIVIDADES
     this.addForm2.get("items_value")?.setValue("yes");
     this.addForm2.addControl('rows', this.rows2);
     //OBSERVACIONES
     this.addForm3.get("items_value")?.setValue("yes");
     this.addForm3.addControl('rows', this.rows3)

     this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo1Service.getbyCedula(cedula).subscribe(data=>{
        this.anexo1=data[0]
        this.proyectoService.getProtectid(Number(data[0].idProyectoPPP)).subscribe(datos=>{
          this.proyecto=datos
          this.anexo3Service.getanexo3by(datos.id).subscribe(dates=>{
            this.anexo3=dates.filter(d=>d.estado=="AN")
            console.log(this.anexo3)
            dates.filter(d=>d.estado=="AN").forEach(element => {
              this.onAddRow1(element)
            });
            this.anexo1Service.getanexo1by(datos.id).subscribe(da=>{
              da.forEach(element => {
                this.onAddRow(element)
              });
              
            })
          })
          this.anexo9Service.getAnexo9ById(datos.id).subscribe(daticos=>{
            daticos.actividadesAnexo9?.forEach(element => {
              this.onAddRow2(element)
            });
          })
        })
      })
    })

  }

  //DOCENTESPARTICIPANTES
  onAddRow(anexo1:Anexo1) {
    this.rows.push(this.createItemFormGroup(anexo1));
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex)
  }
  createItemFormGroup(anexo1:Anexo1): FormGroup {
    return this.fb.group({
      id:null,
      cedula:anexo1?.cedulaDelegado,
      nombres:anexo1?.nombreDelegado,
      carrera:anexo1?.nombreCarrera,
      numeroHoras:null
    });
  }

  //ALUMNPSPARTICIPANTES
  onAddRow1(anexo3:Anexo3) {
    this.rows1.push(this.createItemFormGroup1(anexo3));
    console.log(this.rows1.getRawValue())
  }
  onRemoveRow1(rowIndex:number){
    this.rows1.removeAt(rowIndex)
  }
  createItemFormGroup1(anexo3:Anexo3): FormGroup {
    return this.fb.group({
      id:null,
      cedula:anexo3?.cedula,
      nombres:anexo3?.nombresestudiante+" "+anexo3?.apellidosestudiante,
      carrera:anexo3?.nombrecarrera,
      numeroHoras:null
    });
  }
   //ACTIVIDADES
   onAddRow2(actividadesAnexo9:ActividadesAnexo9) {
    this.rows2.push(this.createItemFormGroup2(actividadesAnexo9));
    console.log(this.rows2.getRawValue())
  }
  onRemoveRow2(rowIndex:number){
    this.rows2.removeAt(rowIndex)
  }
  createItemFormGroup2(actividadesAnexo9:ActividadesAnexo9): FormGroup {
    return this.fb.group({
      id:null,
      actividades:actividadesAnexo9?.actividadesPlanificacion,
      porcentajeCumplimiento:actividadesAnexo9?.Porcentajeavance,
      fechaEjecucion:actividadesAnexo9?.fechaPlanificacion,
      responsableEjecucion:actividadesAnexo9?.estudianteResponsable,
      observaciones:null,
    });
  }

  //OBSERVACIONES
  onAddRow3() {
    this.rows3.push(this.createItemFormGroup3());
    console.log(this.rows2.getRawValue())
  }
  onRemoveRow3(rowIndex:number){
    this.rows3.removeAt(rowIndex)
  }
  createItemFormGroup3(): FormGroup {
    return this.fb.group({
      id:null,
      descripcion:null
    });
  }


  informe1:Informe1 = new Informe1;
  obtnerdatos():Informe1{
    this.informe1.idProyectoPPP=this.proyecto.id;
    this.informe1.docentesParticipantes=this.rows.getRawValue();
    this.informe1.estudiantesParticipantes=this.rows1.getRawValue();
    this.informe1.observacionesInformeSeguimiento=this.rows3.getRawValue();
    this.informe1.actividadesInformeSeguimientoRequest=this.rows2.getRawValue()
    return this.informe1;
  }

  save(){
    Swal.fire({
      title: 'Esta seguro que generar informe ',
      text: "Para ello debe firmar el siguiente anexo con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, generar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.informe1Service.saveAnexoInforme1(this.obtnerdatos()).subscribe(datos=>{
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


  generate(informe1: Informe1) {
    console.log(Informe1)
    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/informe1.docx',
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
            nombreProyecto:informe1.nombreProyecto,
            nombreDirector:informe1.nombreDirector,
            programaVinculacion:informe1.programaVinculacion,
            lineaAccionOpcion:informe1.lineaAccion,
            carreraInvolucarada:informe1.carrera,
            tb2:informe1.docentesParticipantes,
            tb3:informe1.estudiantesParticipantes,
            entidadBeneficiaria:informe1.nombreEntidadBeneficiaria,
            fechaInicioProyecot:informe1.fechaInicio,
            fechhaFinPlaneado:informe1.fechaEntrega,
            fechaSeguimiento:informe1.fechaSeguimiento,
            fechaInicioReal:informe1.fechaInicioReal,
            AlcanceTerriOpcion:informe1.alcanceTerritorial,
            objetivoGeneral:informe1.objetivoGeneral,
            objetivoEspecifico:informe1.objetivosEspecificosInforme,
            situacionInicioProyecto:informe1.situacionInicio,
            situacionActualBeneficios:informe1.situacionActual,
            conclusionesResumenProyecto:informe1.conclusiones,
            obsevacionesResumenProye:informe1.observacionesInformeSeguimiento,
            nombreCoordVincula:informe1.nombreCoordinadorVinculacion


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
