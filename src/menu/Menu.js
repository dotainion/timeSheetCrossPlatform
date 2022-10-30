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

export const Menu = ({menu, menuIcon}) =>{
    const { user, setIsAuthenticated } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

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
    
    return(
        <nav className="d-flex">
            <div className="text-center bg-dark vh-100">
                <div onClick={toggleSubMenu} className="fs-4 mt-3 mb-4 pt-1 pb-3 text-light sidebar-btn pointer">
                    {menuIcon ? menuIcon : <GiHamburgerMenu />}
                </div>
                {menu?.map((nav, key)=>{
                    if(nav?.hide === true) return null;
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