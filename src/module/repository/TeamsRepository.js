import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { TeamsFactory } from "../factory/TeamsFactory";
import { UsersRepository } from "./UsersRepository";

export class TeamsRepository extends Repository{
    factory;
    
    constructor(){
        super();
        this.factory = new TeamsFactory();
        this.userRepo = new UsersRepository();
    }

    async getTeams(){
        return this.factory.map(
            await this.getWhere(collection.teams)
        );
    }

    async getTeamById(id){
        return this.factory.map([
            await this.getDataById(collection.teams, id)
        ]);
    }

    async addTeams(collector){
        return  this.factory.map(
            await this.addData(collection.teams, {
                name: collector.name,
                image: collector.image,
                description: collector.description
            })
        );
    }

    async deleteTeam(uuid, deleteTeam=false){
        await this.deleteData(collection.teams, uuid);
        if (deleteTeam){
            await this.userRepo.deleteUsersByTeam(uuid);
        }
    }
}