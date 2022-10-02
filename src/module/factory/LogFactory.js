import { Factory } from "../../infrastructure/Factory";
import { Log } from "../objects/Log";
import { Users } from "../objects/Users";

export class LogFactory extends Factory{
    mapResults(record){
        const log = new Log();
        log.setId(`${record?.['id']}`);
        log.setUserId(`${record?.['info']['userId']}`);
        log.setStartTime(`${record?.['info']?.['startTime']}`);
        log.setEndTime(`${record?.['info']?.['endTime']}`);
        log.setTimestamp(record?.['info']?.['timestamp']);
        return log;
    }
}