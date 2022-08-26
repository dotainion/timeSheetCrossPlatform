import { Factory } from "../../infrastructure/Factory";
import { Break } from "../objects/Break";
import { Invoice } from "../objects/Invoice";
import { Log } from "../objects/Log";
import { Users } from "../objects/Users";

export class InvoiceFactory extends Factory{
    mapResults(record){
        const invoice = new Invoice();
        invoice.setId(`${record?.['id']}` || '');
        invoice.setDate(`${record?.['info']['date']}` || '');
        invoice.setStartTime(`${record?.['info']['startTime']}` || '');
        invoice.setEndTime(`${record?.['info']['endTime']}` || '');
        return invoice;
    }
}