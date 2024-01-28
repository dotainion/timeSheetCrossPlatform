import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { TeamsFactory } from "../factory/TeamsFactory";
import { UserAccountFactory } from "../factory/UserAccountFactory";
import { UserTeamsFactory } from "../factory/UserTeamsFactory";
import { UsersRepository } from "./UsersRepository";

export class UserAccountRepository extends Repository{
    factory;
    
    constructor(){
        super();
        this.factory = new UserAccountFactory();
    }

    async addUserAccont(data){
        return  this.factory.map(
            await this.addData(collection.userAccount, {
                userId: data.userId,
                accountId: data.accountId
            })
        );
    }

    async getUserAccunts(userId){
        return this.factory.map(
            await this.getWhere(collection.userAccount, [
                {userId: userId}
            ])
        );
    }

    async getUserAccountByAccountId(accountId){
        return this.factory.map(
            await this.getWhere(collection.userAccount, [
                {accountId: accountId}
            ])
        );
    }
}