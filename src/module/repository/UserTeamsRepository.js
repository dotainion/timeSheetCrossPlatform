import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { TeamsFactory } from "../factory/TeamsFactory";
import { UserTeamsFactory } from "../factory/UserTeamsFactory";
import { UsersRepository } from "./UsersRepository";

export class UserTeamsRepository extends Repository{
    factory;
    
    constructor(){
        super();
        this.factory = new UserTeamsFactory();
    }

    async addUserTeam(data){
        return  this.factory.map(
            await this.addData(collection.userTeam, {
                userId: data.userId,
                teamId: data.teamId,
                accountId: data.accountId
            })
        );
    }

    async getUserTeam(userId){
        return this.factory.map(
            await this.getWhere(collection.userTeam, [
                {userId: userId}
            ])
        );
    }

    async getUserTeamByAccountId(accountId){
        return this.factory.map(
            await this.getWhere(collection.userTeam, [
                {accountId: accountId}
            ])
        );
    }

    async getUserTeamsByTeamId(teamId){
        return this.factory.map(
            await this.getWhere(collection.userTeam, [
                {teamId: teamId}
            ])
        );
    }
}