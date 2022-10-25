export class TimeHandler{
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    add(startTimeInstance, endTimeInstance){
        if(!startTimeInstance instanceof TimeHandler || !endTimeInstance instanceof TimeHandler){
            throw new Error('TimeHandler add method only accepts instance of TimeHandler');
        }
        this.days = startTimeInstance.days + endTimeInstance.days;
        this.hours = startTimeInstance.hours + endTimeInstance.hours;
        this.minutes = startTimeInstance.minutes + endTimeInstance.minutes;
        this.seconds = startTimeInstance.seconds + endTimeInstance.seconds;
        return this;
    }

    sub(startTime, endTime){
        const timeDifference = (new Date(endTime) - new Date(startTime));
        if(timeDifference > 0){
            this.days = Math.floor(timeDifference / 86400000);
            this.hours = Math.floor((timeDifference % 86400000) / 3600000);
            this.minutes = Math.round(((timeDifference % 86400000) % 3600000) / 60000);
            this.seconds = Math.floor(timeDifference / 1000 % 60);
        }
        return this;
    }

    toString(){
        return `${this.days} days, ${this.hours}:${this.minutes}:${this.seconds}`;
    }
}