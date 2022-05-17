import { Collector } from "../../infrastructure/Collector";
import { Responder } from "../../infrastructure/Responder";
import { ToastHandler } from "../../infrastructure/ToastHandler";



export class Spreadsheet extends ToastHandler{
    collector;
    responder;

    constructor(){
        super();
        this.collector = new Collector();
        this.responder = new Responder();
    }
    
    toJson(){
        return this.collector.list().map((sheet)=>{
            return { title: sheet.title() }
        });
    }
    
    async create(id, count=6){
        try{
            this.collector.clear();

            this.responder.post('/create/sheet', {
                //spreadsheetId: id,
                //sheets: this.toJson()
            });
        }catch(error){
            console.log(error);
        }
    }

    async update(){
        try{
            const response =  await this.responder.post('/update/sheet', {

            });
            this.success('Update successful.');
            return response;
        }catch(error){
            this.error('Did not update.');
        }
    }

    async clone(spreadsheetId, sheetId, option){
        try{
            if (!sheetId){
                return this.error('No sheet id found.');
            }
            if (!spreadsheetId){
                return this.error('No spreadsheet id found.');
            }
            const response = await this.responder.post('/copy/sheet', {
                calendarRange: {
                    from: {
                        month: option?.fromMonth, //2
                        year: option?.fromYear, //2022
                    },
                    to: {
                        month: option?.toMonth, //5
                        year: option?.toYear, //2022
                    },
                    sheetId,
                    spreadsheetId,
                }
            });
            return response;
        }catch(error){
            this.error('Unable to generate sheets.');
        }
    }

    async getSheet(title, spreadsheetId){
        try{
            const response =  await this.responder.post('/get/sheet', {
                title,
                spreadsheetId
            });
            return response;
        }catch(error){
            this.error('Unable to generate sheets.');
        }
    }

    async getSpreadsheet(spreadsheetId){
        try{
            return await this.responder.post('/get/spreadsheet', {
                spreadsheetId
            });
        }catch(error){
            this.error('Unable to get sheets.');
            return {error: error.message};
        }
    }
}