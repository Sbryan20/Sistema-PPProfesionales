import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Proyectos, listproyect} from '../../../shared/models/proyecto';
import { ProyectoService } from '../../../data/services/api/proyecto.service';
import { SysdateService } from '../../../data/services/api/sysdate.service';
import { Sysdate } from '../../../shared/models/sysdate';
import PizZipUtils from 'pizzip/utils/index.js';
import * as PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { BondingCoordinationService } from '../../../data/services/api/bonding-coordination.service';
import { Ientity } from '../../../shared/models/entidad';
import { Anexo2 } from '../../../shared/models/anexos/anexo2';
import { Anexo1 } from '../../../shared/models/anexos/anexo1';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { Anexo2Service } from '../../../data/services/api/anexo2.service';
import { Actividadesanexo } from '@shared/models/dto/actividadeanexo2';
import { Fechas } from '@shared/models/dto/fecha';
import { ActivatedRoute, Router } from '@angular/router';
import { ResposablepppService } from '@data/services/api/resposableppp.service';


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min; 
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
function abase64(archivo):String{
  var string;
    var reader=new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload=function(){
      string= reader.result
    }
    return string;
}

@Component({
  selector: 'app-compracticas',
  templateUrl: './compracticas.component.html',
  styleUrls: ['./compracticas.component.scss']
})
export class CompracticasComponent implements OnInit {



  listproyecto: Proyectos[] = [];
  public actividadesanexo:Actividadesanexo[]=[]
  public prc:Proyectos=new Proyectos()
  proyecto: listproyect = new listproyect();
  sysdate: Sysdate = new Sysdate();
  entidad: Ientity = new Ientity();
  anexo2: Anexo2 = new Anexo2();
  fechas:Fechas=new Fechas()
  public codigocare
  public fecha
  public nombreentidad?:String
  public identida
  public nombreetidad?:String
  //
  fechae1
  fechae2

  fechar1
  fechar2

  fechap1
  fechap2

  fechan1
  fechan2
  //

  correo;
  id?: number;
  //cargar input



