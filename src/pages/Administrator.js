import React, { useState } from 'react';
import { MemberCard } from '../components/MemberCard';
import { Layout } from '../layout/Layout';
import { VscAdd } from 'react-icons/vsc';
import { MdManageAccounts } from 'react-icons/md';
import { NewMember } from '../components/NewMember';
import { useNavigate } from 'react-router-dom';
import { routes } from '../Routes/Routes';


export const Administrator = () =>{

    const navigate = useNavigate();

    const options = [
        {
            title: 'Manage Members',
            action: ()=> navigate(routes.manageMembers),
            icon: MdManageAccounts
        },
    ];

    return(
        <Layout>
            <div className="administrator-container">
                {options.map((opt, key)=>(
                    <MemberCard onClick={opt?.action} asBtn={true} key={key}>
                        <opt.icon className="float-center administrator-card-icon" />
                        <div className="float-center" style={{top: '80%'}}>{opt?.title}</div>
                    </MemberCard>
                ))}
            </div>
        </Layout>
    )
}