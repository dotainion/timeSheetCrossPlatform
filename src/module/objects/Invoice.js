import { Validation } from "../../infrastructure/Validation";

export class Invoice extends Validation{
    id = null;
    date = null;
    startTime = null;
    endTime = null;

    setId(id){
        this.id = id;
    }

    setDate(date){
        this.date = date;
    }

    setStartTime(startTime){
        this.startTime = startTime;
    }

    setEndTime(endTime){
        this.endTime = endTime;
    }
}