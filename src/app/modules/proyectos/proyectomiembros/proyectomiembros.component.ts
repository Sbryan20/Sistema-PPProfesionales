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
import { Anexo1 } from '@shared/models/anexos/anexo1';
import { Anexo1Service } from '@data/services/api/anexo1.service';
import { DocentesDirector } from '@shared/models/docentesapoyo/docentesdirecto';

//DOCX
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}; // prints the base64 string
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-proyectomiembros',
  templateUrl: './proyectomiembros.component.html',
  styleUrls: ['./proyectomiembros.component.scss']
})

export class ProyectomiembrosComponent implements OnInit {
  public Docs:Docentes[]=[];
  public director:DocentesDirector= new DocentesDirector;
  public directorAnexo:Docentes = new Docentes()
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
  public nombrecordindor?:String
  //BASE 64
  docum?:string
  file;
  //

     //Director
     addForm: FormGroup;
     rows: FormArray;
     itemForm?: FormGroup;
     ////
  
  constructor(private anexo1Service:Anexo1Service,private fb: FormBuilder,private sysdateservice:SysdateService,private proyectoService:ProyectoService,private resposableppservice:ResposablepppService,private router:Router,private activatedRoute: ActivatedRoute) { 
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
      let nombre = params['nombrescompletos']
      console.log(nombre)
      this.cedula=cedula;
      this.nombrecordindor=nombre;
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


public displayedColumns = ['cedula', 'nombres_completo', 'titulo', 'docente_tipo_tiempo','materias','carreas','boton'];
 public dataSourcedoc

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourcedoc.filter = filterValue;
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
  
  anexo1: Anexo1 = new Anexo1;
  selectProyecto(event:any) {
    this.proyectoService.getProtectid(event.target.value).subscribe(data=>{
      this.anexo1.nombreCarrera=data.carrera;
      this.anexo1.nombreProyecto=data.nombre
      this.anexo1.idProyectoPPP=data.id;
      this.docentesRoles.idProyecto=data.id
      this.director.idProyecto=data.id
      this.anexo1.siglasCarrera=data.codigocarrera;
    })
  }
  Anexo1(docentes: Docentes,rol:String):Anexo1{
    this.anexo1.fechaDelegacion=this.sysdate;
    this.anexo1.fechaDelegado=this.sysdate;
    this.anexo1.docenteTitulo=docentes.titulo;
    this.anexo1.cedulaDelegado=docentes.cedula;
    this.anexo1.nombreDelegado=docentes.nombres_completo;
    this.anexo1.nombreRol=rol;
    this.anexo1.cedulaCoordinador=this.cedula;
    this.anexo1.nombreCoordinador=this.nombrecordindor
    return this.anexo1;
  }
  DocenteApoyo(docentes: Docentes,rol:String){
    this.docenteslist.length=0;
    this.docenteslist.push({
      cedula:docentes.cedula,
      cargo:rol+"",
      estado:true
    })
    this.docentesRoles.coordinador_id=this.cedula;
    this.docentesRoles.docentes=this.docenteslist;
  }
  selectDirectorProyecto (event: any) { 
    this.resposableppservice.getDocenteId(event.target.value).subscribe(data=>{
      this.directorAnexo=data;
      this.director.cedula=data.cedula
    })
  }
  directores(){
    this.director.coordinador_id=this.cedula;
    this.director.estado=true;
    this.guardardirec(this.directorAnexo,"director")
  }

  guardardirec(docentes: Docentes,rol:String){
    console.log(docentes);
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
        this.generate(this.Anexo1(docentes,rol));
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
                  this.anexo1.documento=docx+''
                  this.anexo1Service.saveanexo1(this.Anexo1(docentes,rol)).subscribe(data=>{
                    Swal.fire({
                      icon: 'success',
                      title: 'Anexo',
                      text: 'Proyecto creado correctamente',
                      confirmButtonColor: "#0c3255"   
                    }) 
                    this.resposableppservice.saverdirector(this.director).subscribe(date=>{
                      Swal.fire({
                      icon: 'success',
                      title: 'Anexo',
                      text: 'Persona creado correctamente',
                      confirmButtonColor: "#0c3255"   
                    }) },err=>{
                      Swal.fire({
                        icon: 'warning',
                        title: 'Al paracer hubo un problema',
                        text: err.error.message,
                        confirmButtonColor: "#0c3255"   
                      }) 
                    })
                  },err=>{
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
  guardar(docentes: Docentes,rol:String){
    this.DocenteApoyo(docentes,rol)
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
        this.generate(this.Anexo1(docentes,rol));
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
                const file:any = value;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                 reader.onload = () => {
                   this.anexo1.documento=reader.result+''
                  }; 
               this.anexo1Service.saveanexo1(this.Anexo1(docentes,rol)).subscribe(data=>{
                  
                  Swal.fire({
                    icon: 'success',
                    title: 'Anexo',
                    text: 'Proyecto creado correctamente',
                    confirmButtonColor: "#0c3255"   
                  }) 
                  this.resposableppservice.saverapoyo(this.docentesRoles).subscribe(date=>{
                    Swal.fire({
                    icon: 'success',
                    title: 'Anexo',
                    text: 'Persona creado correctamente',
                    confirmButtonColor: "#0c3255"   
                  }) },err=>{
                    Swal.fire({
                      icon: 'warning',
                      title: 'Al paracer hubo un problema',
                      text: err.error.message,
                      confirmButtonColor: "#0c3255"   
                    }) 
                  })
                },err=>{
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






//Docs
  generate(anexo1: Anexo1) {
    console.log(anexo1)
    loadFile(
      'https://raw.githubusercontent.com/Sbryan20/Sistema-PPProfesionales/main/src/assets/doc/anexo1.docx',
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
              fecha: anexo1.fechaDelegacion,
              titulo: anexo1.docenteTitulo,
              nombre_docente: anexo1.nombreDelegado,
              nombre_carrera: anexo1.nombreCarrera,
              delegacion:anexo1.nombreRol,
              nombre_proyecto: anexo1.nombreProyecto,
              nombre_coordinador:anexo1.nombreCoordinador,
              siglas:anexo1.siglasCarrera
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
        saveAs(out, 'Convocataria miembros.docx');
      }
    );
  }
  ///TRAFORMAR BASE64;

  

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


