import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { auth } from "../infrastructure/config/AuthConfig";
import { Users } from "../module/logic/Users";
import { Teams } from '../module/logic/Teams';
import { StartupPage } from "../other/StartupPage";
import { Roles } from "../infrastructure/Roles";
import { authenticate } from '../infrastructure/config/AuthConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import $ from 'jquery';
import { Account } from "../module/logic/Account";
import { useAccounts } from "./AccountsWrapper";
import { tools } from "../infrastructure/tools/Tools";

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

    const pauseObsoverRef = useRef();

    useEffect(()=>{
        onAuthStateChanged(auth, async(currentUser)=>{
            if (currentUser && $(pauseObsoverRef.current).attr('data-state') != 'pause'){
                let userObj = await lUser.getById(currentUser?.uid);
                if (role.includes(userObj?.role)){
                    let teamObj = await lTeam.getById(userObj?.teamId);
                    setUser(userObj);
                    setTeam(teamObj);
                    setIsAuthenticated(userObj);
                }
            }
            setLoading(false);
        });
    }, []);
    
    const value = {
        user,
        team,
        isAuthenticated,
        setIsAuthenticated,
    }

    return(
        <Context.Provider value={value}>
            <div ref={pauseObsoverRef} data-state />
            {loading ? <StartupPage/> : children}
        </Context.Provider>
    )
}