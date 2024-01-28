import { Validation } from "../../infrastructure/Validation";

export class Account extends Validation{
    id = null; 
    name = null; 
    clientId = null;
    description = null;

    setId(id){
        this.id = id;
    }

    setClientId(clientId){
        this.clientId = clientId;
    }

    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }
}