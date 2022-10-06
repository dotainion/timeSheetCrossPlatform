import { ToastHandler } from "../../infrastructure/ToastHandler";
import { RegistrationRepository } from "../repository/RegistrationRepository";
import $ from 'jquery';

export class Registration extends ToastHandler{   
    repo = null;
    collector = null;
    keyElement = null;
    storageKey = 'registration-key';

    constructor(){
        super();
        this.repo = new RegistrationRepository();
    }

    async initializeRegistration(keyElement){
        this.isValidElement(keyElement);
        this.keyElement = $(keyElement);
        this.collector = await this.repo.getRegistrations();
        return this;
    }

    isValidElement(element){
        if(element instanceof $ || element?.nodeType === Node.ELEMENT_NODE){
            return true;
        }
        throw new Error('Invalid element passed in constructor of Registration in logic.');
    }

    find(){
        for(let reg of this.collector.list()){
            if(reg.key === this.keyElement.val()) return reg;
        }
        return null;
    }

    hasMatch(){
        if(this.find() !== null) return true;
        this.warning('Invalid Registration key.');
        return false;
    }

    markComplete(){
        const reg = this.find();
        if(reg !== null){
            return this.repo.markAsComplete(reg.id);
        }
        this.warning('Invalid Registration key.');
    }
}