import { Recrutment } from "./recrutment.model";

export interface Offre {
    id:number,
    refoffre: string,
    titre: string,
    description: string,
    post: string,
    nembposte:number,
    exigence: string,
    deparoff: Date,
    finoffre: Date,
    etat:string,
    recrutements : Recrutment[]


}
