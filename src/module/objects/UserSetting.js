import { Validation } from "../../infrastructure/Validation";

export class UserSetting extends Validation{
    id = null;
    url = null;
    sheetId = null;
    clientId = null;
    spreadsheetId = null;
    
    setId(id){
        this.id = id;
    }
    
    setUrl(url){
        this.url = url;
    }

    setSheetId(sheetId){
        this.sheetId = sheetId;
    }

    setClientId(clientId){
        this.clientId = clientId;
    }

    setSpreadsheetId(spreadsheetId){
        this.spreadsheetId = spreadsheetId;
    }
}