import { Collector } from "../../infrastructure/Collector";
import { Validation } from "../../infrastructure/Validation";
import { InvoiceFactory } from "../factory/InviceFactory";

export class InvoiceData extends Collector{
    id = null;
    userId = null;
    date = null;

    constructor(){
        super();
        this.factory = new InvoiceFactory();
    }

    setId(id){
        this.id = id;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setDate(date){
        this.date = date;
    }

    addInvoice(invoice){
        let timestamp = null;
        if(invoice.timestamp){
            timestamp = new Date(invoice.timestamp).toLocaleDateString();
        }
        this.add(
            this.factory.mapResults({
                id: invoice.id,
                info: {
                    startTime: invoice.startTime,
                    endTime: invoice.endTime,
                    date: timestamp
                }
            })
        );
    }
}