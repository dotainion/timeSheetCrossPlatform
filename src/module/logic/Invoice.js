import { Collector } from "../../infrastructure/Collector";
import { Responder } from "../../infrastructure/Responder";
import { ToastHandler } from "../../infrastructure/ToastHandler";



export class Invoice extends ToastHandler{
    collector;
    responder;

    constructor(){
        super();
        this.collector = new Collector();
        this.responder = new Responder();
    }
    
    getInvoice(){
        try{
        this.responder.post('/invoice', {
            tables: [
                {
                    weekDate: '01/10/2022',
                    agent: 'Mallon blair',
                    client: 'cliente enterprise',
                    tHead: ['Date', 'Day', 'Time In', 'Time Out', 'Total Hours'],
                    tRows: [
                        ['01/25/2022', 'Monday', '3:00 PM', '7:00 PM', 'total'],
                        ['01/25/2022', 'Tuesday', '3:00 PM', '7:00 PM', 'total'],
                        ['01/25/2022', 'Wednesday', '3:00 PM', '7:00 PM', 'total'],
                        ['01/25/2022', 'Thursday', '3:00 PM', '7:00 PM', 'total'],
                        ['01/25/2022', 'Friday', '3:00 PM', '7:00 PM', 'total'],
                    ]
                }
            ]
        });
        }catch(error){
            this.error('')
        }
    }
}