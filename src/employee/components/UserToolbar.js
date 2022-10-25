import React, { useEffect, useRef } from "react";
import { HiPlusSm } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import { FiMinimize } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi';
import $ from 'jquery';
import { Authenticate } from "../../module/logic/Authenticate";
import { useAuth } from "../../provider/AuthenticationWrapper";
import { getRoles } from "@testing-library/react";
import { Roles } from '../../infrastructure/Roles';
import { tools } from "../../infrastructure/tools/Tools";
import { AiFillSetting, AiFillClockCircle } from 'react-icons/ai';
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../Routes/Routes";
import { Menu } from "../../menu/Menu";

const role = new Roles();
const authenticate = new Authenticate();

const command = {
    HIDE_ON_MOBILE: 'HIDE-ON-MOBILE',
    HIDE_ON_DESKTOP: 'HIDE-ON-DESKTOP',
    HIDE_FOR_SUPERIOR: 'HIDE-FOR-SUPERIOR',
    SHOW_ON_CLOCK_IN: 'SHOW-ON-CLOCK-IN',
}

export const UserToolbar = ({onSearch, onMinimize}) =>{
    const { setIsAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const navigation = [
        {
            icon: BsSearch,
            title: 'Search',
            route: null,
            onClick: ()=>onSearch?.(),
            hide: location.pathname !== routes.clockIn ? true : false,
        },{
            icon: FiMinimize,
            title: 'Minimize',
            route: null,
            onClick: ()=>onMinimize?.(),
            hide: !tools.isMobile() ? true : false,
        },{
            icon: AiFillClockCircle,
            title: 'Clock In',
            route: routes.clockIn,
            onClick: null,
            hide: false,
        },{
            icon: AiFillSetting,
            title: 'Setting',
            route: routes.settings,
            onClick: null,
            hide: role.isSuperior(user?.role) ? true : false,
        },{
            icon: BiLogOutCircle,
            title: 'Log Out',
            route: null,
            onClick: ()=>{
                authenticate.signOut();
                setIsAuthenticated(null);
            },
            hide: role.isSuperior(user?.role) ? true : false,
        },
    ];

    const condition = (cmd) =>{
        if(cmd === command.HIDE_ON_MOBILE){
            return tools.isMobile() ? 'd-none' : '';
        }else if (cmd === command.HIDE_ON_DESKTOP){
            return !tools.isMobile() ? 'd-none' : '';
        }
        else if (cmd === command.HIDE_FOR_SUPERIOR){
            return role.isSuperior(user?.role) ? 'd-none' : '';
        }
        else if (cmd === command.SHOW_ON_CLOCK_IN){
            return location.pathname !== routes.clockIn ? 'd-none' : '';
        }
        return '';
    }

    useEffect(()=>{

    }, []);

    return(
        <Menu menu={navigation} />
    )
}