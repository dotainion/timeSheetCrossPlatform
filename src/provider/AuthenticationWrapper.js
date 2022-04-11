import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../infrastructure/config/AuthConfig";
import { Users } from "../module/logic/Users";

const lUser = new Users();

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthenticationWrapper = ({children}) =>{
    const [user, setUser] = useState();

    useEffect(()=>{
        auth.onAuthStateChanged(async(uUser)=>{
            if (uUser){
                let userObj = await lUser.getById(uUser?.uid);
                userObj['id'] = uUser?.uid;
                setUser(userObj);
            }
        });
    }, []);
    
    const value = {
        user,
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}