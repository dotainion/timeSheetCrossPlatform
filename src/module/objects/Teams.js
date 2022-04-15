import { Validation } from "../../infrastructure/Validation";

export class Teams extends Validation{
    id = null;
    name = null;
    image = null;
    description = null;

    setId(id){
        this.id = id;
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