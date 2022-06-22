import { Factory } from "../../infrastructure/Factory";
import { QueryDate } from "../objects/QueryDate";


export class QueryDateFactory extends Factory{
    mapResults(record){
        const query = new QueryDate();
        query.setToWeek(`${record['toWeek']}` || '');
        query.setToDate(`${record['toDate']}` || '');
        query.setFromWeek(`${record['fromWeek']}` || '');
        query.setFromDate(`${record['fromDate']}` || '');
        query.setToYear(`${record['toYear']}` || '');
        query.setToMonth(`${record['toMonth']}` || '');
        query.setFromYear(`${record['fromYear']}` || '');
        query.setFromMonth(`${record['fromMonth']}` || '');
        query.setFrom(record['from'] || '');
        query.setTo(record['to'] || '');
        query.setFromInt(record['fromInt'] || '');
        query.setToInt(record['toInt'] || '');
        return query;
    }
}