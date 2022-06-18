import { ToastHandler } from "../../infrastructure/ToastHandler";
import { LogFactory } from "../factory/LogFactory";
import { LogRepository } from "../repository/LogRepository";
import { DateHelper } from '../../infrastructure/DateHelper'
import { QueryDateFactory } from "../factory/QueryDateFactory";

export class QueryDate extends ToastHandler{
    factory;
    
    constructor(){
        super();
        this.factory = new QueryDateFactory();
    }

    sanitize(date){
        try{            
            return this.factory.mapResults(date);
        }catch(error){
            console.log(error)
            this.error('Date Picker error.');
        }
    }
}