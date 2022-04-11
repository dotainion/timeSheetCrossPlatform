import { Validation } from "../../infrastructure/Validation";

export class Users extends Validation{
    _id = null;
    _clientId = null;
    _email = null;
    _firstName = null;
    _lastName = null;
    _image = null;
    _role = null;
    _supervisorId = null;
    _teamId = null;
    _gender = null;
    _number = null;

    id(){
        return this._id;
    }

    gender(){
        return this._gender;
    }

    number(){
        return this._number;
    }

    clientId(){
        return this._clientId;
    }

    teamId(){
        return this._teamId;
    }

    email(){
        return this._email;
    }

    firstName(){
        return this._firstName;
    }

    lastName(){
        return this._lastName;
    }

    image(){
        return this._image;
    }

    role(){
        return this._role;
    }

    supervisorId(){
        return this._supervisorId;
    }

    setGender(gender){
        this._gender = gender;
    }

    setNumber(number){
        this._number = number;
    }

    setClientId(clientId){
        this._clientId = clientId;
    }

    setEmail(email){
        if (email && !this.isEmailValid(email)){
            throw new Error('Invalid email.');
        }
        this._email = email;
    }

    setFirstName(firstName){
        this._firstName = firstName;
    }

    setLastName(lastName){
        this._lastName = lastName;
    }
    
    setImage(image){
        this._image = image;
    }

    setRole(role){
        this._role = role;
    }

    setSupervisorId(supervisorId){
        this._supervisorId = supervisorId;
    }

    setTeamId(teamId){
        this._teamId = teamId;
    }

    setId(id){
        this._id = id;
    }

    hasId(){
        if (this.id()) return true;
        return false;
    }
}