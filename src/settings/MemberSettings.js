import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Users } from "../module/logic/Users";

const _members_ = new Users();

export const MemberSettings = () =>{

    const navigate = useNavigate();
    const location = useLocation();

    const updateRole = async(role, userId) =>{
        _members_.updateUser({role: role}, userId);
    }

    const updateTeam = async(teamId, userId) =>{
        _members_.updateUser({teamId: teamId}, userId);
    }

    useEffect(()=>{
        if(location.state){
            
        }
    }, []);

    return(
        <Layout>

        </Layout>
    )
}