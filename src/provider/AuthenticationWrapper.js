import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../infrastructure/config/AuthConfig";
import { Users } from "../module/logic/Users";

const lUser = new Users();

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthenticationWrapper = ({children}) =>{
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        auth.onAuthStateChanged(async(uUser)=>{
            if (uUser){
                let userObj = await lUser.getById(uUser?.uid);
                setUser(userObj);
                setIsAuthenticated(userObj);
            }
            setLoading(false);
        });
    }, []);

    useEffect(()=>{
        console.log(isAuthenticated);
    }, [isAuthenticated]);
    
    const value = {
        user,
        isAuthenticated,
    }

    return(
        <Context.Provider value={value}>
            {!loading && children}
        </Context.Provider>
    )
}