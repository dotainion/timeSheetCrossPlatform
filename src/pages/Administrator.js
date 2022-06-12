import React, { useState } from 'react';
import { MemberCard } from '../components/MemberCard';
import { Layout } from '../layout/Layout';
import { VscAdd } from 'react-icons/vsc';
import { MdManageAccounts } from 'react-icons/md';
import { NewMember } from '../components/NewMember';
import { useNavigate } from 'react-router-dom';
import { routes } from '../Routes/Routes';
import { ButtonCard } from '../widgets/ButtonCard';


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
                <ButtonCard onClick={()=> navigate(routes.manageMembers)} title={'Manage Members'} manage />
            </div>
        </Layout>
    )
}