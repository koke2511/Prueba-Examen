import type { ObjectId, OptionalId } from "mongodb";


//Esto es del propio programa 
export type monumentos = {
    id: string;
    nombre: string,
    descripcion: string,
    cp: number,
    ciudad: string,
    pais: string
};



//Esto es del mongo 
export type monumentosModel = {
    _id: ObjectId,
    nombre: string,
    descripcion: string,
    cp: number,
    ciudad: string,
    pais: string 
};
