import { BrowserLoginCredentials } from "../../infrastructure/BrowserLoginCredentials";
import { auth } from "../../infrastructure/config/AuthConfig";
import { Roles } from "../../infrastructure/Roles";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { Validation } from "../../infrastructure/Validation";
import { Users } from "./Users";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateEmail } from 'firebase/auth';


export class Authenticate extends ToastHandler{
    constructor(){
        super();
        this.role = new Roles();
        this.user = new Users();
        this.validate = new Validation();
        this.saveCreds = new BrowserLoginCredentials();
    }

    sanitizeErrorLog(message){
        let errorLog = message;
        if(message.includes('email-already-in-use')){
            errorLog = 'Email already in use.';
        }
        if(message.includes('too-many-request')){
            errorLog = 'Too many request. Please try again later.';
        }
        if(message.includes('internal-error')){
            errorLog = 'Something went wrong.';
        }
        return errorLog;
    }

    async signIn(email, password){
        try{
            if (!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            const response = await signInWithEmailAndPassword(auth, email, password);
            this.saveCreds.saveLogin(email, password);
            return response;
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
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
            const response = await createUserWithEmailAndPassword(auth, email, password);
            
            await this.user.addWithId({
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

            this.saveCreds.saveLogin(email, password);

            this.success('Successful.');
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
            return false;
        }
    }

    async changePassword(password){
        try{
            return await auth.currentUser.updatePassword(password);
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
            return false;
        }
    }

    async resetPasswordViaEmail(email){
        try{
            if (!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            console.log(email);
            return await sendPasswordResetEmail(auth, email);
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
            return false;
        }
    }

    async emailVerification(){
        try{
            return await sendEmailVerification(auth.currentUser);
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
            return false;
        }
    }

    async changeEmail(email){
        try{
            if (!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            return await updateEmail(auth.currentUser, email);
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
            return false;
        }
    }

    async signOut(){
        await auth.signOut();
    }

    async creatUser(clientId, email, fName, lName, image, role, supervisorId, teamId, phone, gender, password){
        try{
            if(!this.validate.isNameValid(fName)){
                throw new Error('Invalid first Name.');
            }
            if(!this.validate.isNameValid(lName)){
                throw new Error('Invalid last Name.');
            }
            if(!this.validate.isEmailValid(email)){
                throw new Error('Invalid email.');
            }
            if(!this.validate.isPasswordValid(password)){
                throw new Error('Invalid password.');
            }

            this.saveCreds.pauseStateChange(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await this.emailVerification();
            await this.resetPasswordViaEmail(email);

            const rtUsr = await this.user.add(
                response?.user?.uid,
                clientId,
                email,
                fName,
                lName,
                image || '',
                role,
                supervisorId,
                teamId || '',
                phone,
                gender
            );
            this.saveCreds.saveCreateUserLogin(email, password);
            return rtUsr;
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
            return false;
        }finally{
            const creds = this.saveCreds.getLogin();
            await this.signIn(creds?.email, creds?.password);
            this.saveCreds.pauseStateChange(false);
        }
    }
}