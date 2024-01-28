import React, { useEffect, useState } from "react";
import { ButtonCard } from "../widgets/ButtonCard";
import img from '../images/stone.jpg';
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import { useAuth } from "../provider/AuthenticationWrapper";
import { MdRememberMe } from "react-icons/md";
import { Users } from "../module/logic/Users";


const users = new Users();

export const AdminScheduleOptions = () =>{
    const { user } = useAuth();

    const options = [
        {
            title: 'New Schedule'
        },{
            title: 'View Schedule'
        }
    ];

    useEffect(async()=>{

    }, []);
    return(
        <ButtonCardContainer>
            {options.map((u, key)=>(
                <ButtonCard onClick={u.onClick} title={u.title} image={img} key={key} />
            ))}
        </ButtonCardContainer>
    )
}