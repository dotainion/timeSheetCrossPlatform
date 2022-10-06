import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { RegistrationFactory } from "../factory/RegistrationFactory";

export class RegistrationRepository extends Repository{
    factory;

    constructor(){
        super();
        this.factory = new RegistrationFactory();
    }

    async getRegistrations(){
        return this.factory.map(
            await this.getWhere(collection.registration)
        );
    }

    async markAsComplete(regId){
        await this.updateData(collection.registration, {used: true}, regId);
    }
}