import { Validation } from "../../infrastructure/Validation";

export class Log extends Validation{
    id = null;
    userId = null;
    date = null;
    month = null;
    year = null;
    week = null;
    startTime = null;
    endTime = null;
    
    setId(id){
        this.id = id;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setDate(date){
        this.date = date;
    }

    setMonth(month){
        this.month = month;
    }

    setYear(year){
        this.year = year;
    }

    setWeek(week){
        this.week = week;
    }

    setStartTime(startTime){
        this.startTime = startTime;
    }

    setEndTime(endTime){
        this.endTime = endTime;
    }
}