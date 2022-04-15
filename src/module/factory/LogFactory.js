import { Factory } from "../../infrastructure/Factory";
import { Log } from "../objects/Log";
import { Users } from "../objects/Users";

export class LogFactory extends Factory{
    mapResults(record){
        const log = new Log();
        log.setId(record?.['id'] || '');
        log.setDay(record?.['info']?.['day'] || '');
        log.setMonth(record?.['info']?.['month'] || '');
        log.setYear(record?.['info']?.['year'] || '');
        log.setWeek(record?.['info']?.['week'] || '');
        log.setStartTime(record?.['info']?.['startTime'] || '');
        log.setEndTime(record?.['info']?.['endTime'] || '');
        return log;
    }
}