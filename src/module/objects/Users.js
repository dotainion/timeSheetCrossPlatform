import { Roles } from "../../infrastructure/Roles";
import { Validation } from "../../infrastructure/Validation";

export class Users extends Validation{
    id = null;
    clientId = null;
    email = null;
    firstName = null;
    lastName = null;
    image = null;
    role = null;
    supervisorId = null;
    teamId = null;
    gender = null;
    number = null;

    supervisorId(){
        return this.supervisorId;
    }

    setGender(gender){
        this.gender = gender;
    }

    setNumber(number){
        this.number = number;
    }

    setClientId(clientId){
        this.clientId = clientId;
    }

    setEmail(email){
        if (email && !this.isEmailValid(email)){
            throw new Error('Invalid email.');
        }
        this.email = email;
    }

    setFirstName(firstName){
        if (!firstName){
            throw new Error('Invalid first name.');
        }
        this.firstName = firstName;
    }

    setLastName(lastName){
        if (!lastName){
            throw new Error('Invalid last name.');
        }
        this.lastName = lastName;
    }
    
    setImage(image){
        this.image = image;
    }

    setRole(role){
        console.log(role)
        if (! (new Roles()).includes(role)){
            throw new Error('A role was not specified.');
        }
        this.role = role;
    }

    setSupervisorId(supervisorId){
        this.supervisorId = supervisorId;
    }

    setTeamId(teamId){
        this.teamId = teamId;
    }

    setId(id){
        this.id = id;
    }

    hasId(){
        if (this.id()) return true;
        return false;
    }
}