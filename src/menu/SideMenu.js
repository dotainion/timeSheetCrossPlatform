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
import { MdSwitchAccount } from 'react-icons/md'
import { Roles } from "../infrastructure/Roles";
import { RiProfileLine } from 'react-icons/ri';
import { Menu } from "./Menu";
import { tools } from "../infrastructure/tools/Tools";


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
            title: 'Accounts',
            icon: MdSwitchAccount,
            route: routes.route().accounts(),
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
            route: `${routes.route().adminProfile()}:${user?.id}`,
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
            onClick: async()=>await auth.signOut().then(()=>tools.account.clearSelectedAccount()),
        }
    ];
    
    return(
        <Menu menu={ADMIN_MENU} />
    )
}