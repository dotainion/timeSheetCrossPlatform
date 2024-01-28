import { Collector } from "../../infrastructure/Collector";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { TeamsFactory } from "../factory/TeamsFactory";
import { UserAccountFactory } from "../factory/UserAccountFactory";
import { AccountRepository } from "../repository/AccountRepository";
import { TeamsRepository } from "../repository/TeamsRepository";
import { UserAccountRepository } from "../repository/UserAccountRepository";
import { UserTeamsRepository } from "../repository/UserTeamsRepository";

export class UserAccount extends ToastHandler{
    repo;
    factory;

    constructor(){
        super();
        this.repo = new UserAccountRepository();
        this.factory = new UserAccountFactory();
    }
    
    async getUserAccount(userId){
        try{
            return await this.repo.getUserAccunts(userId);
        }catch(error){
            return this.error(error.message);
        }
    }
    
    async getUserAccountByAccountId(accountId){
        try{
            return await this.repo.getUserAccountByAccountId(accountId);
        }catch(error){
            return this.error(error.message);
        }
    }

    async addUserAccount(userId, accountId){
        try{
            const userAccount = this.factory.mapResults({
                id: null,
                info: {userId, accountId}
            });
            return await this.repo.addUserAccont(userAccount);
        }catch(error){
            return this.error(error.message);
        }
    }
}