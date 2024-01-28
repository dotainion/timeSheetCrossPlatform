import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { AccountFactory } from "../factory/AccountFactory";
import { TeamsFactory } from "../factory/TeamsFactory";
import { UserTeamsFactory } from "../factory/UserTeamsFactory";
import { UsersRepository } from "./UsersRepository";

export class AccountRepository extends Repository{
    factory;
    
    constructor(){
        super();
        this.factory = new AccountFactory();
    }

    async addAccount(data){
        return  this.factory.map(
            await this.addData(collection.accounts, {
                name: data.name,
                clientId: data.clientId,
                description: data.description
            })
        );
    }

    async updateAccount(data){
        return  this.factory.map([
            await this.updateData(collection.accounts, {
                name: data.name,
                clientId: data.clientId,
                description: data.description
            }, data.id)
        ]);
    }

    async getAccountById(id){
        return this.factory.map([
            await this.getDataById(collection.accounts, id)
        ]);
    }

    async getAccounts(clientId){
        return this.factory.map(
            await this.getWhere(collection.accounts, [
                {clientId: clientId}
            ])
        );
    }
}