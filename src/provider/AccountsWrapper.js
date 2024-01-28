import React, { createContext, useContext, useEffect, useState } from "react";
import { AccountSignIn } from "../account/AccountSignIn";
import { Loading } from "../components/Loading";
import { tools } from "../infrastructure/tools/Tools";
import { Account } from "../module/logic/Account";
import { useAuth } from "./AuthenticationWrapper";

const _account = new Account();

const Context = createContext();
export const useAccounts = () => useContext(Context);

export const AccountsWrapper = ({children}) =>{
    const { user, isAuthenticated } = useAuth();

    const [account, setAccount] = useState(tools.account.getSelectedAccount());
    const [accounts, setAccounts] = useState([]);
    const [availableAccounts, setAvailableAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const hasAccount = () =>{
        if(account?.clientId || !isAuthenticated) return true;
        return false;
    }

    const selectNewAccount = (acct) =>{
        setLoading(true);
        tools.account.setSelectedAccount(acct);
        setAccount(acct);
        setLoading(false);
    }

    const addAvailableAccount = (acct) =>{
        setAvailableAccounts((acc)=>[acct, ...availableAccounts]);
    }

    const values = {
        selectNewAccount,
        account,
        accounts,
        loading,
        availableAccounts,
        addAvailableAccount
    }

    useEffect(async()=>{
        if(!user?.id || !isAuthenticated) return;
        setLoading(true);
        const list = await _account.getUserAccount(user?.id);
        if(list.hasItems()) setAccounts(list.list());
        setLoading(false);
    }, [isAuthenticated, user]);

    useEffect(async()=>{
        if(!account || !isAuthenticated) return;
        setLoading(true);
        const accList = await _account.getUserAccountByClient(account?.clientId);
        if(accList.hasItems()) setAvailableAccounts(accList.list());
        setLoading(false);
    }, [account]);

    return(
        <Context.Provider value={values}>
            {!hasAccount() ? <AccountSignIn/> : children}
        </Context.Provider>
    )
}