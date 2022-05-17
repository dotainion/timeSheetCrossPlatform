import { collection } from "../../infrastructure/config/databaseConfig";
import { Repository } from "../../infrastructure/Repository";
import { BreakFactory } from "../factory/BreakFactory";
import { LogFactory } from "../factory/LogFactory";


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
                month: breaks.month,
                year: breaks.year,
                startBreak: breaks.startBreak,
                endBreak: breaks.endBreak,
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

    async getBreakByMonth(userId, month, year){
        return this.factory.map(
            await this.getWhere(collection.break, [
                { userId },
                { month },
                { year }
            ])
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