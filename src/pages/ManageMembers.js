import React, { useEffect, useState } from "react";
import { MemberCard } from "../components/MemberCard";
import { PercentageCard } from "../components/PercentageCard";
import { Layout } from "../layout/Layout";
import { VscAdd } from 'react-icons/vsc';
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { ButtonCard } from "../widgets/ButtonCard";



export const ManageMembers = () =>{    
    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);
    return(
        <Layout options={[{title: 'Administration', action: ()=> navigate(routes.administrator)}]}>
            <ButtonCard onClick={()=>navigate(routes.createMember+':unassign')} title={'Add Members'} add />
            <ButtonCard onClick={()=>navigate(routes.members)} title={'Members'} asign />
        </Layout>
    )
}