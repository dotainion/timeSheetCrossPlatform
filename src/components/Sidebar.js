import React, { useRef, useState } from "react";
import logo from '../logo.svg';
import { AiOutlineTeam } from 'react-icons/ai';
import { GoDashboard } from 'react-icons/go';
import { Routes, useNavigate } from "react-router-dom";
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
import { MdHelp, MdAdminPanelSettings, MdSpaceDashboard } from 'react-icons/md';

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
    }
];

export const Sidebar = () =>{
    const navigate = useNavigate();

    const navCollapsRef = useRef();

    const onNavHover = (id, isOver) =>{
        if (isOver){
            $('#' + id).css({backgroundColor: 'rgb(255, 255, 255, 0.04)'});
            $('#' + id + '-right').css({backgroundColor: 'rgb(255, 255, 255, 0.04)'});
        }else{
            $('#' + id).css({backgroundColor: ''});
            $('#' + id + '-right').css({backgroundColor: ''});
        }
    }

    const onMenuClick = () =>{
        $(navCollapsRef.current).animate({width: 'toggle'});
        $('.nav-on-mobile-backdrop').animate({width: 'toggle'});
    }

    return(
        <>
        <div className="nav-main-container">
            <div className="nav-container">              
                <div>
                    <div onClick={onMenuClick} className="nav-item" style={{backgroundColor: 'var(--secondary-color)'}}>
                        <GiHamburgerMenu/>
                    </div>
                    {ADMIN_SIDE_NAV.map((nav, key)=>(
                        <div 
                            id={`${key}navs`} 
                            onMouseEnter={()=>{onNavHover(`${key}navs`, true)}} 
                            onMouseLeave={()=>onNavHover(`${key}navs`, false)} 
                            onClick={()=>navigate(nav.route)} 
                            className="nav-item" 
                            key={key}
                        >
                            <nav.icon className="pad block" />
                        </div>
                    ))}
                </div>
                <div ref={navCollapsRef} className="nav-info-containser">
                    <div className="nav-on-mobile">
                        <div onClick={onMenuClick} className="nav-item" style={{backgroundColor: 'var(--secondary-color)'}}>
                            <div className="nav-title-container">
                                <div className="nav-title">MENU</div>
                            </div>
                        </div>
                        {ADMIN_SIDE_NAV.map((nav, key)=>(
                            <div 
                                id={`${key}navs-right`} 
                                onMouseEnter={()=>onNavHover(`${key}navs`, true)} 
                                onMouseLeave={()=>onNavHover(`${key}navs`, false)} 
                                onClick={()=>navigate(nav.route)} 
                                className="nav-item" 
                                key={key}
                            >
                                <div className="nav-title-container">
                                    <div className="nav-title">{nav.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="nav-on-mobile-backdrop"/>
        </>
    )
}