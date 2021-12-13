import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anexo2Service } from '@data/services/api/anexo2.service';
import { MateriasService } from '@data/services/api/materias.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { LoginServiceService } from '@data/services/login-service.service';
import { Anexo2 } from '@shared/models/anexos/anexo2';
import { Anexo3 } from '@shared/models/anexos/anexo3';
import { Mayeriasalum } from '@shared/models/dto/maeriasalum';
import { Materias } from '@shared/models/materias';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import { Anexo3Service } from '@data/services/api/anexo3.service';
import { AlumnoDatos } from '@shared/models/dto/alumnodatos';

//DOCX
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
  selector: 'app-alumnoconvocatoria',
  templateUrl: './alumnoconvocatoria.component.html',
  styleUrls: ['./alumnoconvocatoria.component.scss']
})

export class AlumnoconvocatoriaComponent implements OnInit,AfterViewInit {


  loader='assets/images/progress.gif'
  issloading=true;

  public anexo2:Anexo2[]=[]
  public anexo2M:Anexo2=new Anexo2()
  public carrera?:string;
  public maeriaslim:Mayeriasalum= new Mayeriasalum()
  public datosalumno:AlumnoDatos = new AlumnoDatos();
  docum?:string
  file;
  fecha;
  nombres;
  cedula;

  constructor(private anexo3service:Anexo3Service,private materiasService:MateriasService,private activatedRoute: ActivatedRoute,private sysdateService:SysdateService,private anexo2services:Anexo2Service,private loginServiceService:LoginServiceService) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      
    },1000)
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre = params['nombrescompletos']
      this.nombres=nombre;
      this.cedula=cedula;
      this.sysdateService.getCarrera(cedula).subscribe(data=>{
        this.carrera=data.codigoCarrera;
        console.log(this.carrera)
      })
      this.materiasService.getProtectCedula(cedula).subscribe(data=>{
        this.maeriaslim=data;
        console.log(this.maeriaslim)
      })
      this.anexo3service.getdatosalumno(cedula).subscribe(data=>{
        this.datosalumno=data;
        console.log(this.datosalumno)
        this.issloading=false;
      })
      
    })
    this.anexo2services.getAnexo2().subscribe(data=>{
      this.anexo2=data;
      this.issloading=false;
    })

  }
  aux: number = 0;
  aux2: number = 0;


  materias(id:Number){
    this.aux2=0;
    this.anexo2services.getAnexoM(id).subscribe(data=>{
      this.anexo3service.getDocenteTitulo(data.siglasCarrera+'').subscribe(datos=>{
        for (let i = 0; i < this.maeriaslim.materias!.length; i++) {
          for (let j = 0; j < data.materias!.length; j++) {
            if(this.maeriaslim.materias![i].nombre == data.materias![j].nombre) {
              this.aux2++;
              console.log('la respuesta es' + this.aux2);
            }
          }
        } 

        if(this.aux2===data.materias!.length){
          console.log("Si cumple con los requisitos para postular")
        }else{
          console.log("No cumple, para postular")
        }
      

        console.log(data) 
        if(this.aux2==data.materias!.length){
          Swal.fire({
            title: 'Esta seguro que desea postular al proyeto '+data.nombreProyecto,
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
              this.generate(this.anexo3(data,datos.titulo+''))
              console.log(this.anexo3(data,datos.titulo+''))
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
                        this.anexo3response.documento=docx+'';
                        this.anexo3service.saveanexo3(this.anexo3(data,datos.titulo+'')).subscribe(data=>{
                          Swal.fire({
                            icon: 'success',
                            title: 'Anexo',
                            text: 'Postulacion relizada espere una respuesta',
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
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Anexo',
            text: 'No puede aplicar a '+ data.nombreProyecto,
            confirmButtonColor: "#0c3255"
          })
        }
      })
         
    })
  }
  anexo3response:Anexo3 = new Anexo3();
  anexo3(anexo2: Anexo2,titulo:String):Anexo3{
    this.anexo3response.siglas_carrera=anexo2.siglasCarrera;
    this.anexo3response.nombrecarrera=anexo2.carrera;
    this.anexo3response.nombreproyecto=anexo2.nombreProyecto;
    this.anexo3response.idProyectoPPP=anexo2.idProyectoPPP;
    this.anexo3response.titulo_responsable=titulo;
    this.anexo3response.nombresestudiante=this.datosalumno.primerNombre+" "+this.datosalumno.segundoNombre;
    this.anexo3response.cedula=this.cedula;
    this.anexo3response.apellidosestudiante=this.datosalumno.primerApellido+" "+this.datosalumno.segundoApellido;
    this.sysdateService.getSysdate().subscribe(data=>{
    this.anexo3response.fecha_solicitud=data.fecha;});
    this.anexo3response.jornada=this.datosalumno.jornada;
    this.anexo3response.paralelo=this.datosalumno.paralelo;
    this.anexo3response.nombre_responsable=anexo2.nombreResponsable
    this.anexo3response.estado="PN";
    return this.anexo3response;
  }


  continuarposltulacion(){

  }

  //Docs
  generate(anexo3: Anexo3) {

    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo3.docx',
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
            titulo:anexo3.titulo_responsable,
            nombre_resp_vinculacion:anexo3.nombre_responsable,
            siglas:anexo3.siglas_carrera,
            nombreEstudiante:anexo3.nombresestudiante+" "+anexo3.apellidosestudiante,
            cedula:anexo3.cedula,
            nombrecarrera:anexo3.nombrecarrera,
            fecha:anexo3.fecha_solicitud,
            paralelo:anexo3.paralelo,
            jornada:anexo3.jornada,
            nombreproyecto:anexo3.nombreproyecto,
            ciclo:anexo3.ciclo
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
        saveAs(out, 'Postulacion Anexo3.docx');
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
