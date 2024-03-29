import { Factory } from "../../infrastructure/Factory";
import { Break } from "../objects/Break";
import { Log } from "../objects/Log";
import { Users } from "../objects/Users";

export class BreakFactory extends Factory{
    mapResults(record){
        const log = new Break();
        log.setId(`${record?.['id']}`);
        log.setUserId(`${record?.['info']['userId']}`);
        log.setLogId(`${record?.['info']['logId']}`);
        log.setStartBreak(`${record?.['info']?.['startBreak']}`);
        log.setEndBreak(`${record?.['info']?.['endBreak']}`);
        log.setTimestamp(record?.['info']?.['timestamp']);
        return log;
    }
}