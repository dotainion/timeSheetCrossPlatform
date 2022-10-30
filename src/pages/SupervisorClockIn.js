import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { routes } from "../Routes/Routes";
import { BreadCrumbs } from "../widgets/BreadCrumbs";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import { VscAdd } from 'react-icons/vsc';
import { Modal } from "../container/Modal";
import { Teams as _Teams_ } from '../module/logic/Teams';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineClose } from "react-icons/ai";
import $ from 'jquery';
import { IoIosPeople } from 'react-icons/io';
import bgImg from '../images/team-bg.webp';
import { NoRecords } from "../components/NoRecords";
import teamIcon from '../images/team-icon.png';
import { ModalXl } from "../container/ModalXl";
import { ConfirmXl } from "../widgets/ConfirmXl";
import { Loading } from "../components/Loading";
import { useProvider } from "../provider/ProviderWrapper";
import { ButtonCard } from "../widgets/ButtonCard";
import { useAuth } from "../provider/AuthenticationWrapper";
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';
import img from '../images/stone.jpg';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { ClockIn } from "../employee/pages/ClockIn";
import { Roles } from "../infrastructure/Roles";
import { PunchInTime } from "../clock/PunchInTime";


const role = new Roles();

export const SupervisorClockIn = () =>{
    const { user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if(!role.isSupervisor(user?.role)){
            navigate(routes.route().admin());
        }
    }, []);

    return(
        <PunchInTime/>
    )
}