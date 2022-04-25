import React, { useEffect, useState } from "react";
import { MemberCard } from "../components/MemberCard";
import { PercentageCard } from "../components/PercentageCard";
import { Layout } from "../layout/Layout";
import { VscAdd } from 'react-icons/vsc';
import { NewMember } from "../components/NewMember";
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";



export const ManageMembers = () =>{
    const [openNewMember, setOpenNewMember] = useState(false);
    
    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);
    return(
        <Layout options={[{title: 'Administration', action: ()=> navigate(routes.administrator)}]}>
            <MemberCard onClick={()=>setOpenNewMember(true)} asBtn={true}>
                <VscAdd className="float-center administrator-card-icon" />
                <div className="float-center" style={{top: '80%'}}>Add Members</div>
            </MemberCard>
                
                <NewMember
                    isOpen={openNewMember} 
                    onClose={()=>setOpenNewMember(false)} 
                    message="Add a new member"
                />
        </Layout>
    )
}