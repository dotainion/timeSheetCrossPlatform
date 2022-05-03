import { ToastHandler } from "../../infrastructure/ToastHandler";
import { LogFactory } from "../factory/LogFactory";
import { LogRepository } from "../repository/LogRepository";
import { DateHelper } from '../../infrastructure/DateHelper'

export class Log extends ToastHandler{
    repo;
    factory;
    
    constructor(){
        super();
        this.date = new DateHelper();
        this.repo = new LogRepository();
        this.factory = new LogFactory();
    }

    async startTime(userId){
        try{
            const collector = await this.repo.getPendingLog(userId);
            if (collector.hasItems()) {
                this.warning(`Time already started at ${collector.first().startTime}`);
                return collector;
            }
            const date = new Date();
            const logObject = this.factory.mapResults({
                id: null,
                info: {
                    date: date.getDate(),
                    month: this.date.monthMini(date.getMonth()),
                    year: date.getFullYear(),
                    week: this.date.weekMini(date.getDay()),
                    startTime: date.toLocaleTimeString(),
                    endTime: 'pending',
                    userId: userId,
                }
            });
            return this.repo.startTime(logObject);
        }catch(error){
            console.log(error)
            this.error('Unable to start task.');
        }
    }

    endTime(userId){
        try{
            const date = new Date();
            return this.repo.endTime(userId, date.toLocaleTimeString());
        }catch(error){
            this.error('Unable to end task.');
        }
    }

    getPendingLog(userId){
        try{
            return this.repo.getPendingLog(userId);
        }catch(error){
            this.error('Unable to get time started.');
        }
    }

    async getLogsByMonth(userId, month, year){
        try{
            return await this.repo.getLogsByMonth(userId, month, year);
        }catch(error){
            this.error('Unable to get log.');
        }
    }

    async updateTime(logId, date, month, year, week, startTime, endTime, userId){
        try{
            const logObject = this.factory.mapResults({
                id: logId,
                info: {
                    date: date,
                    month: month,
                    year: year,
                    week: week,
                    startTime: startTime,
                    endTime: endTime,
                    userId: userId,
                }
            });
            console.log(logObject);
            return this.repo.updateTime(logObject);
        }catch(error){
            console.log(error)
            this.error('Unable to start task.');
        }
    }
}