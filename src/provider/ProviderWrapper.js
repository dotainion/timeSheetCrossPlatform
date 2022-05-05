import React, { createContext, useContext, useEffect, useState } from "react";
import $ from 'jquery';
import { Teams } from "../module/logic/Teams";
import { Users } from "../module/logic/Users";

const _teams_ = new Teams();
const _members_ = new Users();

const Context = createContext();
export const useProvider = () => useContext(Context);

export const ProviderWrapper = ({children}) =>{
    const [teams, setTeams] = useState([]);
    const [members, setMebers] = useState([]);

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
        console.log(await _members_.getByTeamId(id))
    }

    useEffect(async()=>{
        setTeams(await _teams_.get());

        return () =>{
            
        }
    }, []);

    const value = {
        teams,
        addToTeam,
        members,
        addToMember,
        initializeMembers
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}