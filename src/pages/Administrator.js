import React, { useState } from 'react';
import { MemberCard } from '../components/MemberCard';
import { Layout } from '../layout/Layout';
import { VscAdd } from 'react-icons/vsc';
import { MdManageAccounts } from 'react-icons/md';
import { NewMember } from '../components/NewMember';


export const Administrator = () =>{
    const [openNewMember, setOpenNewMember] = useState(false);

    const options = [
        {
            title: 'Add Members',
            action: ()=>setOpenNewMember(true),
            icon: VscAdd
        },{
            title: 'Manage Members',
            action: ()=>null,
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
                
                <NewMember 
                    isOpen={openNewMember} 
                    onClose={()=>setOpenNewMember(false)} 
                    message="Add a new member"
                />
            </div>
        </Layout>
    )
}