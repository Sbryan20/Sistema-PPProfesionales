export class Anexo5{
    id?:Number;
    fechaEmision?:Date;
    tituloTercerN?:String;
    nombreDocenteReceptor?:String;
    directorD?:String;
    siglasCarrera?:String;
    nonbreDocenteEmisor?:String;
    fechaRecepcion?:Date;
    idProyectoPPP?:Number;
    documento?:String;
    alumnos?: alumnosAnexo5Request[];
    }

interface alumnosAnexo5Request {
    id: Number;
    nombreEstudiante: String;
    cedulaEstudiante: String;
}