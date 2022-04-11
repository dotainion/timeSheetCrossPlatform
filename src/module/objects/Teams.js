import { Validation } from "../../infrastructure/Validation";

export class Teams extends Validation{
    _id = null;
    _name = null;
    _image = null;
    _description = null;

    id(){
        return this._id;
    }

    name(){
        return this._name;
    }

    image(){
        return this._image;
    }

    description(){
        return this._description;
    }

    setId(id){
        this._id = id;
    }

    setName(name){
        this._name = name;
    }

    setImage(image){
        this._image = image;
    }

    setDescription(description){
        this._description = description;
    }

    hasId(){
        if (this.id()) return true;
        return false;
    }
}