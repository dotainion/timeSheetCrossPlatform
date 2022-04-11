import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { UsersFactory } from "../factory/UsersFactory";

export class UserSettingRepository extends Repository{
    factory;

    constructor(){
        super();
        this.factory = new UsersFactory();
    }

    async addSetting(data, uuid){
        await this.addData(collection.settings, data, uuid);
    }
}