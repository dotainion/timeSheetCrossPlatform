import { BrowserLoginCredentials } from "../../infrastructure/BrowserLoginCredentials";
import { auth } from "../../infrastructure/config/AuthConfig";
import { Roles } from "../../infrastructure/Roles";
import { ToastHandler } from "../../infrastructure/ToastHandler";
import { Validation } from "../../infrastructure/Validation";
import { Users } from "./Users";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';


export class Authenticate extends ToastHandler{
    role = null;
    user = null;
    validate = null;
    saveCreds = null;
    errorMessage = null;

    constructor(){
        super();
        this.role = new Roles();
        this.user = new Users();
        this.validate = new Validation();
        this.saveCreds = new BrowserLoginCredentials();
    }

    errorLog(){
        return this.errorMessage;
    }

    sanitizeErrorLog(message){
        this.errorMessage = message;
        if(message.includes('email-already-in-use')){
            this.errorMessage = 'Email already in use.';
        }
        if(message.includes('too-many-request')){
            this.errorMessage = 'Too many request. Please try again later.';
        }
        if(message.includes('internal-error')){
            this.errorMessage = 'Something went wrong.';
        }
        if(message.includes('user-not-found')){
            this.errorMessage = 'User not found.';
        }
        if(message.includes('wrong-password')){
            this.errorMessage = 'Invalid password.';
        }
        if(message.includes('internal-error')){
            this.errorMessage = 'Something went wrong.';
        }
        return this.errorMessage;
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
            throw new Error('Invalid email.');
        }
        if(!this.validate.passwordMismatch(password, confirmPassword)){
            throw new Error('Password mismatch.');
        }
        if(!this.validate.isNameValid(fName)){
            throw new Error('First name is required.');
        }
        if(!this.validate.isNameValid(lName)){
            throw new Error('Last name is required.');
        }
        if(!this.validate.isNameValid(companyName)){
            throw new Error('Company name is required.');
        }
        if(!this.validate.isPasswordValid(password)){
            throw new Error('Invalid password.');
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

    async changePassword(email, password){
        try{
            if(!this.validate.isPasswordValid(password)){
                throw new Error('Invalid password.');
            }
            return await updatePassword(auth.currentUser, password);
        }catch(error){
            this.error(this.sanitizeErrorLog(error.message));
            return false;
        }
    }

    async verifyPassword(email, password){
        try{
            if(!this.validate.isPasswordValid(password)){
                throw new Error('Invalid password.');
            }
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
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