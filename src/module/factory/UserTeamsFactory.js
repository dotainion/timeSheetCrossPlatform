import { Factory } from "../../infrastructure/Factory";
import { Teams } from "../objects/Teams";
import { UserTeams } from "../objects/UserTeams";

export class UserTeamsFactory extends Factory{
    mapResults(record){
        const userTeams = new UserTeams();
        userTeams.setId(`${record?.['id']}`);
        userTeams.setTeamId(`${record?.['info']?.['teamId']}`);
        userTeams.setUserId(`${record?.['info']?.['userId']}`);
        userTeams.setAccountId(`${record?.['info']?.['accountId']}`);
        return userTeams;
    }
}