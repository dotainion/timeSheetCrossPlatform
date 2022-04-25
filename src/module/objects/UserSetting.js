import { Validation } from "../../infrastructure/Validation";

export class UserSetting extends Validation{
    id = null;
    sheetId = null;
    spreadsheetId = null;
    
    setId(id){
        this.id = id;
    }

    setSheetId(sheetId){
        this.sheetId = sheetId;
    }

    setSpreadsheetId(spreadsheetId){
        this.spreadsheetId = spreadsheetId;
    }
}