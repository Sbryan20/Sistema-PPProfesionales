export class Anexo12{
   id?:Number;
   nombreProyecto?:String;
   fechaCapacitacion?:Date;
   entidadBeneficiaria?:String
   repreentanteEntidad?:String
   telefonoEntidad?:String
   asuntoCapacitacion?:String
   horasCapacitacion?:String
   emailRepresentanteEntidad?:String
   nombreAdministrador?:String
   nombreApoyo?:String
   documento?:String
   cedulaApoyo?:String
   idProyectoPPP?:Number;
   actividadesAnexo12?:ActividadesAnexo12Request[];
}

export class ActividadesAnexo12Request{
    id?:Number;
    nombresCompletos?:String;
    cedula?:String;
    observaciones?:String;
    idAnexo12?:Number;
}