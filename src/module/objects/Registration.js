import { Collector } from "../../infrastructure/Collector";

export class Registration extends Collector{
    id = null;
    key = null;
    used = null;

    constructor(){
        super();
    }

    setId(id){
        this.id = id;
    }

    setKey(key){
        this.key = key;
    }

    setUsed(used){
        this.used = used;
    }
}