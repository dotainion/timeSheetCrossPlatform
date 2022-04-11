import { ToastHandler } from "../../infrastructure/ToastHandler";
import { UsersFactory } from "../factory/UsersFactory";
import { TeamsRepository } from "../repository/TeamsRepository";
import { UserSettingRepository } from "../repository/UserSettingRepository copy";
import { UsersRepository } from "../repository/UsersRepository";

export class UserSetting extends ToastHandler{
    repo;
    factory;
    
    constructor(){
        super();
        this.repo = new UserSettingRepository();
    }

    delete(data, id){
        this.repo.addSetting(data, id);
    }
}