import React, { useEffect, useRef, useState } from "react";
import logo from '../images/logo.png';
import { AiOutlineTeam } from 'react-icons/ai';
import { GoDashboard } from 'react-icons/go';
import { Routes, useNavigate, useLocation } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { GiHamburgerMenu } from 'react-icons/gi';
import $ from 'jquery';

import { ImUserPlus } from 'react-icons/im';
import { CgTimelapse } from 'react-icons/cg';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import { BsFillClockFill } from 'react-icons/bs';

import { BsGrid3X3Gap } from 'react-icons/bs';

import { FaUsers, FaRegClock } from 'react-icons/fa';
import { VscCalendar } from 'react-icons/vsc';
import { AiFillMessage, AiFillClockCircle, AiTwotoneSetting, AiFillSchedule } from 'react-icons/ai';
import { RiSettings5Fill } from 'react-icons/ri';
import { ImNotification } from 'react-icons/im';
import { HiUserAdd } from 'react-icons/hi';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdHelp, MdAdminPanelSettings, MdSpaceDashboard } from 'react-icons/md';
import { Authenticate } from '../module/logic/Authenticate';
import { useAuth } from '../provider/AuthenticationWrapper';
import { MdKeyboardBackspace } from 'react-icons/md'
import { Roles } from "../infrastructure/Roles";
import { RiProfileLine } from 'react-icons/ri';


const role = new Roles();
const auth = new Authenticate();

export const SideMenu = () =>{
    const { user } = useAuth();

    const { setIsAuthenticated } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const ADMIN_MENU = [
        {
            title: 'Dashboard',
            icon: MdSpaceDashboard,
            route: routes.route().dashboard(),
            onClick: null,
        },{
            title: 'Team',
            icon: FaUsers,
            route: routes.route().teams(),
            onClick: null,
        },{
            title: 'Admin',
            icon: MdAdminPanelSettings,
            route: routes.route().administrator(),
            onClick: null,
        },{
            title: 'Profile',
            icon: RiProfileLine,
            route: routes.route().adminProfile(),
            onClick: null,
        },{
            title: 'Settings',
            icon: AiTwotoneSetting,
            route: `${routes.route().adminSettings()}:${user?.id}`,
            onClick: null,
        },{
            title: 'Schedule',
            icon: AiFillSchedule,
            route: routes.route().adminSchedule(),
            onClick: null,
        },{
            title: 'Clock',
            icon: AiFillClockCircle,
            route: routes.route().supervisorClockin(),
            onClick: null,
        },{
            title: 'Sign out',
            icon: BiLogOutCircle,
            route: null,
            onClick: async()=> await auth.signOut(),
        }
    ];

    const onNavTrigger = async(nav) =>{
        if(typeof nav.onClick === 'function' && nav.title === 'Sign out'){
            setIsAuthenticated(null);
            return await nav.onClick();
        }else if (typeof nav.onClick === 'function'){
            return await nav.onClick();
        }else if (typeof nav.route === 'string'){
            navigate(nav.route);
        }
    }

    const toggleSubMenu = () =>{
        if($('[data-sub-menu=true]').is(':hidden')) $('[data-sub-menu=true]').show('fast');
        else $('[data-sub-menu=true]').hide('fast');
    }

    useEffect(()=>{
        
    }, []);
    
    return(
        <nav className="d-flex">
            <div className="text-center bg-dark">
                <div onClick={toggleSubMenu} className="fs-4 mt-3 mb-5 pt-1 pb-3 text-light sidebar-btn pointer">
                    <GiHamburgerMenu />
                </div>
                {ADMIN_MENU.map((nav, key)=>{
                    if(nav.title === 'Clock' && !role.isSupervisor(user?.role)) return null;
                    return (
                        <div 
                            onClick={()=>onNavTrigger(nav)} 
                            className={`pointer mt-3 mb-3 text-light sidebar-btn ${location.pathname.includes(nav.route?.replace('*', '')) && 'sidebar-active'}`} 
                            key={key}>
                            <div><nav.icon className="fs-4" /></div>
                            <small className="ms-3 me-3 text-nowrap">{nav.title}</small>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}