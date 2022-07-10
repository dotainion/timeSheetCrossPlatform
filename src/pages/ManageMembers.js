import React, { useEffect, useState } from "react";
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
            <div className="row text-center p-3 m-auto">
                <ButtonCard onClick={()=>navigate(routes.createMember+':unassign')} title={'Add Members'} add />
                <ButtonCard onClick={()=>navigate(routes.members)} title={'Members'} asign />
            </div>
        </Layout>
    )
}