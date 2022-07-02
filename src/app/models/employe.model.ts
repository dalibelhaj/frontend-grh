
export  interface  Employe  {
        
      
        id: any;
        utilisateur: string;
        login: string;
        mail: string;
        post: string;
        action: string;
        password:string;
        roles:Role [];
        recrutements:Recrutment      
}

 interface Role {
        id: string;
        name: string;

    }

    interface Recrutment {
    titre:String,
    employes:String[],
    ttp:string,
    avis:string,
    offre:any

    }
  