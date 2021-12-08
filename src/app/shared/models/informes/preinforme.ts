export class PreInforme{
id?:Number
 idProyectoPPP?:Number;
 nombreProyecto?:String;
     nombreDirector?:String;
     nombreCarrera?:String; 
     antecedentes?:String; 
     objetivoGeneral?:String; 
     evidencias?:String; 
     nombreElaborado?:String; 
     fechaElaborado?:Date; 
     nombreRevisado?:String;
     cargoRevisado?:String; 
     fechaRevisado?:Date; 
     cedulaEstudiante?:String;
     estudianteInformeInicial?:EstudiantesInformeInicialRequest[];
     documento?:String;
      
}
export class EstudiantesInformeInicialRequest {
    id?:Number; 
     nombreEstudiante?:String;
     estado?:String; 
     observaciones?:String;
}