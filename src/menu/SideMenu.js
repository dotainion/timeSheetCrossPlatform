import React, { useEffect, useRef, useState } from "react";
import logo from '../logo.svg';
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
import { AiFillSchedule } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs';

import { BsGrid3X3Gap } from 'react-icons/bs';

import { FaUsers, FaRegClock } from 'react-icons/fa';
import { VscCalendar } from 'react-icons/vsc';
import { AiFillMessage } from 'react-icons/ai';
import { RiSettings5Fill } from 'react-icons/ri';
import { ImNotification } from 'react-icons/im';
import { HiUserAdd } from 'react-icons/hi';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdHelp, MdAdminPanelSettings, MdSpaceDashboard } from 'react-icons/md';
import { Authenticate } from '../module/logic/Authenticate';
import { useAuth } from '../provider/AuthenticationWrapper';
import { MdKeyboardBackspace } from 'react-icons/md'
import { MenuButton } from "./MenuButton";

const auth = new Authenticate();

export const ADMIN_SIDE_NAV = [
    {
        title: "Dashboard",
        icon: MdSpaceDashboard,
        route: routes.dashboard,
    },{
        title: "Team",
        icon: FaUsers,
        route: routes.teams,
    },{
        title: "Administrator",
        icon: MdAdminPanelSettings,
        route: routes.administrator,
    },{
        title: "Sign out",
        icon: BiLogOutCircle,
        route: ()=>auth.signOut(),
    }
];

export const SideMenu = () =>{
    const { setIsAuthenticated } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const sidebarRef = useRef();

    const onNavigate = (route) =>{
        if(typeof route === 'function'){
            setIsAuthenticated(null);
            return route();
        }
        navigate(route);
    }

    return(
        <nav ref={sidebarRef} className="sidebar text-nowrap">
            <span className="mb-4 d-block">
                <div className="display-6 float-end pointer me-2">
                    <MenuButton inMenu/>
                </div>
            </span>
            <h3 className="p-3">Menu</h3>
            <h6 className="p-4">Sub header</h6>
            {ADMIN_SIDE_NAV.map((nav, key)=>(
                <div 
                    onClick={()=>onNavigate(nav.route)} 
                    className={`d-flex p-2 fw-bold pointer align-items-center ${nav.route === location.pathname && 'sidebar-active'}`} 
                    key={key}>
                    <div><nav.icon className="display-6 pe-2" /></div>
                    <div className="">{nav.title}</div>
                </div>
            ))}
        </nav>
    )
}