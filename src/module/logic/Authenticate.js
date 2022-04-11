import { auth } from "../../infrastructure/config/AuthConfig";
import { roles } from "../../infrastructure/Roles";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { Validation } from "../../infrastructure/Validation";
import { Users } from "./Users";

export class Authenticate extends ToastHandler{
    constructor(){
        super();
        this.user = new Users();
        this.validate = new Validation();
    }

    async signIn(email, password){
        try{
            return await auth.signInWithEmailAndPassword(email, password);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async register(fName, lName, companyName, email, password, confirmPassword){
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

            await this.user.addWithId({
                clientId: null, 
                email: email, 
                firstName: fName, 
                lastName: lName, 
                image: null, 
                role: roles.admin, 
                supervisorId: null, 
                teamId: null, 
                number: null, 
                gender: null, 
                companyName: companyName,
            }, response?.user?.uid);

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
            return await auth.sendPasswordResetEmail(email);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }

    async changeEmail(email){
        try{
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
            await auth.sendPasswordResetEmail(email);
        }catch(error){
            this.error(error.message);
            return false;
        }
    }
}