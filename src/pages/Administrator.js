import React, { useState } from 'react';
import { Layout } from '../layout/Layout';
import { VscAdd } from 'react-icons/vsc';
import { MdManageAccounts } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { routes } from '../Routes/Routes';
import { ButtonCard } from '../widgets/ButtonCard';
import { ButtonCardContainer } from '../widgets/ButtonCardContainer';


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
            <ButtonCardContainer>
                <ButtonCard onClick={()=> navigate(routes.manageMembers)} title={'Manage Members'} manage />
                <ButtonCard onClick={()=> navigate(routes.teams)} title={'Manage Teams'} team />
                <ButtonCard onClick={()=> navigate(routes.membersSpreadsheets)} title={'Google Sheets'} google />
                <ButtonCard onClick={()=> {}} title={'Schedules'} team disabled />
                <ButtonCard onClick={()=> {}} title={'Export timesheets'} team disabled />
                <ButtonCard onClick={()=> {}} title={'Invoice and Billing'} team disabled />
                <ButtonCard onClick={()=> {}} title={'Invoice and Billing2'} team disabled />
            </ButtonCardContainer>
        </Layout>
    )
}