export class Docentes {
    id?:Number;
    cedula?:              string;
    nombres_completo?:    string;
    titulo?:              string;
    docente_tipo_tiempo?: string;
    materias?:            Materia[];
    carreas?:            Carrera[];
}

 interface Carrera {
    nombrecarrera: string;
}

 interface Materia {
    nombre: string;
}

export interface Extra{
    fecha?:String;
}

export class AsignacionRol{
    coordinador_id?:   String;
    docentes?:         DocenteRol[];
}

interface DocenteRol{
    cedula: String;
    cargo:String;
}