  constructor(private router: Router,private resposablepppService:ResposablepppService,private activatedRoute: ActivatedRoute,private bondingCoordinationService:BondingCoordinationService,private fb: FormBuilder, private proyectoService: ProyectoService, private SysdateService: SysdateService, private Anexo2Service: Anexo2Service) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let nombre = params['nombre']
        this.proyectoService.getProyectos().subscribe(datas => {
          this.listproyecto = datas.filter(d=>d.nombreresponsable==nombre)
        })
 
    })
    
    this.SysdateService.getSysdate().subscribe(data => {
      this.sysdate = data
      this.fecha=data.fecha
    })

  }


  selectProyecto(event: any) {
    this.proyectoService.getProtectid(event.target.value).subscribe(data => {
      this.proyecto = data;
      this.prc=data
      this.codigocare=data.codigocarrera
      this.id = parseInt(this.proyecto.id + '');
      this.identida=data.entidadbeneficiaria;
      console.log(this.id)
      this.bondingCoordinationService.getEntidadid(this.identida).subscribe(date=>{
        this.nombreetidad=date.nombre;
      })
    })

  }
  private(){
    this.actividadesanexo.push({
      descripcion:"Emisión de la convocatoria",
      inicio:this.fechae1,
      fin:this.fechae2,
    },{
      descripcion:"Recepción de solicitudes",
      inicio:this.fechar1,
      fin:this.fechar2,
    },{
      descripcion:"Proceso de selección",
      inicio:this.fechap1,
      fin:this.fechap2,
    },{
      descripcion:"Notificación de resultados",
      inicio:this.fechan1,
      fin:this.fechan2,
    })    

    this.fechas.fechae1=this.fechae1;
    this.fechas.fechae2=this.fechae2;
    this.fechas.fechan1=this.fechan1;
    this.fechas.fechan2=this.fechan2;
    this.fechas.fechap1=this.fechap1;
    this.fechas.fechap2=this.fechap2;
    this.fechas.fechar1=this.fechar1;
    this.fechas.fechar2=this.fechar2;
  }

  Anexo2(anio: String): Anexo2 {
    this.private()
    this.anexo2.siglasCarrera=this.codigocare;
    this.anexo2.anio = anio;
    this.anexo2.numeroConvocatoria =getRandomArbitrary(0, 10000000);
    this.anexo2.fecha = this.sysdate.fecha;
    this.anexo2.carrera = this.proyecto.carrera;
    this.anexo2.ciclo = this.anexo2.ciclo;
    this.anexo2.nombreProyecto = this.proyecto.nombre;
    this.anexo2.entidadBeneficiaria = this.nombreetidad
    this.anexo2.fechaMaxRecepcion = this.anexo2.fechaMaxRecepcion;
    this.anexo2.nombreResponsable = this.proyecto.nombreresponsable;
    this.anexo2.emailDocente=this.correo
    this.anexo2.idProyectoPPP = this.proyecto.id;
    this.anexo2.actividades=this.actividadesanexo;
    return this.anexo2
  }



  generarAnexo() {

    const anio = this.sysdate.fecha + "";
    const split = anio.split('-');

    

    Swal.fire({
      title: 'Esta serguro?',
      text: "Una ves se le asigne el rol no lo podra cambiar!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deacuerdo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.generate(this.Anexo2(split[0]),this.prc,this.fechas,this.correo)
        this.actividadesanexo.length=0
        const { value: file } = await Swal.fire({
          allowOutsideClick: false,
          title: 'SELECCIONE EL PDF',
          text: 'Debe subir la covocataria en tipo PDF',
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
                  this.anexo2.documento=docx+''
                  this.Anexo2Service.saveanexo2(this.Anexo2(split[0])).subscribe(data => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Se mando convocatoria de forma existosa',
                      text: 'Exitoso',
                      confirmButtonColor: "#0c3255"
                    })
                    this.router.navigate(['/panel/proyecto/ver_solicidudes']);
                  }, err => {
                    Swal.fire({
                      icon: 'warning',
                      title: 'Al paracer hubo un problema',
                      text: err.error.message,
                      confirmButtonColor: "#0c3255"
                    })
  
                  })
                  resolve('')
                })   
              }
            })
          }
        })
      }
    })
  }


  ////Impresion del Convocatoria

  generate(anexo: Anexo2,proyecto:Proyectos,fechas:Fechas,correo) {

    loadFile(

      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo2.docx',
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
            siglas: anexo.siglasCarrera,
            anio: anexo.anio,
            num_convocatoria: anexo.numeroConvocatoria,
            fecha: anexo.fecha,
            ciclo: anexo.ciclo,
            carrera: anexo.carrera,
            nombre_proyeto: anexo.nombreProyecto,
            entidad_beneficiaria: anexo.entidadBeneficiaria,
            actividades: proyecto.actividadeslistProyectos,
            nombre_proyecto:anexo.nombreProyecto,
            asignatura: proyecto.requisitoslistProyectos,
            //Enlistar las asignaturas que necesitarán haber aprobado para ejecutar las actividades
            nombre_doc_responsableppp: anexo.nombreResponsable,
            email_doc_responsableppp: correo,
            fecha_inic_convocatoria:fechas.fechae1,
            fecha_fin_convocatoria:fechas.fechae2,
            fecha_inic_recepcion:fechas.fechar1,
            fecha_lim_recepcion:fechas.fechar2,
            fecha_inic_seleccion:fechas.fechap1,
            fecha_fin_seleccion:fechas.fechap2,
            fecha_i_not_resultados:fechas.fechan1,
            fecha_f_not_resultados:fechas.fechan2
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
        saveAs(out, 'Convocatoria.docx');
      }
    );
  }

}
