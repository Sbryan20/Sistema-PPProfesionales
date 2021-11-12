import { Actividadesanexo } from "../dto/actividadeanexo2";

export class Anexo2{
    id?:Number;
    siglasCarrera?:String;
    anio?:String;
    numeroConvocatoria?:String;
    fecha?:Date;
    ciclo?:String;
    carrera?:String;
    nombreProyecto?:String;
    emailDocente?:String;
    entidadBeneficiaria?:String;
    fechaMaxRecepcion?:Date;
    nombreResponsable?:String;
    idProyectoPPP?:Number;
    documento?:String;
    materias?: MateriasAn[]
    actividades?:Actividadesanexo[]=[]
}
export class MateriasAn{
    nombre?:String
}

