import { Factory } from "../../infrastructure/Factory";
import { Teams } from "../objects/Teams";
import { UserAccount } from "../objects/UserAccount";
import { UserTeams } from "../objects/UserTeams";

export class UserAccountFactory extends Factory{
    mapResults(record){
        const account = new UserAccount();
        account.setId(`${record?.['id']}`);
        account.setUserId(`${record?.['info']?.['userId']}`);
        account.setAccountId(`${record?.['info']?.['accountId']}`);
        return account;
    }
}