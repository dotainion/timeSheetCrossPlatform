import React, { useEffect, useState } from "react";
import { ButtonCard } from "../widgets/ButtonCard";
import img from '../images/stone.jpg';
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import { useAuth } from "../provider/AuthenticationWrapper";
import { MdRememberMe } from "react-icons/md";
import { Users } from "../module/logic/Users";


const users = new Users();

export const AdminScheduleMembers = () =>{
    const { user } = useAuth();

    const [processUsers, setProcessUsers] = useState([]);

    useEffect(async()=>{
        if(!user.clientId) return;
        const userList = await users.getByClientId(user.clientId);
        const mapUsers = userList.map((u)=>({
            title: u.firstName + ' ' + u.lastName,
            icon: MdRememberMe,
            onClick: ()=>null,
        }));
        setProcessUsers(mapUsers);
        return () =>{}
    }, []);
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