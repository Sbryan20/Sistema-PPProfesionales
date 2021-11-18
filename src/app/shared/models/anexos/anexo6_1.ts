export class Anexo6_1{
    id?:Number;
    fechaApoyo?:Date;
    fechaDirector?:Date;
    nombreApoyo?:String;
    nombreDirector?:String;
    cedulaDirector?:String;
    documento?:String;
    idProyecto?:Number;
    actividades?:ActividadesAnexo6_1Request[]

}

export class ActividadesAnexo6_1Request{
    id?:Number;
    numero?:Number;
    actividadesEstudiante?:String;
    controlEstudiante?:String;
    desempenoEstudiante?:String;
    asignaturasBase?:String;
}