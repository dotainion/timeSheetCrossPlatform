import React, { createContext, useContext, useEffect, useState } from "react";
import $ from 'jquery';
import { Teams } from "../module/logic/Teams";
import { Users } from "../module/logic/Users";
import { useAuth } from "./AuthenticationWrapper";

const _teams_ = new Teams();
const _members_ = new Users();

const Context = createContext();
export const useProvider = () => useContext(Context);

export const ProviderWrapper = ({children}) =>{
    const { user } = useAuth();

    const [teams, setTeams] = useState([]);
    const [userTeam, setUserTeam] = useState();
    const [members, setMebers] = useState([]);
    const [registrationMatch, setRegistrationMatch] = useState(false);

    const addToTeam = (newTeam) =>{
        const tmTmp = teams;
        setTeams([]);
        setTimeout(()=> setTeams([newTeam, ...tmTmp]), 1);
    }

    const addToMember = (newMbr) =>{
        const mbrTmp = members;
        setMebers([]);
        setTimeout(()=> setMebers([newMbr, ...mbrTmp]), 1);
    }

    const initializeMembers = async(id=null) =>{
        if(!id) return;
        setMebers(await _members_.getByTeamId(id));
    }

    useEffect(async()=>{
        if (!user?.teamId) return;
        setUserTeam(await _teams_.getById(user.teamId));
    }, [user]);

    useEffect(async()=>{
        if (!user?.teamId) return;
        setTeams(await _teams_.getByClientId(user?.clientId));
        return () =>{}
    }, [user]);

    const value = {
        teams,
        addToTeam,
        members,
        userTeam,
        addToMember,
        initializeMembers,
        registrationMatch, 
        setRegistrationMatch
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}