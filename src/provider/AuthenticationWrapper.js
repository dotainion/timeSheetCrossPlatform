import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../infrastructure/config/AuthConfig";
import { Users } from "../module/logic/Users";
import { Teams } from '../module/logic/Teams';
import { StartupPage } from "../other/StartupPage";
import { Roles } from "../infrastructure/Roles";

const lUser = new Users();
const lTeam = new Teams();
const role = new Roles();

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthenticationWrapper = ({children}) =>{
    const [user, setUser] = useState();
    const [team, setTeam] = useState();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pauseStateChange, setPauseStateChange] = useState(false);

    useEffect(()=>{
        auth.onAuthStateChanged(async(uUser)=>{
            console.log(uUser);
            if (uUser && !pauseStateChange){
                let userObj = await lUser.getById(uUser?.uid);
                if (role.includes(userObj?.role)){
                    let teamObj = await lTeam.getById(userObj?.teamId);
                    setUser(userObj);
                    setTeam(teamObj);
                    setIsAuthenticated(userObj);
                }
            }
            setLoading(false);
        });
        setPauseStateChange(false);
    }, []);
    
    const value = {
        user,
        isAuthenticated,
        setIsAuthenticated
    }

    return(
        <Context.Provider value={value}>
            <div data-state-change-pause onClick={()=>setPauseStateChange(true)} />
            <div data-state-change-unpause onClick={()=>setPauseStateChange(false)} />
            {loading ? <StartupPage/> : children}
        </Context.Provider>
    )
}