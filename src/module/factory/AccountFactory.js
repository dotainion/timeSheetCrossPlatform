import { Factory } from "../../infrastructure/Factory";
import { Account } from "../objects/Account";
import { Teams } from "../objects/Teams";
import { UserTeams } from "../objects/UserTeams";

export class AccountFactory extends Factory{
    mapResults(record){
        const account = new Account();
        account.setId(`${record?.['id']}`);
        account.setName(`${record?.['info']?.['name']}`);
        account.setClientId(`${record?.['info']?.['clientId']}`);
        account.setDescription(`${record?.['info']?.['description']}`);
        return account;
    }
}