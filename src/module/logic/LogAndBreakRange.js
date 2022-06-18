import { DateHelper } from "../../infrastructure/DateHelper";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { BreakFactory } from "../factory/BreakFactory";
import { LogFactory } from "../factory/LogFactory";
import { BreakRepository } from "../repository/BreakRepository";
import { LogRepository } from "../repository/LogRepository";
import { Log } from "./Log";
import { Break } from './Beak';
import { Collector } from "../../infrastructure/Collector";

export class LogAndBreakRange extends ToastHandler{
    date;
    logLogic;
    breakLogic;
    logCollector;
    breakCollector;
    
    constructor(){
        super();
        this.date = new DateHelper();
        this.logLogic = new Log();
        this.breakLogic = new Break();
        this.logCollector = new Collector();
        this.breakCollector = new Collector();
    }

    buildLogs(collector){
        for(let obj of collector.list()){
            this.logCollector.add(obj);
        }
    }

    buildBreaks(collector){
        for(let obj of collector.list()){
            this.breakCollector.add(obj);
        }
    }

    clearCollector(){
        this.logCollector.clear();
        this.breakCollector.clear();
    }

    sanitizeRange(obj){
        let started = false;
        let logIds = [];
        const logCollectorList = this.logCollector.list();
        const breakCollectorList = this.breakCollector.list();
        this.clearCollector();
        for(let item of logCollectorList){
            if(parseInt(item.date) >= parseInt(obj.fromDate) && this.date.monthIndex(obj.fromMonth) >= this.date.monthIndex(item.month) && started === false){
                this.logCollector.add(item);
                logIds.push(item?.id);
                started = true;
                if(parseInt(item.date) <= parseInt(obj.toDate) && this.date.monthIndex(obj.fromMonth) >= this.date.monthIndex(item.month)) break;
                continue;
            }else if(parseInt(item.date) >= parseInt(obj.toDate) && this.date.monthIndex(obj.fromMonth) >= this.date.monthIndex(item.month)){
                this.logCollector.add(item);
                logIds.push(item?.id);
                break;
            }
            if(started === true){
                this.logCollector.add(item);
                logIds.push(item?.id);
            }
        }
        for(let item of breakCollectorList){
            if(logIds.includes(item?.logId)){
                this.breakCollector.add(item);
            }
        }
    }

    async fetchByRange(obj, userId){
        this.clearCollector();
        /*for(let year of this.date.yearsWithinRange(obj.fromYear, obj.toYear)){
            for(let month of this.date.monthMiniWithinRange(obj.fromMonth, obj.toMonth)){
                this.buildLogs(await this.logLogic.getLogsByMonth(userId, month, year));
                this.buildBreaks(await this.breakLogic.getBreakByMonth(userId, month, year));
            }
        }*/
        const from = new Date(obj.fromYear, this.date.monthIndex(obj.fromMonth), obj.fromDate);
        const to = new Date(obj.toYear, this.date.monthIndex(obj.toMonth), obj.toDate);
        for (let d = from; d <= to; d.setDate(d.getDate() + 1)) {
            const dd = new Date(d);
            const month = this.date.monthMini(dd.getMonth());
            const year = `${dd.getFullYear()}`;
            console.log(month, year);
            this.buildLogs(await this.logLogic.getLogsByMonth(userId, month, year));
            this.buildBreaks(await this.breakLogic.getBreakByMonth(userId, month, year));
        }
        return this;
    }

    getLogs(){
        return this.logCollector;
    }

    getBreaks(){
        return this.breakCollector;
    }
}