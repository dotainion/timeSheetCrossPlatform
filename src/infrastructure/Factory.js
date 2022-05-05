import { Collector } from "./Collector";

export class Factory extends Collector{
    map(records = []){
        this.clear();
        records?.forEach((record)=>{
            if (!this.isValid(record)){
                return;
            }
            this.add(this.mapResults(record));
        });
        return this;
    }

    isValid(record){
        if (!record?.id && !record?.info){
            return false;
        }
        return true;
    }
}