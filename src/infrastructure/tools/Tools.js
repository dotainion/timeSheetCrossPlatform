class Accounts{
    accountkey = 'selected-account';

    setSelectedAccount(account){
        window.localStorage.setItem(
            this.accountkey, 
            JSON.stringify(account)
        );
    }

    getSelectedAccount(){
        const acct = window.localStorage.getItem(this.accountkey);
        if(acct) return JSON.parse(acct);
        return null;
    }

    clearSelectedAccount(){
        window.localStorage.removeItem(this.accountkey);
    }
}

class Tools{
    account = null;
    
    constructor(){
        this.account = new Accounts();
    }

    isMobile(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

export const tools = new Tools();