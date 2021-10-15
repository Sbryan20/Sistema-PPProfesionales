import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '@data/services/api/proyecto.service';
import { ResposablepppService } from '@data/services/api/resposableppp.service';
import { SysdateService } from '@data/services/api/sysdate.service';
import { DocentesList } from '@shared/models/docentesapoyo/docenteslist';
import { DocentesRoles } from '@shared/models/docentesapoyo/docentesroles';
import { AsignacionRol, Docentes } from '@shared/models/docentesfull';
import { Proyectos } from '@shared/models/proyecto';
import { ResponsablePPP } from '@shared/models/responsableppp';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import Swal from 'sweetalert2';

//DOCX
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
@Component({
  selector: 'app-proyectomiembros',
  templateUrl: './proyectomiembros.component.html',
  styleUrls: ['./proyectomiembros.component.scss']
})

export class ProyectomiembrosComponent implements OnInit {
  public Docs:Docentes[]=[];
  public docentes:Docentes = new Docentes();
  public publicresPPP:ResponsablePPP[]=[];
  public proyecto:Proyectos= new Proyectos();
  public proyectopoin:Proyectos=new Proyectos()
  public listproyecto:Proyectos[]=[];
  public asignacion:AsignacionRol=new AsignacionRol();
  public fecha?:String;
  public docenteslist:DocentesList[]=[]
  public docentesRoles:DocentesRoles = new DocentesRoles();
  public rolDoc="2";
  private cedula?:string;
  public sysdate?:Date;
  public responsable:ResponsablePPP=new ResponsablePPP();
  public habilitar?: boolean= false;
  public fecha_final?:Date;
  //BASE 64
  docum!: String;
  file;
  //

     //Director
     addForm: FormGroup;
     rows: FormArray;
     itemForm?: FormGroup;
     ////
  
  constructor(private fb: FormBuilder,private sysdateservice:SysdateService,private proyectoService:ProyectoService,private resposableppservice:ResposablepppService,private router:Router,private activatedRoute: ActivatedRoute) { 
    //Director
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this.fb.array([]);
    ////
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
    })
    this.resposableppservice.cargardocente().subscribe(resp =>{
      this.Docs=resp
      this.dataSourcedoc=new MatTableDataSource(this.Docs); 
    })
    this.proyectoService.getProyectos().subscribe(data =>{
      this.listproyecto=data;
    })
    this.sysdateservice.getSysdate().subscribe(data=>{
      this.sysdate=data.fecha;
    })
    //DIRECTOR
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
    ////

  }
  //DIRECTOR
  onAddRow(cedual:String) {
    this.rows.push(this.createItemFormGroup(cedual));
    console.log(cedual)
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(cedual:String): FormGroup {
    return this.fb.group({
      cedula: cedual,
      cargo:"DP",
      fecha_fin:this.fecha_final,
      estado:true
    });
  }
  ////


public displayedColumns = ['cedula', 'nombres_completo', 'titulo', 'docente_tipo_tiempo','materias','carreas','fecha','boton'];
 public dataSourcedoc

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourcedoc.filter = filterValue;
  }

  selectProyecto() {
    this.proyecto=this.proyectopoin
    console.log(this.proyecto)
 
  }
//GUARDAR
 savemienbros(){
  this.docenteslist=this.rows.getRawValue()
  this.docentesRoles.cedula=this.cedula;
  this.docentesRoles.docentes=this.docenteslist;
  console.log(this.docentesRoles)
 }

  //Filtrar

  obtener(fecha:String, rol:String){
    let cedula=localStorage.getItem("cedula");
    console.log(fecha+" "+rol+cedula);
  }
  //HABILITAR/DESABILITAR
   //HABILITAR/DESABILITAR
   setHabilitar(): void{
    this.habilitar=(this.habilitar==true)? false: true;
  }

  selectDirectorProyecto (event: any) {
    
  }

  guardar(){
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
                resolve('')
                this.base(value)
              }
            })
          }
        })
      }
    })
   
  }






//Docs
  generate(docentes: Docentes,fecha:String,proyecto:Proyectos) {

    loadFile(
      
      'https://download853.mediafire.com/lfqrftb224tg/nus27sckq8b28b7/anexo1.docx',
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
              
              fecha: fecha,
              titulo: docentes.titulo,
              nombre_docente: docentes.nombres_completo,
              nombre_carrera: proyecto.codigocarrera,
              rol:"DOCENTE DE APOYO",
              nombre_proyecto: proyecto.nombre,
              nombre_coordinador:"dsfdsfd",
              siglas:proyecto.codigocarrera
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
        saveAs(out, 'Convocataria mienbros.docx');
      }
    );
  }
  ///TRAFORMAR BASE64

  base(event: any){
    const file = event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.docum = reader.result + '';
      console.log(reader.result) 
    };
  }

  //convert a pdf
  convertFile() {
    console.log(this.docum)
    //Usage example:
    var file = this.dataURLtoFile(this.docum, 'anexo.pdf');
    console.log(file);
    this.file = file;
    saveAs(file, 'anexo.pdf');
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


