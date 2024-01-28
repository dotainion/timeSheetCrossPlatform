import { Validation } from "../../infrastructure/Validation";

export class UserAccount extends Validation{
    id = null;
    userId = null;
    accountId = null;

    setId(id){
        this.id = id;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setAccountId(accountId){
        this.accountId = accountId;
    }
}