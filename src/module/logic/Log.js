import { ToastHandler } from "../../infrastructure/ToastHandler";
import { LogFactory } from "../factory/LogFactory";
import { LogRepository } from "../repository/LogRepository";

export class Log extends ToastHandler{
    repo;
    factory;
    
    constructor(){
        super();
        this.repo = new LogRepository();
        this.factory = new LogFactory();
    }

    getLogsById(){

    }

    getLogInMonth(id, month, year){
        return this.repo.getLogInMonth(id, month, year);
    }
}