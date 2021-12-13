export class Informe1{
    id?:Number;
    programaVinculacion?:String;
    lineaAccion?:String
    nombreProyecto?:String
    carrera?:String
    nombreEntidadBeneficiaria?:String
    plazoEjecucion?:String
    alcanceTerritorial?:String
    objetivoGeneral?:String
    situacionInicio?:String
    situacionActual?:String
    conclusiones?:String
    nombreDirector?:String
    cedulaDirector?:String
    documento?:String;
    nombreCoordinadorVinculacion?:String
    cedulaCoordinadorVinculacion?:String
    fechaInicio?:Date
    fechaFin?:Date
    fechaSeguimiento?:Date
    fechaInicioReal?:Date
    fechaFinReal?:Date
    fechaEntrega?:Date
    idProyectoPPP?:Number;
    observacionesInformeSeguimiento?:ObservacionesInformeSeguimientoRequest[];
    docentesParticipantes?:DocentesParticipantesRequest[];
    estudiantesParticipantes?:EstudiantesParticipantesRequest[];
    objetivosEspecificosInforme?:ObjetivosEspecificosInformeRequest[];
    actividadesInformeSeguimientoRequest?:ActividadesInformeSeguimientoRequest[];
}
export class ObservacionesInformeSeguimientoRequest{
    id?:Number;
    descripcion?:String;
    idInformeSeguimiento?:Number
}
export class DocentesParticipantesRequest{
    id?:Number;
    cedula?:String;
    informeId?:Number;
    numeroHoras?:String;
    nombres?:String;
    carrera?:String;
}
export class EstudiantesParticipantesRequest{
    id?:Number;
    cedula?:String;
    informeId?:Number;
    numeroHoras?:String;
    nombre?:String;
    carrera?:String;
}
export class ObjetivosEspecificosInformeRequest{
    id?:Number;
    descripcion?:String;
}
export class ActividadesInformeSeguimientoRequest{
    id?:Number;
    actividades?:String;
    porcentajeCumplimiento?:String;
    responsableEjecucion?:String;
    documento?:String;
    observaciones?:String;
    fechaEjecucion?:Date;
    idInformeSeguimiento?:Number
}