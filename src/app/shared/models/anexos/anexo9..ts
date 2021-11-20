export class Anexo9{
    id?:Number;
    idProyecto?:Number;
    nombreProyecto?:String;
    entidadBeneficiaria?:String;
    mesPlanificaccion?:String;
    observaciones?:String;
    nombreApoyo?:String;
    nombreDirector?:String;
    fechaSeguimeinto?:Date;
    documento?:String;
    actividadesAnexo9?:ActividadesAnexo9[];

}

export class ActividadesAnexo9{
    id?:Number;
    numero?:String;
    actividadesPlanificacion?:String;
    estudianteResponsable?:String;
    fechaPlanificacion?:Date;
    finalizacion?:String;
}