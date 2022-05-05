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
    
    async get(){
        try{
            const team = await this.repo.getTeams()
            return team.list();
        }catch(error){
            return this.error(error.message);
        }
        
    }
    
    async getById(id){
        try{
            const team = await this.repo.getTeamById(id)
            return team.first();
        }catch(error){
            return this.error(error.message);
        }
        
    }

    async add(name, description, image){
        try{
            if(!name){
                throw new Error('Name field is required.');
            };

            const collector = this.factory.mapResults({
                info: {
                    name: name,
                    image: image,
                    description: description
                },
                id: null
            });

            const object = await this.repo.addTeams(collector);

            collector.setId(object.id);

            this.success(`Team "${name}" added successfuly.`);
            return collector;
        }catch(error){
            return this.error(error.message);
        }
    }

    delete(uuid){
        this.repo.deleteTeam(uuid);
    }
}