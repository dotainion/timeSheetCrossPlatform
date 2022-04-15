import { Validation } from "../../infrastructure/Validation";

export class Log extends Validation{
    id = null;
    day = null;
    month = null;
    year = null;
    week = null;
    startTime = null;
    endTime = null;
    
    setId(id){
        this.id = id;
    }

    setDay(day){
        this.day = day;
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