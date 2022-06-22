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
                    startTime: date.toLocaleTimeString(),
                    endTime: 'pending',
                    userId: userId,
                    timestamp: date.getTime()
                }
            });
            return await this.repo.startTime(logObject);
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

    async getLogsByTimestamp(userId, queryObj){
        try{
            return await this.repo.getLogsByTimestamp(userId, queryObj);
        }catch(error){
            console.log(error)
            this.error('Unable to get log.');
        }
    }

    async updateTime(logId, userId, startTime, endTime, timestamp){
        try{
            const logObject = this.factory.mapResults({
                id: logId,
                info: {
                    startTime: startTime,
                    endTime: endTime,
                    userId: userId,
                    timestamp: timestamp
                }
            });
            return this.repo.updateTime(logObject);
        }catch(error){
            console.log(error)
            this.error('Unable to start task.');
        }
    }
}