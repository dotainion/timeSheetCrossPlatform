import { Factory } from "../../infrastructure/Factory";
import { Users } from "../objects/Users";

export class UsersFactory extends Factory{
    mapResults(record){
        const users = new Users();
        users.setId(`${record?.['id']}`);
        users.setClientId(`${record?.['info']?.['clientId']}`);
        users.setEmail(`${record?.['info']?.['email']}`);
        users.setFirstName(`${record?.['info']?.['firstName']}`);
        users.setImage(`${record?.['info']?.['image']}`);
        users.setLastName(`${record?.['info']?.['lastName']}`);
        users.setRole(`${record?.['info']?.['role']}`);
        users.setSupervisorId(`${record?.['info']?.['supervisorId']}`);
        users.setTeamId(`${record?.['info']?.['teamId']}`);
        users.setGender(`${record?.['info']?.['gender']}`);
        users.setNumber(`${record?.['info']?.['number']}`);
        return users;
    }
}