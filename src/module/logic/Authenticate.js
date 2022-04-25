import { auth } from "../../infrastructure/config/AuthConfig";
import { Roles } from "../../infrastructure/Roles";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { Validation } from "../../infrastructure/Validation";
import { Users } from "./Users";

export class Authenticate extends ToastHandler{
    constructor(){
        super();
        this.role = new Roles();
        this.user = new Users();
        this.validate = new Validation();
    }

    async signIn(email, password){
        try{
            if (!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            return await auth.signInWithEmailAndPassword(email, password);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async register(fName, lName, companyName, email, password, confirmPassword, background){
        if (!this.validate.isEmailValid(email)){
            return this.error('Invalid email.');
        }
        if(!this.validate.passwordMismatch(password, confirmPassword)){
            return this.error('Password mismatch.');
        }
        if(!this.validate.isNameValid(fName)){
            return this.error('First name is required.');
        }
        if(!this.validate.isNameValid(lName)){
            return this.error('Last name is required.');
        }
        if(!this.validate.isNameValid(companyName)){
            return this.error('Company name is required.');
        }
        if(!this.validate.isPasswordValid(password)){
            return this.error('Invalid password.');
        }
        
        try{
            const response = await auth.createUserWithEmailAndPassword(email, password);

            const res = await this.user.addWithId({
                clientId: response?.user?.uid, 
                email: email, 
                firstName: fName, 
                lastName: lName, 
                image: null, 
                role: this.role.owner, 
                supervisorId: null, 
                teamId: null, 
                number: null, 
                gender: null, 
                companyName: companyName,
            }, response?.user?.uid);

            background?.(res);

            this.success('Successful.');
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async changePassword(password){
        try{
            return await auth.currentUser.updatePassword(password);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async resetPasswordViaEmail(email){
        try{
            if (!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            return await auth.sendPasswordResetEmail(email);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async changeEmail(email){
        try{
            if (!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            return await auth.currentUser.updateEmail(email);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async signOut(){
        await auth.signOut();
    }

    async sendResetPasswordToEmail(email){
        try{
            if (!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            await auth.sendPasswordResetEmail(email);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async creatUser(){

    }
}