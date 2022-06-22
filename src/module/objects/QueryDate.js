import { DateHelper } from "../../infrastructure/DateHelper";
import { time } from "../../infrastructure/tools/Time";
import { Validation } from "../../infrastructure/Validation";

export class QueryDate extends Validation{
    fromMonth;
    fromYear;
    toMonth;
    toYear;
    fromWeek;
    fromDate;
    toWeek;
    toDate;
    form;
    to;
    fromInt;
    toInt;

    constructor(){
        super();
        this.date = new DateHelper();
    }

    setToInt(toInt){
        this.toInt = toInt;
    }

    setFromInt(fromInt){
        this.fromInt = fromInt;
    }

    setFrom(from){
        this.from = from;
    }

    setTo(to){
        this.to = to;
    }

    setFromWeek(fromWeek){
        if(!this.date.isValidMinWeek(fromWeek)){
            throw new Error('Invalid Week day (fromWeek).');
        }
        this.fromWeek = fromWeek;
    }

    setFromDate(fromDate){
        if(isNaN(fromDate)){
            throw new Error('Invalid Date (fromDate).');
        }
        this.fromDate = fromDate;
    }

    setToWeek(toWeek){
        if(!this.date.isValidMinWeek(toWeek)){
            throw new Error('Invalid Week day (toWeek).');
        }
        this.toWeek = toWeek;
    }

    setToDate(toDate){
        if(isNaN(toDate)){
            throw new Error('Invalid Date (toDate).');
        }
        this.toDate = toDate;
    }

    setFromMonth(fromMonth){
        if(!this.date.isValidMinMonth(fromMonth)){
            throw new Error('Invalid Month (fromMonth).');
        }
        this.fromMonth = fromMonth;
    }

    setFromYear(fromYear){
        if(isNaN(fromYear)){
            throw new Error('Invalid year (fromYear).');
        }
        this.fromYear = fromYear;
    }

    setToMonth(toMonth){
        if(!this.date.isValidMinMonth(toMonth)){
            throw new Error('Invalid Month (toMonth).');
        }
        this.toMonth = toMonth;
    }

    setToYear(toYear){
        if(isNaN(toYear)){
            throw new Error('Invalid year (toYear).');
        }
        this.toYear = toYear;
    }

    parseTimestamp(timestamp){
        const date = new Date(timestamp);
        return {
            year: `${date.getFullYear() || ''}`,
            month: `${date.getMonth() || ''}`,
            day: `${date.getDay() || ''}`,
            date: `${date.getDate() || ''}`
        }
    }

    initNowDate(){
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() -1);
        const toDate = new Date();
        toDate.setDate(toDate.getDate() +1);
        this.setFromMonth(this.date.monthMini(fromDate.getMonth()));
        this.setFromYear(`${fromDate.getFullYear()}`);
        this.setToMonth(this.date.monthMini(toDate.getMonth()));
        this.setToYear(`${toDate.getFullYear()}`);
        this.setFromDate(`${fromDate.getDate()}`);
        this.setFromWeek(this.date.weekMini(fromDate.getDay()));
        this.setToDate(`${toDate.getDate()}`);
        this.setToWeek(this.date.weekMini(toDate.getDay()));
        this.setFrom(fromDate);
        this.setTo(toDate);
        this.setFromInt(fromDate.getTime());
        this.setToInt(toDate.getTime());
    }
}