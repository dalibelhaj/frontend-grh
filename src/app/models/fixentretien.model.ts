import { OffreCandidats } from "./offre-candidats.model";


export interface Fixentretien {
    id:any,
    datentretien:string,
    heur:Date,
    description:string,
    offre_candidats:OffreCandidats[]
}
