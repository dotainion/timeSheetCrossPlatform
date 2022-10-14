import { ToastHandler } from "../../infrastructure/ToastHandler";
import { TeamsFactory } from "../factory/TeamsFactory";
import { TeamsRepository } from "../repository/TeamsRepository";

export class Teams extends ToastHandler{
    repo;
    factory;

    constructor(){
        super();
        this.repo = new TeamsRepository();
        this.factory = new TeamsFactory();
    }
    
    async getByClientId(clientId){
        try{
            const team = await this.repo.getTeamsByClientId(clientId);
            return team.list();
        }catch(error){
            return this.error(error.message);
        }
        
    }
    
    async getById(id){
        try{
            const team = await this.repo.getTeamById(id);
            return team.first();
        }catch(error){
            return this.error(error.message);
        }
        
    }

    async add(name, clientName, description, image, clientId){
        try{
            if(!name){
                throw new Error('Name field is required.');
            };
            const collector = this.factory.mapResults({
                id: null,
                info: {
                    name: name,
                    clientName: clientName,
                    image: image,
                    description: description,
                    clientId: clientId
                }
            });
            const object = await this.repo.addTeams(collector);
            this.success(`Team "${name}" added successfuly.`);
            return object.first();
        }catch(error){
            return this.error(error.message);
        }
    }

    async updateTeam(data, teamId){
        try{
            const response = await this.repo.updateTeam(data, teamId);
            this.success('Update successfully.');
            return response;
        }catch(error){
            return this.error(error.message);
        }
    }

    delete(uuid){
        this.repo.deleteTeam(uuid);
    }
}