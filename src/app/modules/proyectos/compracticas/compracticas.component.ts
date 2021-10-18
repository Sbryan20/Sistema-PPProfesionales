import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Proyectos, listproyect } from '../../../shared/models/proyecto';
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
import { Anexo2Service } from '../../../data/services/api/anexo2.service';



function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-compracticas',
  templateUrl: './compracticas.component.html',
  styleUrls: ['./compracticas.component.scss']
})
export class CompracticasComponent implements OnInit {



  listproyecto: Proyectos[] = [];
  proyecto: listproyect = new listproyect();
  sysdate: Sysdate = new Sysdate();
  entidad: Ientity = new Ientity();
  anexo2: Anexo2 = new Anexo2();


  id?: number;
  //cargar input



  constructor(private fb: FormBuilder, private proyectoService: ProyectoService, private SysdateService: SysdateService, private Anexo2Service: Anexo2Service) {

  }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe(data => {
      this.listproyecto = data
      console.log(data)
    })
    this.SysdateService.getSysdate().subscribe(data => {
      this.sysdate = data
    })
  }


  selectProyecto(event: any) {
    this.proyectoService.getProtectid(event.target.value).subscribe(data => {
      this.proyecto = data;
      this.id = parseInt(this.proyecto.id + '');
      console.log(this.id)


    })

  }

  Anexo2(anio: String): Anexo2 {

    this.anexo2.siglasCarrera;
    this.anexo2.anio = anio;
    this.anexo2.numeroConvocatoria = this.anexo2.numeroConvocatoria;
    this.anexo2.fecha = this.sysdate.fecha;
    this.anexo2.carrera = this.proyecto.carrera;
    this.anexo2.ciclo = this.anexo2.ciclo;
    this.anexo2.nombreProyecto = this.proyecto.nombre;
    this.anexo2.entidadBeneficiaria = this.entidad.nombre;
    this.anexo2.fechaMaxRecepcion = this.anexo2.fechaMaxRecepcion;
    this.anexo2.nombreResponsable = this.proyecto.nombreresponsable;
    this.anexo2.idProyectoPPP = this.proyecto.id;
    this.anexo2.actividades = this.anexo2.actividades;
    return this.anexo2
  }



  generarAnexo() {

    const anio = this.sysdate.fecha + "";
    const split = anio.split('-');

    console.log(this.Anexo2(split[0]))

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
        this.generate(this.Anexo2(split[0]));
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
                this.base(value)
                this.Anexo2Service.saveanexo2(this.Anexo2(split[0])).subscribe(data => {
                }, err => {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Al paracer hubo un problema',
                    text: err.error.message,
                    confirmButtonColor: "#0c3255"
                  })

                })
                resolve('')
              }
            })
          }
        })
      }
    })
  }


  ////Impresion del Convocatoria

  generate(anexo: Anexo2) {

    loadFile(

      'https://download1081.mediafire.com/r5d3t08erqug/zqm50wc75chvo4k/anexo2.docx',
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
            sigla: anexo.siglasCarrera,
            anio: anexo.anio,
            num_convocatoria: anexo.numeroConvocatoria,
            fecha: anexo.fecha,
            ciclo: anexo.ciclo,
            carrera: anexo.carrera,
            nombre_proyeto: anexo.nombreProyecto,
            entidad_beneficiaria: anexo.entidadBeneficiaria,
            actividades_proyecto: anexo.actividades,
            nombre_proyecto:anexo.nombreProyecto,
            asignaturas_necesarias: "",
            //Enlistar las asignaturas que necesitarán haber aprobado para ejecutar las actividades
            fecha_lim_recepcion: anexo.fechaMaxRecepcion,
            fecha_convocatoria: anexo.fecha,
            fecha_inic_recepcion: anexo.fechaMaxRecepcion,
            fecha_seleccion: anexo.fechaMaxRecepcion,
            fecha_not_resultados: anexo.fechaMaxRecepcion,
            nombre_doc_responsableppp: anexo.nombreResponsable,
            email_doc_responsableppp: anexo.nombreResponsable
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

  ///TRAFORMAR BASE64;
  base(event: any) {
    const file = event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.anexo2.documento = reader.result + ''
    };
  }

}
