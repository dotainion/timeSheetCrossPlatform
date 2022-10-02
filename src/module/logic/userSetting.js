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
        try{
            const collector = this.factory.mapResults({
                id: uuid,
                info: {
                    sheetId: data?.sheetId ||'',
                    spreadsheetId: data?.spreadsheetId ||'',
                    clientId: data?.clientId || '',
                    url: data?.url || ''
                }
            });
            await this.repo.addSetting(collector);
        }catch(error){
            this.error(error.message);
        }
    }

    async getSetting(uuid){
        try{
            return await (await this.repo.getSetting(uuid)).first();
        }catch(error){
            this.error(error.message);
        }
    }

    async getSettings(clientId){
        try{
            return await this.repo.getSettings(clientId);
        }catch(error){
            this.error(error.message);
        }
    }
}