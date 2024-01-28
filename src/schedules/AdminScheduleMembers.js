import React, { useEffect, useState } from "react";
import { ButtonCard } from "../widgets/ButtonCard";
import img from '../images/stone.jpg';
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import { useAuth } from "../provider/AuthenticationWrapper";
import { MdRememberMe } from "react-icons/md";
import { Users } from "../module/logic/Users";
import { useAccounts } from "../provider/AccountsWrapper";


const users = new Users();

export const AdminScheduleMembers = () =>{
    const { user } = useAuth();
    const { account } = useAccounts();

    const [processUsers, setProcessUsers] = useState([]);

    useEffect(async()=>{
        if(!account.clientId) return;
        const userCollector = await users.getByAccountId(account.id);
        const mapUsers = userCollector.list().map((u)=>({
            title: u.firstName + ' ' + u.lastName,
            icon: MdRememberMe,
            onClick: ()=>null,
        }));
        setProcessUsers(mapUsers);
        return () =>{}
    }, [account]);
    return(
        <div>
            <ButtonCardContainer>
                {processUsers.map((u, key)=>(
                    <ButtonCard 
                        title={u.title} 
                        image={img} 
                        onClick={u.onClick}
                        key={key}
                    />
                ))}
            </ButtonCardContainer>
        </div>
    )
}