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
        return query;
    }
}