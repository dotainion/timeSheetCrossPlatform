import { Collector } from "../../infrastructure/Collector";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { AccountFactory } from "../factory/AccountFactory";
import { TeamsFactory } from "../factory/TeamsFactory";
import { AccountRepository } from "../repository/AccountRepository";
import { TeamsRepository } from "../repository/TeamsRepository";
import { UserAccountRepository } from "../repository/UserAccountRepository";
import { UserTeamsRepository } from "../repository/UserTeamsRepository";
import { UserAccount } from "./UserAccount";

export class Account extends ToastHandler{
    repo;
    factory;

    constructor(){
        super();
        this.userAccount = new UserAccount();
        this.repo = new AccountRepository();
        this.factory = new AccountFactory();
    }

    async addAccount(data){
        const account = this.factory.mapResults({
            id: null,
            info: {
                name: data.name,
                clientId: data.clientId,
                description: data?.description || ''
            }
        });
        return await this.repo.addAccount(account);
    }

    async updateAccount(data){
        const account = this.factory.mapResults({
            id: data.id,
            info: {
                name: data.name,
                clientId: data.clientId,
                description: data?.description || ''
            }
        });
        return await this.repo.updateAccount(account);
    }
    
    async getUserAccount(userId){
        try{
            const collector = new Collector();
            const collect = await this.userAccount.getUserAccount(userId);
            for(let item of collect.list()){
                const account = await this.repo.getAccountById(item.accountId);
                if(account.hasItems()) collector.add(account.first());
            }
            return collector;
        }catch(error){
            return this.error(error.message);
        }
    }
    
    async getUserAccountByClient(clientId){
        try{
            return  await this.repo.getAccounts(clientId);
        }catch(error){
            return this.error(error.message);
        }
    }
    
    async getAccountById(accountId){
        try{
            return await this.repo.getAccountById(accountId);
        }catch(error){
            return this.error(error.message);
        }
    }
}