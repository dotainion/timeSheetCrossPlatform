import { ToastHandler } from "../../infrastructure/ToastHandler";
import { UserSettingFactory } from "../factory/UserSettingFactory";
import { UserSettingRepository } from "../repository/UserSettingRepository";


export class UserSetting extends ToastHandler{
    repo;
    factory;
    
    constructor(){
        super();
        this.repo = new UserSettingRepository();
        this.factory = new UserSettingFactory();
    }

    async addSetting(data, uuid){
        const collector = this.factory.mapResults({
            id: uuid,
            info: {
                sheetId: data?.sheetId,
                spreadsheetId: data?.spreadsheetId,
            }
        });
        await this.repo.addSetting(collector);
    }

    async getSetting(uuid){
        return await this.repo.getSetting(uuid);
    }
}