export class Proyectos {
    id?:number;
    codigo?:string;
    nombre?:string;
    lineaaccion?:string;
    codigocarrera?:string;
    estado?:boolean;
    fechaat?:string;
    entidadbeneficiaria?:number;
    directorProyecto?:string;
    responsablePPP?:string;
    actividadeslistProyectos?: actividadeslistProyectos[];
    requisitoslistProyectos?:  requisitoslistProyectos[];
}

interface actividadeslistProyectos {
    descripcion: string;
}

 interface requisitoslistProyectos {
    descripcion: string;
}
