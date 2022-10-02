import { Factory } from "../../infrastructure/Factory";
import { Teams } from "../objects/Teams";

export class TeamsFactory extends Factory{
    mapResults(record){
        const teams = new Teams();
        teams.setId(`${record?.['id']}`);
        teams.setName(`${record?.['info']?.['name']}`);
        teams.setImage(`${record?.['info']?.['image']}`);
        teams.setClientId(`${record?.['info']?.['clientId']}`);
        teams.setDescription(`${record?.['info']?.['description']}`);
        return teams;
    }
}