import { Collector } from "../../infrastructure/Collector";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { UsersFactory } from "../factory/UsersFactory";
import { TeamsRepository } from "../repository/TeamsRepository";
import { UsersRepository } from "../repository/UsersRepository";
import { UserAccount } from "./UserAccount";
import { UserTeams } from "./UserTeams";

export class Users extends ToastHandler{
    repo;
    factory;
    userTeamRepo;
    
    constructor(){
        super();
        this.repo = new UsersRepository();
        this.factory = new UsersFactory();
        this.userTeamRepo = new UserTeams();
    }

    async getByAccountId(accountId){
        try{
            const collector = new Collector();
            const userAccount = new UserAccount();
            const users = await userAccount.getUserAccountByAccountId(accountId);
            for(let usr of users.list()){
                const user = await this.repo.getUserById(usr?.userId);
                user.hasItems() && collector.add(user.first());
            }
            
            return collector;
        }catch(error){
            return this.error(error.message);
        }
    }

    async getById(id){
        try{
            const user = await this.repo.getUserById(id);
            return user.first();
        }catch(error){
            return this.error(error.message);
        }
    }

    async getByTeamId(teamId){
        try{
            const collector = new Collector();
            const userTeamCollector = await this.userTeamRepo.getUserTeamsByTeamId(teamId);
            console.log(userTeamCollector.list());
            for(let usrTeam of userTeamCollector.list()){
                const userCollector = await this.repo.getUserById(usrTeam.userId);
                userCollector.hasItems() && collector.add(userCollector.first());
            }
            
            return collector;
        }catch(error){
            return this.error(error.message);
        }
    }

    async add(data){
        try{
            const user = this.factory.mapResults({info: data, id: data.id});
            const collector = await this.repo.addUser(user);
            this.success(`${data.firstName} was added successfully`);
            return collector;
        }catch(error){
            return this.error(error.message);
        }
    }

    async addWithId(data, id){
        try{
            const user = this.factory.mapResults({info: data,id: id});
            const response = await this.repo.addUserWithId(user, user.id);
            this.success('Add successfully.');
            return response;
        }catch(error){
            return this.error(error.message);
        }
    }

    async updateUser(data, id){
        try{
            await this.repo.updateUserById(data, id);
            this.success('Update successfully.');
        }catch(error){
            return this.error(error.message);
        }
    }

    delete(id){
        try{
            this.repo.deleteUser(id);
        }catch(error){
            return this.error(error.message);
        }
    }

    deleteByTeam(teamId){
        try{
            this.repo.deleteUserByTeam(teamId);
        }catch(error){
            return this.error(error.message);
        }
    }
}