import { Collector } from "../../infrastructure/Collector";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { TeamsFactory } from "../factory/TeamsFactory";
import { UserTeamsFactory } from "../factory/UserTeamsFactory";
import { TeamsRepository } from "../repository/TeamsRepository";
import { UserTeamsRepository } from "../repository/UserTeamsRepository";

export class UserTeams extends ToastHandler{
    repo;
    factory;

    constructor(){
        super();
        this.repo = new UserTeamsRepository();
        this.factory = new UserTeamsFactory();
    }

    async addUserTeam(teamId, userId, accountId){
        try{
            const userTeam = this.factory.mapResults({
                id: null,
                info: {teamId, userId, accountId}
            });
            return await this.repo.addUserTeam(userTeam);
        }catch(error){
            return this.error(error.message);
        }
    }
    
    async getUserTeamsByAccountId(accountId){
        try{
            return await this.repo.getUserTeamByAccountId(accountId);
        }catch(error){
            return this.error(error.message);
        }
    }
    
    async getUserTeamsByTeamId(teamId){
        try{
            return await this.repo.getUserTeamsByTeamId(teamId);
        }catch(error){
            return this.error(error.message);
        }
    }
    
    async getUserTeam(userId){
        try{
            return await this.repo.getUserTeam(userId);
        }catch(error){
            return this.error(error.message);
        }
    }
}