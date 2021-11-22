export class Anexo7{
    id?:Number;
    nombreEntidadBeneficiaria?:String;
    nombreDirectorProyecto?:String;
    fechaPlanificacion?:Date;
    mesAnioPlanificado?:String;
    idProyecto?:Number;
    horasDocentes?:HorasEstudiantesA7Request[];
    horasEstudiantes?:HorasEstudiantesA7Request[];
}

export class HorasDocentesA7Request{
    id?:Number;
    resultados?:String;
    actividad?:String;
    nombreDocenteApoyo?:String;
    cedulaDocente?:String;
    numHoras?:Number;
    fechaInicio?:Date;
    fechaFin?:Date;
    observaciones?:String
}
export class HorasEstudiantesA7Request{
    estudiante?:String;
    id?:Number;
    resultados?:String;
    actividad?:String;
    cedulaEstudiante?:String;
    nombreEstudiante?:String;
    numHoras?:Number;
    fechaInicio?:Date;
    fechaFin?:Date;
    observaciones?:String
}