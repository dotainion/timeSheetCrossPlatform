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
import { AiFillSetting, AiFillClockCircle, AiFillSchedule } from 'react-icons/ai';
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../Routes/Routes";
import { Menu } from "../../menu/Menu";

const role = new Roles();
const authenticate = new Authenticate();

export const UserToolbar = () =>{
    const { setIsAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const navigation = [
        {
            icon: AiFillClockCircle,
            title: 'Clock In',
            route: routes.clockIn,
            onClick: null,
        },{
            icon: AiFillSetting,
            title: 'Setting',
            route: routes.settings,
            onClick: null,
        },{
            icon: AiFillSchedule,
            title: 'Schedule',
            route: null,
            onClick: null,
        },{
            icon: BiLogOutCircle,
            title: 'Log Out',
            route: null,
            onClick: ()=>{
                authenticate.signOut();
                setIsAuthenticated(null);
            },
        },
    ];

    useEffect(()=>{

    }, []);

    return(
        <Menu menu={navigation} />
    )
}