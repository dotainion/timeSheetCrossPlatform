import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../infrastructure/config/AuthConfig";
import { Users } from "../module/logic/Users";
import { Teams } from '../module/logic/Teams';
import { StartupPage } from "../other/StartupPage";

const lUser = new Users();
const lTeam = new Teams();

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthenticationWrapper = ({children}) =>{
    const [user, setUser] = useState();
    const [team, setTeam] = useState();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        auth.onAuthStateChanged(async(uUser)=>{
            if (uUser){
                let userObj = await lUser.getById(uUser?.uid);
                let teamObj = await lTeam.getById(userObj?.teamId);
                setUser(userObj);
                setTeam(teamObj);
                setIsAuthenticated(userObj);
            }
            setLoading(false);
        });
    }, []);

    useEffect(()=>{
        //console.log(isAuthenticated);
    }, [isAuthenticated]);
    
    const value = {
        user,
        isAuthenticated,
    }

    return(
        <Context.Provider value={value}>
            {loading ? <StartupPage/> : children}
        </Context.Provider>
    )
}