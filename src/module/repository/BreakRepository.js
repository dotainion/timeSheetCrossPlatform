import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { BreakFactory } from "../factory/BreakFactory";


export class BreakRepository extends Repository{
    factory;

    constructor(){
        super();
        this.factory = new BreakFactory();
    }

    async startBreak(breaks){
        return this.factory.map(
            await this.addData(collection.break, {
                logId: breaks.logId,
                userId: breaks.userId,
                startBreak: breaks.startBreak,
                endBreak: breaks.endBreak,
                timestamp: breaks.timestamp
            })
        );
    }

    async endBreak(logId, endBreak){
        await this.updateDataWhere(collection.break, {
            endBreak: endBreak,
        }, [
            { logId }, 
            { endBreak: 'pending' }
        ]);
    }

    async getPendingBreak(logId){
        return this.factory.map(
            await this.getWhere(collection.break, [
                { logId: logId },
                { endBreak: 'pending' }
            ])
        )
    }

    async getBreakByTimestamp(userId, queryObj){
        return this.factory.map(
            await this.getWhereTimestampRange(
                collection.break, 
                queryObj.fromInt, 
                queryObj.toInt, 
                userId
            )
        )
    }

    async updateBreak(startBreak, endBreak, beakId){
        return this.factory.map([
            await this.updateData(collection.break, {
                startBreak: startBreak, 
                endBreak: endBreak
            }, beakId)
        ]);
    }

    async deleteBreak(beakId){
        return this.factory.map([
            await this.deleteData(collection.break, beakId)
        ]);
    }
}