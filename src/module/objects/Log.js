import { Validation } from "../../infrastructure/Validation";

export class Log extends Validation{
    id = null;
    userId = null;
    startTime = null;
    endTime = null;
    timestamp = null;
    
    setId(id){
        this.id = id;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setStartTime(startTime){
        this.startTime = startTime;
    }

    setEndTime(endTime){
        this.endTime = endTime;
    }

    setTimestamp(timestamp){
        this.timestamp = timestamp;
    }
}