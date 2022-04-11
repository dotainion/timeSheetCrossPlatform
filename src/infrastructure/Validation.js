import $ from 'jquery';


export class Validation{

    showError(html, type){
        $('body').find(`${html}[type=${type}]`).each((i, element)=>{
            $(element).css({ border: '1px solid red' });
        });
    }

    isEmailValid(email){
        var validate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (validate.test(email)) return true;
        this.showError('div', 'email');
        return false;
    }

    isPasswordValid(password){
        if (password && password?.length >= 4) return true;
        this.showError('div', 'password');
        return false;
    }

    passwordMismatch(password, confirm){
        if (password === confirm) return true;
        this.showError('div', 'password');
        return false;
    }

    isNameValid(name){
        if (name && name?.length >= 2) return true;
        this.showError('div', 'name');
        return false;
    }
    
}