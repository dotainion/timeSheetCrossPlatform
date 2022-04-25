import { Validation } from "../../infrastructure/Validation";

export class Break extends Validation{
    id = null;
    logId = null;
    userId = null;
    startBreak = null;
    endBreak = null;
    month = null;
    year = null;
    
    setId(id){
        this.id = id;
    }

    setLogId(logId){
        this.logId = logId;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setMonth(month){
        this.month = month;
    }

    setYear(year){
        this.year = year;
    }

    setStartBreak(startBreak){
        this.startBreak = startBreak;
    }

    setEndBreak(endBreak){
        this.endBreak = endBreak;
    }
}