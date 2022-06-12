import { Validation } from "../../infrastructure/Validation";

export class Teams extends Validation{
    id = null;
    name = null;
    image = null;
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

    setImage(image){
        this.image = image;
    }

    setDescription(description){
        this.description = description;
    }

    hasId(){
        if (this.id()) return true;
        return false;
    }
}