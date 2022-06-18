import { DateHelper } from "../../infrastructure/DateHelper";
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

    constructor(){
        super();
        this.date = new DateHelper();
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

    initNowDate(){
        this.setFromMonth(this.date.monthMini((new Date().getMonth())));
        this.setFromYear(`${(new Date()).getFullYear()}`);
        this.setToMonth(this.date.monthMini((new Date().getMonth())));
        this.setToYear(`${(new Date()).getFullYear()}`);
        this.setFromDate(`${(new Date()).getDate()}`);
        this.setFromWeek(this.date.weekMini((new Date()).getDay()));
        this.setToDate(`${(new Date()).getDate()}`);
        this.setToWeek(this.date.weekMini((new Date()).getDay()));
    }
}