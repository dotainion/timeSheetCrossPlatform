import React, { useEffect, useState } from "react";
import { MemberCard } from "../components/MemberCard";
import { PercentageCard } from "../components/PercentageCard";
import { Layout } from "../layout/Layout";
import { VscAdd } from 'react-icons/vsc';
import { NewMember } from "../components/NewMember";
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { ButtonCard } from "../widgets/ButtonCard";



export const ManageMembers = () =>{
    const [openNewMember, setOpenNewMember] = useState(false);
    
    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);
    return(
        <Layout options={[{title: 'Administration', action: ()=> navigate(routes.administrator)}]}>
            <ButtonCard onClick={()=>setOpenNewMember(true)} title={'Add Members'} add />
            <ButtonCard onClick={()=>navigate(routes.asignMembers)} title={'Assign Members'} asign />
                
            <NewMember
                isOpen={openNewMember} 
                onClose={()=>setOpenNewMember(false)} 
                message="Add a new member"
            />
        </Layout>
    )
}