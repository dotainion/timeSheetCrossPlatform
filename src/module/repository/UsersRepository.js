import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { UsersFactory } from "../factory/UsersFactory";

export class UsersRepository extends Repository{
    factory;

    constructor(){
        super();
        this.factory = new UsersFactory();
    }

    async getUsers(){
        return this.factory.map(
            await this.getData(collection.user)
        )
    }

    async getUserById(id){
        return this.factory.map([
            await this.getDataById(collection.user, id)
        ])
    }

    async getUsersByTeamId(id){
        return this.factory.map(
            await this.getDataByField(collection.user, 'teamId', id)
        )
    }

    async addUser(collector){
        return await this.addData(collection.user, {
            clientId: collector.clientId(),
            email: collector.email(),
            firstName: collector.firstName(),
            lastName: collector.lastName(),
            image: collector.image(),
            role: collector.role(),
            supervisorId: collector.supervisorId(),
            teamId: collector.teamId(),
            number: collector.number(),
            gender: collector.gender()
        });
    }

    async updateUserById(data, uuid){
        return await this.updateData(collection.user, data, uuid);
    }

    async addUserWithId(data, uuid){
        return await this.addData(collection.user, data, uuid);
    }

    async deleteUser(id){
        this.deleteData(collection.user, id);
    }

    async deleteUsersByTeam(teamId){
        this.deleteDatasByField(collection.user, 'teamId', teamId);
    }
}