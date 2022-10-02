import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { UserSettingFactory } from "../factory/UserSettingFactory";
import { UsersFactory } from "../factory/UsersFactory";

export class UserSettingRepository extends Repository{
    factory;

    constructor(){
        super();
        this.factory = new UserSettingFactory();
    }

    async addSetting(setting){
        return await this.addData(collection.settings, {
            sheetId: setting.sheetId,
            spreadsheetId: setting.spreadsheetId,
            clientId: setting.clientId,
            url: setting.url
        }, setting.id);
    }

    async getSetting(uuid){
        return this.factory.map([
            await this.getDataById(collection.settings, uuid)
        ]);
    }

    async getSettings(clientId){
        return this.factory.map(
            await this.getWhere(collection.settings,  [{clientId}])
        );
    }
}