import { Collector } from "./Collector";

export class Factory extends Collector{
    map(records = []){
        records.forEach((record)=>this.add(this.mapResults(record)));
        return this;
    }
}