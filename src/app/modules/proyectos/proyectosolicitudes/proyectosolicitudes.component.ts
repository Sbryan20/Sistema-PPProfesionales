import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import Swal from 'sweetalert2';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { Anexo4 } from '@shared/models/anexos/anexo4';
import { SysdateService } from '@data/services/api/sysdate.service';
import { saveAs } from 'file-saver';
import { Anexo4Service } from '@data/services/api/anexo4.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Anexo5Service } from '@data/services/api/anexo5.service';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-proyectosolicitudes',
  templateUrl: './proyectosolicitudes.component.html',
  styleUrls: ['./proyectosolicitudes.component.scss']
})
export class ProyectosolicitudesComponent implements OnInit {
  public anexo3:Anexo3[]=[];
  file

  
  @ViewChild(MatSort, {static: true}) sort?: MatSort;
  //Filtrar
  public displayedColumns = ['nombreproyecto', 'cedula', 'nombresestudiante', 'apellidosestudiante','fecha_solicitud','documento','boton_ac','boton_dn','estado'];
  public dataSource
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue; 
  }


  constructor(private anexo4Service:Anexo4Service,private sysdateService:SysdateService,private activatedRoute: ActivatedRoute,private anexo3service:Anexo3Service) { }

  ngOnInit(): void {
    this.anexo3service.getallanexo3().subscribe(data=>{
      this.anexo3=data;
      this.dataSource=new MatTableDataSource(this.anexo3); 
      this.dataSource.sort = this.sort;
    })  
  }

  guardar(anexo3:Anexo3){
    Swal.fire({
      title: 'Esta seguro que apecto la solicitud ',
      text: "Para ello debe firmar el siguiente anexo con sus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, postular!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ANEXO 3!',
          'Se le descargará un archivo WORD, y deberá subirlo en formato pdf',
          'success'
        )
        const { value: number } = await Swal.fire({
          title: 'Ingrese el numero de horas',
          input: 'number',
          inputLabel: 'Numero de horas',
          inputPlaceholder: 'Ingrese el numero de horas'
        })
        
        if (number) {
          this.generate(this.aceptarsolucitud(anexo3,number))
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
                    this.anexo4response.documento=docx+''
                    this.anexo4Service.saveanexo3(this.aceptarsolucitud(anexo3,number)).subscribe(data=>{
                      anexo3.estado="AN";
                      this.anexo3service.updatinanexo3(anexo3).subscribe(datos=>{},err=>{});
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
      }
    })
  }

  anexo4response:Anexo4 = new Anexo4();
  aceptarsolucitud(anexo3:Anexo3,num:number):Anexo4{
    this.anexo4response.idProyectoPPP=anexo3.idProyectoPPP;
    this.anexo4response.nombreEstudiante=anexo3.nombresestudiante+" "+anexo3.apellidosestudiante;
    this.anexo4response.nombreResponsable=anexo3.nombre_responsable;
    this.anexo4response.nombreProyecto=anexo3.nombreproyecto;
    this.anexo4response.siglasCarrera=anexo3.siglas_carrera;
    this.sysdateService.getSysdate().subscribe(data=>{
      this.anexo4response.fechaRespuesta=data.fecha;});
    this.anexo3service.getDocentedirector(anexo3.idProyectoPPP).subscribe(data=>{
      this.anexo4response.nombreDirector=data.nombre+" "+data.apellidos;
    })
    this.anexo3service.getReprecentanteproyect(anexo3.idProyectoPPP).subscribe(data=>{
      this.anexo4response.nombreRepresentante=data.nombre;
    })
    this.anexo4response.cedulaEstudiante=anexo3.cedula;
    this.anexo4response.numeroHoras=num+'';
    return this.anexo4response;
  }

  denegar(anexo3:Anexo3){
    anexo3.estado="DN";
    this.anexo3service.updatinanexo3(anexo3).subscribe(data=>{
      console.log("Hola")
    },err=>{
      console.log(err.error.Mensaje)
    });
  }
 //Docs
 generate(Anexo4: Anexo4) {

  loadFile(
    'https://download855.mediafire.com/q5cu3wnt6wtg/qijek752n3vwysq/anexo4.docx',
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
          fecha:Anexo4.fechaRespuesta,
          nombre_estudiante:Anexo4.nombreEstudiante,
          nombre_proyecto:Anexo4.nombreProyecto,
          siglas_carrera:Anexo4.siglasCarrera,
          nombre_poryecto:Anexo4.nombreProyecto,
          nom_director_proy:Anexo4.nombreDirector,
          nom_respre_entidad:Anexo4.nombreRepresentante,
          num_horas_asignadas:Anexo4.numeroHoras,
          nom_responsable_vinculacion:Anexo4.nombreResponsable,
          nom_apell_estudiante:Anexo4.nombreEstudiante
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


  //convert a pdf
  convertFile(docum) {
    console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Convocatoria.pdf');
    console.log(file);
    this.file = file;
    saveAs(file, 'Convocatoria.pdf');
  }
dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}


