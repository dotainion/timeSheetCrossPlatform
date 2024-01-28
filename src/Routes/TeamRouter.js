import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { routes } from "./Routes";
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
import { NestedPageNotFound } from "../errors/NestedPageNotFound";
import { Teams } from "../pages/Teams";
import { Messages } from "../messages/Messages";
import { MdManageAccounts } from "react-icons/md";
import { ManageTeam } from "../pages/MangeTeam";

const team = new _Teams_();

export const TeamRouter = () =>{
    
    const { user } = useAuth();

    const [processTeams, setProcessTeams] = useState([]);

    const navigate = useNavigate();

    const subMenu = [
        {
            title: 'Messages',
            icon: BiMessageRoundedDetail,
            optionsTitle: 'Teams',
            options: processTeams,
        },{
            title: 'Create a Team',
            icon: MdManageAccounts,
            onClick: ()=>navigate(routes.route().manageTeam()),
        },{
            title: 'Teams',
            icon: BiMessageRoundedDetail,
            onClick: ()=>navigate(routes.route().teamsList()),
        }
    ];

    useEffect(async()=>{
        if(!user.clientId) return;
        const teamCollector = await team.getByClientId(user.clientId);
        const mapTeam = teamCollector.list().map((t)=>({
            title: t.name,
            icon: BiMessageRoundedDetail,
            onClick: ()=>navigate(routes.route().messages().replace('teamId/*', `teamId:${t.id}`)),
        }));
        setProcessTeams(mapTeam);
        return () =>{}
    }, []);

    return(
        <LayoutPageHandler subMenu={subMenu}>
            <Routes>
                <Route path={routes.route().messages()} element={<Messages/>} />
                <Route path={routes.route().manageTeam()} element={<ManageTeam/>} />
                <Route path={routes.route().teamsList()} element={<Teams/>} />
                <Route path="*" element={<NestedPageNotFound />} />
            </Routes>
        </LayoutPageHandler>
    )
}