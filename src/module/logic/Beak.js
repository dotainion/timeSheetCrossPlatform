import { DateHelper } from "../../infrastructure/DateHelper";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { BreakFactory } from "../factory/BreakFactory";
import { LogFactory } from "../factory/LogFactory";
import { BreakRepository } from "../repository/BreakRepository";

export class Break extends ToastHandler{
    repo;
    factory;
    
    constructor(){
        super();
        this.date = new DateHelper();
        this.repo = new BreakRepository();
        this.factory = new BreakFactory();
    }

    async startBreak(logId, userId, endTime='pending'){
        try{
            const collector = await this.repo.getPendingBreak(logId);
            if (collector.hasItems()) {
                this.warning(`Break already started at ${collector.first().startBreak}. Click start to end.`);
                return collector;
            }
            const date = new Date();
            const logObject = this.factory.mapResults({
                id: null,
                info: {
                    logId: logId,
                    userId: userId,
                    startBreak: date.toLocaleTimeString(),
                    endBreak: endTime,
                    timestamp: date.getTime()
                }
            });
            return this.repo.startBreak(logObject);
        }catch(error){
            console.log(error)
            this.error('Unable to start task.');
        }
    }

    endBreak(logId){
        try{
            const date = new Date();
            return this.repo.endBreak(logId, date.toLocaleTimeString());
        }catch(error){
            this.error('Unable to end task.');
        }
    }

    getPendingBreak(logId){
        try{
            return this.repo.getPendingBreak(logId);
        }catch(error){
            this.error('Unable to get time started.');
        }
    }

    getBreakByTimestamp(userId, queryObj){
        try{
            return this.repo.getBreakByTimestamp(userId, queryObj);
        }catch(error){
            this.error('Unable to get time started.');
        }
    }

    updateBreak(startBreak, endBreak, breakId){
        try{
            if (!breakId){
                throw new Error('Invalid id');
            }
            startBreak =  startBreak?.toUpperCase?.();
            endBreak =  endBreak?.toUpperCase?.();
            return this.repo.updateBreak(startBreak, endBreak, breakId);
        }catch(error){
            this.error('Unable to update break.');
        }
    }

    deleteBreak(breakId){
        try{
            if (!breakId){
                throw new Error('Invalid id');
            }
            return this.repo.deleteBreak(breakId);
        }catch(error){
            this.error('Unable to update break.');
        }
    }
}