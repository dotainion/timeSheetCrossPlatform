import { Validation } from "./Validation";
import $ from 'jquery';


export class BrowserLoginCredentials extends Validation{
    loginkey = 'login-credentials-keys';
    createUserLoginKey = 'login-created-credentials-keys';

    save(key, data){
        if(!Object.keys(data || {}).length) return;
        const obj = JSON.stringify(data);
        window.localStorage.setItem(key, obj);
    }

    get(key){
        const data = window.localStorage.getItem(key);
        if(data) return JSON.parse(data);
        return null;
    }

    saveLogin(email, password){
        if (!this.isEmailValid(email)) return;
        if (!this.isPasswordValid(password)) return;
        this.save(this.loginkey, {
            email: email,
            password: password
        })
    }

    saveCreateUserLogin(email, password){
        if (!this.isEmailValid(email)) return;
        if (!this.isPasswordValid(password)) return;
        this.save(this.createUserLoginKey, {
            email: email,
            password: password
        })
    }

    clearLogin(){
        window.localStorage.removeItem(this.loginkey);
    }

    clearCreateUserLogin(){
        window.localStorage.removeItem(this.createUserLoginKey);
    }

    getLogin(){
        const creds = this.get(this.loginkey);
        return {
            email: creds?.email || '',
            password: creds?.password || ''
        }
    }

    getCreateLogin(){
        const creds = this.get(this.createUserLoginKey);
        return {
            email: creds?.email || '',
            password: creds?.password || ''
        }
    }

    async pauseStateChange(state=true){
        const element = $('html').find('div[data-state-change-pause]');
        $(element).attr('data-state', state ? 'pause' : 'unpause');
    }
}