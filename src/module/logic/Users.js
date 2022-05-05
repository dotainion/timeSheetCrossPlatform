import { ToastHandler } from "../../infrastructure/ToastHandler";
import { UsersFactory } from "../factory/UsersFactory";
import { TeamsRepository } from "../repository/TeamsRepository";
import { UsersRepository } from "../repository/UsersRepository";

export class Users extends ToastHandler{
    repo;
    factory;
    
    constructor(){
        super();
        this.repo = new UsersRepository();
        this.factory = new UsersFactory();
    }

    async get(){
        try{
            const user = await this.repo.getUsers()
            return user.list();
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

    async getByTeamId(id){
        try{
            const user = await this.repo.getUsersByTeamId(id);
            return user.list();
        }catch(error){
            return this.error(error.message);
        }
    }

    async add(clientId, email, firstName, lastName, image, role, supervisorId, teamId, number, gender){
        try{
            const collector = this.factory.mapResults({
                info: {
                    clientId: clientId,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    image: image,
                    role: role,
                    supervisorId: supervisorId,
                    teamId: teamId,
                    number: number,
                    gender: gender
                },
                id: null
            });

            const record = await this.repo.addUser(collector);
            collector.setId(record.id);
            this.success(`${firstName} was added successfully`);
            return collector;
        }catch(error){
            return this.error(error.message);
        }
    }

    async addWithId(data, id){
        try{
            const response = await this.repo.addUserWithId(data, id);
            this.success('Add successfully.');
            return response;
        }catch(error){
            return this.error(error.message);
        }
    }

    async updateUser(data, id){
        try{
            const response = await this.repo.updateUserById(data, id);
            this.success('Update successfully.');
            return response;
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