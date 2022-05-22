import { Employe } from "./employe.model";
import { Offre } from "./offre.model";

export interface Recrutment {
    titre:String,
    employes:String[],
    ttp:string,
    avis:string,
    offre:Offre[]
}
