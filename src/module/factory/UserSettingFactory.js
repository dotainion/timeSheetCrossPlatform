import { Factory } from "../../infrastructure/Factory";
import { Users } from "../objects/Users";
import { UserSetting } from "../objects/UserSetting";

export class UserSettingFactory extends Factory{
    mapResults(record){
        const setting = new UserSetting();
        setting.setId(`${record?.['id']}` || '');
        setting.setSheetId(`${record?.['info']?.['sheetId']}` || '');
        setting.setClientId(`${record?.['info']?.['clientId']}` || '');
        setting.setSpreadsheetId(`${record?.['info']?.['spreadsheetId']}` || '');
        return setting;
    }
}