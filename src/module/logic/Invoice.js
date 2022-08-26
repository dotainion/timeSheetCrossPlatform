import shortid from "shortid";
import { Collector } from "../../infrastructure/Collector";
import { Responder } from "../../infrastructure/Responder";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { InvoiceData } from "../objects/InvoiceData";



export class Invoice extends InvoiceData{
    constructor(){
        super();
    }
    

    timeClock(logs){
        if(logs.length){
            this.setId(shortid.generate());
            this.setUserId(logs[0].userId);
            this.setDate(new Date().toLocaleDateString());
            logs.forEach((log)=>{
                this.addInvoice(log);
            });
        }
        return this;
    }
}