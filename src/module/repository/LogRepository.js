import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { LogFactory } from "../factory/LogFactory";
import { UsersFactory } from "../factory/UsersFactory";

export class LogRepository extends Repository{
    factory;

    constructor(){
        super();
        this.factory = new LogFactory();
    }

    async getLogsByMonth(month, year){
        return this.factory.map(
            await this.getWhere(collection.user, [
                { month }, 
                { year }
            ])
        )
    }
}