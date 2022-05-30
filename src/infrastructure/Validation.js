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
        if (password || password?.length >= 4) return true;
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
    
    isTimeValid(time, element=null){
        const [stringTime, AMPM] = time?.split?.(' ');
        if (!['am', 'pm'].includes(AMPM?.toLowerCase?.())){
            element && $(element).css({border: '1px solid red'});
            return {error: 'Can only be "AM or PM".'};
        }
        const [hr, min, sec] = stringTime?.split?.(':');
        if (hr?.length > 2 || hr?.length < 0 || min?.length != 2 || sec?.length != 2){
            element && $(element).css({border: '1px solid red'});
            return {error: 'Invalid time format.'};
        }
        if (/[a-zA-Z]/.test(hr) || /[a-zA-Z]/.test(min) || /[a-zA-Z]/.test(sec)){
            element && $(element).css({border: '1px solid red'});
            return {error: 'Invalid time format.'};
        }
        element && $(element).css({border: ''});
        return true;
    }
}