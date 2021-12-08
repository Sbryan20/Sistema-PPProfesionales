import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Anexo2 } from '@shared/models/anexos/anexo2';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Anexo5 } from '@shared/models/anexos/anexo5';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import { Anexo5Service } from '@data/services/api/anexo5.service';
import Swal from 'sweetalert2';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

//DOCX
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};

@Component({
  selector: 'app-miembroestudiantes',
  templateUrl: './miembroestudiantes.component.html',
  styleUrls: ['./miembroestudiantes.component.scss']
})
export class MiembroestudiantesComponent implements OnInit {

    //ArrayAntividades
    addFormR: FormGroup;
    rowsR: FormArray;
    itemFormR?: FormGroup;
    private cedula;

    siglas;
    anexo1response:Anexo1[]=[];
    anexo1: Anexo1=new Anexo1;
    anexo1es: Anexo1=new Anexo1;
 

  constructor(private resposablepppService:ResposablepppService,private anexo1service:Anexo1Service,private fbR: FormBuilder,private activatedRoute: ActivatedRoute,private anexo3service:Anexo3Service,private sysdateService:SysdateService,private anexo5Service:Anexo5Service) {
      //Array
      this.addFormR = this.fbR.group({
        itemsR: [null, Validators.required],
        items_valueR: ['no', Validators.required]
      });
      this.rowsR = this.fbR.array([]);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      console.log(cedula)
      this.cedula=cedula
      this.filtrar('');
      
    })
    //Array de alumnos
    this.addFormR.get("items_valueR")?.setValue("yes");
    this.addFormR.addControl('rowsR', this.rowsR);
  }
  //Array de alumnos
  onAddRowR(anexo3:Anexo3) {
    this.rowsR.push(this.createItemFormGroupR(anexo3));
    console.log(anexo3)
  }
  onRemoveRowR(rowIndex:number){
    this.rowsR.removeAt(rowIndex);
  }
  createItemFormGroupR(anexo3:Anexo3): FormGroup {
    return this.fbR.group({
      cedulaEstudiante: anexo3.cedula,
      nombreEstudiante: anexo3.nombresestudiante+" "+anexo3.apellidosestudiante
    });
  }


  filtrar(anguja:String){
    console.log(anguja)
    this.resposablepppService.getResponsableId(this.cedula).subscribe(data=>{
      console.log(data.codigo)
      this.anexo1service.getbyCarrera(data.codigo).subscribe(dat=>{
        this.anexo1response=dat.filter(da=>da.nombreRol=="apoyo"&&da.nombreProyecto?.includes(anguja+''))
        console.log(this.anexo1response)
      })
    })
  }

  public anexo5resposae:Anexo5 = new Anexo5;
  ObtnerDatos():Anexo5{
    this.anexo5resposae.siglasCarrera=this.anexo1.siglasCarrera;
    this.anexo5resposae.idProyectoPPP=this.anexo1.idProyectoPPP;
    this.anexo5resposae.nombreProyecto=this.anexo1.nombreProyecto
    this.anexo5resposae.alumnos=this.rowsR.getRawValue();
    this.anexo5resposae.nombreDocenteReceptor=this.anexo1.nombreDelegado;
    this.anexo5resposae.cedulaDocenteApoyo=this.anexo1.cedulaDelegado
    this.anexo3service.getDocenteTitulo(this.anexo1.siglasCarrera).subscribe(det=>{
      this.anexo5resposae.nonbreDocenteEmisor=det.nombres_completo
      this.anexo5resposae.tituloTercerN=det.titulo;
    })
    this.sysdateService.getSysdate().subscribe(data=>{
    this.anexo5resposae.fechaEmision=data.fecha;});
    this.anexo1service.getbyCarrera(this.anexo1.siglasCarrera).subscribe(date=>{
      date.filter(da=>da.nombreRol=="director").forEach(element => {
        this.anexo5resposae.directorD=element.nombreDelegado
        console.log(element.nombreDelegado)
      });
    })
    return this.anexo5resposae
  }

  guardar(){
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
        this.generate(this.ObtnerDatos())
          const { value: file } = await Swal.fire({
            allowOutsideClick: false,
            title: 'SELECCIONE EL PDF',
            text:'Debe subir la covocataria en tipo PDF',
            input: 'file',
            inputAttributes: {
              'accept': 'application/pdf',
              'aria-label': 'Debe subir la covocataria en tipo PDF'
            },
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value === null) {
                  resolve('Es necesario que seleccione el PDF')
                } else {
                  getBase64(value).then(docx=>{
                    this.anexo5resposae.documento=docx+''
                    this.anexo5Service.saveAnexo5(this.ObtnerDatos()).subscribe(data=>{
                      Swal.fire({
                        icon: 'success',
                        title: 'Anexo',
                        text: 'Postulacion relizada espera una respuesta',
                        confirmButtonColor: "#0c3255"})
                    },err=>{
                      Swal.fire({
                        icon: 'error',
                        title: 'Anexo',
                        text: 'Hubo un error: '+err.error.message,
                        confirmButtonColor: "#0c3255"})
                    }) 
                  })
                    
                }
              })
            }
          })
        }
 
    })

  }

  selectAlumnos(event: any) {
    console.log(event.target.value)
    if(event.target.value=="SL"){
      this.dataSource=null;
    }else{
      this.anexo1service.getbyCedula(event.target.value).subscribe(data=>{
        this.anexo1=data[0]
        this.anexo3service.getanexo3by(data[0].idProyectoPPP).subscribe(d=>{
          this.dataSource=new MatTableDataSource(d.filter(datas=>datas.estado=="AN")); 
        })
      })   
    }
  }

  
  //table
  public displayedColumns = ['id', 'cedula', 'nombresestudiante','apellidosestudiante','boton'];
  public dataSource

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //Docs
  generate(anexo5: Anexo5) {
    console.log(anexo5)
    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo5.docx',
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
            fecha:anexo5.fechaEmision, 
            titulo:anexo5.siglasCarrera,
            proyecto:anexo5.nombreProyecto,
            docente:anexo5.nombreDocenteReceptor,
            estudiantes:anexo5.alumnos,
            director:anexo5.directorD,  
            nom_responsable_ppp:anexo5.nonbreDocenteEmisor,
            siglas_carrera:anexo5.siglasCarrera,
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
