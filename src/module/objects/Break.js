import { Validation } from "../../infrastructure/Validation";

export class Break extends Validation{
    id = null;
    logId = null;
    userId = null;
    startBreak = null;
    endBreak = null;
    timestamp = null;
    
    setId(id){
        this.id = id;
    }

    setLogId(logId){
        this.logId = logId;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setStartBreak(startBreak){
        this.startBreak = startBreak;
    }

    setEndBreak(endBreak){
        this.endBreak = endBreak;
    }

    setTimestamp(timestamp){
        this.timestamp = timestamp;
    }
}