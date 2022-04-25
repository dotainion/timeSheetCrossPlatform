import { Collector } from "./Collector";

export class Factory extends Collector{
    map(records = []){
        this.clear();
        records.forEach((record)=>this.add(this.mapResults(record)));
        return this;
    }
}