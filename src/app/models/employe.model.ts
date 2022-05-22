
export  interface  Employe  {
        
      
        id?: any;
        utilisateur?: string;
        login?: string;
        mail?: string;
        post?: string;
        action?: string;
        password?:string;
        roles:Role []      
}

 interface Role {
        id: string;
        name: string;

    }
  