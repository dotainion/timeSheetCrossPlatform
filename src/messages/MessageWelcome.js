import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutPageHandler } from '../layout/LayoutPageHandler';
import { routes } from '../Routes/Routes';
import { BsFillPersonFill } from 'react-icons/bs';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthenticationWrapper';
import { Teams } from '../module/logic/Teams';
import { MessageNavbar } from './MessageNavbar';
import logo from '../images/logo.png';
import { useAccounts } from '../provider/AccountsWrapper';


const _team_ = new Teams();

export const MessageWelcome = () =>{
    const { user } = useAuth();
    const { account } = useAccounts();

    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();

    const onNavigate = (route) =>{
        navigate(routes.route().userMessage() + route);
    }

    useEffect(async()=>{
        if(!account.clientId) return;
        const teamList = await _team_.getByClientId(account.clientId);
        setTeams(teamList);
    }, [account]);
    return(
        <div>
            <div className="position-absolute start-50 top-50 translate-middle text-center">
                <img className="w-25" src={logo} alt="" />
                <div className="display-1 fw-bold">Welcome</div>
                <div className="display-5">Track Time Accurately</div>
                <div>Jibble's timestamps, facial recognition and geolocation features all ensure accurate clock-ins. No more buddy punching!</div>
            </div>
        </div>
    )
}