import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutPageHandler } from '../layout/LayoutPageHandler';
import { routes } from '../Routes/Routes';
import { BsFillPersonFill } from 'react-icons/bs';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthenticationWrapper';
import { Teams } from '../module/logic/Teams';
import $ from 'jquery';
import { Users } from '../module/logic/Users';
import { Loading } from '../components/Loading';

const member = new Users();

export const MessageNavbar = ({children}) =>{
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const onNavigate = (route) =>{
        navigate(routes.route().userMessage().replace('userId', `userId:${route}`));
    }

    useEffect(async()=>{
        setLoading(true);
        const teamUrl = location.pathname.split('/')[3];
        const teamId = teamUrl.split(':')[2];
        const membersList = await member.getByTeamId(teamId);
        setMembers(membersList);
        setLoading(false);
    }, [location]);

    return(
        <div className="d-flex w-100" style={{marginLeft: '-10px'}}>
            <div className="scrollbar-mini overflow-auto position-relative bg-dark text-light" style={{width: '150px',height: '98vh'}}>
                {
                    members.length ?
                    members.map((team, key)=>(
                        <div onClick={()=>onNavigate(team.id)} className="ps-3 pe-3 pt-1 pb-1 mb-2 d-flex align-items-center w-100 ps-1 pe-1 pointer sidebar-btn" key={key}>
                            <BsFillPersonFill className="fs-3" />
                            <div className="text-truncate small">{team.firstName} {team.lastName}</div>
                        </div>
                    )) :
                    <div className="small ps-3 pe-3">
                        <div>No User in ur team</div>
                    </div>
                }
                <Loading loading={loading}/>
            </div>
            <div className="w-100 position-relative">{children}</div>
        </div>
    )
}