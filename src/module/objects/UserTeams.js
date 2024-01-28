import { Validation } from "../../infrastructure/Validation";

export class UserTeams extends Validation{
    id = null;
    teamId = null;
    userId = null;
    accountId = null;

    setId(id){
        this.id = id;
    }

    setTeamId(teamId){
        this.teamId = teamId;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setAccountId(accountId){
        this.accountId = accountId;
    }
}