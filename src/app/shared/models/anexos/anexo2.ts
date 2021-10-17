export class Anexo2{
    id?:Number;
    siglasCarrera?:Date;
    anio?:String;
    numeroConvocatoria?:String;
    fecha?:Date;
    ciclo?:String;
    carrera?:String;
    nombreProyecto?:String;
    entidadBeneficiaria?:String;
    fechaMaxRecepcion?:Date;
    nombreResponsable?:String;
    idProyectoPPP?:Number;
    documento?:String;
    actividades?:actividades[]
}
interface actividades {
    id?:Number
    descripcion?:String;
    inicio:Date;
    fin:Date;
}

