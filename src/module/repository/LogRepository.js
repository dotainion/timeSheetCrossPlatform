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

    async startTime(log){
        return this.factory.map([
            await this.addData(collection.logs, {
                date: log.date,
                month: log.month,
                year: log.year,
                week: log.week,
                userId: log.userId,
                startTime: log.startTime,
                endTime: log.endTime,
            })
        ])
    }

    async endTime(userId, endTime){
        await this.updateDataWhere(collection.logs, {
            endTime: endTime,
        }, [
            { userId }, 
            {'endTime': 'pending'}
        ]);
    }

    async getPendingLog(userId){
        return this.factory.map(
            await this.getWhere(collection.logs, [
                { userId }, 
                { endTime: 'pending' }, 
            ])
        )
    }

    async getLogsByMonth(userId, month, year){
        return this.factory.map(
            await this.getWhere(collection.logs, [
                { userId }, 
                { month }, 
                { year }
            ])
        )
    }
}