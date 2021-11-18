export class Anexo6{
    id?:Number;
    nombreProyecto?:String;
    nombreDocenteApoyo?:String;
    nombreEntidad?:String;
    nombreEstudiante?:String;
    cedulaEstudiante?:String;
    nombreResponsableVinculacion?:String;
    nombreCoordinadorVinculacion?:String;
    cedulaCoordinadorVinculacion?:String;
    fecha?:Date;
    periodoAcademico?:String;
    ciclo?:String;
    proyectoId?:Number
    actividades?:ActividadesAnexo6Request[];
    documento?:String;

}
export class ActividadesAnexo6Request{
    id?:Number;
    numero?:Number;
    actividad?:String;
    asignatura?:String;
    resultado?:String;
    horasAsignadas?:String;
    totalHoras?:String;

}