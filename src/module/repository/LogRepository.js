import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { LogFactory } from "../factory/LogFactory";

export class LogRepository extends Repository{
    factory;

    constructor(){
        super();
        this.factory = new LogFactory();
    }

    async startTime(log){
        return this.factory.map(
            await this.addData(collection.logs, {
                userId: log.userId,
                startTime: log.startTime,
                endTime: log.endTime,
                timestamp: log.timestamp
            })
        );
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

    async getLogsByTimestamp(userId, queryObj){
        return this.factory.map(
            await this.getWhereTimestampRange(
                collection.logs, 
                queryObj.fromInt, 
                queryObj.toInt, 
                userId
            )
        );
    }

    async updateTime(log){
        return this.factory.map([
            await this.updateData(collection.logs, {
                userId: log.userId,
                startTime: log.startTime,
                endTime: log.endTime,
                timestamp: log.timestamp
            }, log.id)
        ]);
    }
}