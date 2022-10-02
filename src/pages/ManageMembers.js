import React, { useEffect, useState } from "react";
import { PercentageCard } from "../components/PercentageCard";
import { Layout } from "../layout/Layout";
import { VscAdd } from 'react-icons/vsc';
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { ButtonCard } from "../widgets/ButtonCard";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';



export const ManageMembers = () =>{    
    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);
    return(
        <div className="overflow-hidden h-100">
            <div className="row text-center p-3 m-auto">
                <ButtonCard onClick={()=>navigate(routes.nested().createMember()+':unassign')} title={'Add Members'} add />
                <ButtonCard onClick={()=>navigate(routes.nested().members())} title={'Members'} asign />
            </div>
        </div>
    )
}