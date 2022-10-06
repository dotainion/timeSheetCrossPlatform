import { Factory } from "../../infrastructure/Factory";
import { Registration } from "../objects/Registration";

export class RegistrationFactory extends Factory{
    mapResults(record){
        const register = new Registration();
        register.setId(`${record?.['id']}`);
        register.setKey(`${record?.['info']?.['key']}`);
        register.setUsed(`${record?.['info']?.['used']}`);
        return register;
    }
}