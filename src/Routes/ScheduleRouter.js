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
import { AiOutlineClose, AiFillSchedule } from "react-icons/ai";
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
import { MdManageAccounts, MdOutlineScheduleSend } from "react-icons/md";
import { ManageTeam } from "../pages/MangeTeam";
import { AdminScheduleMembers } from "../schedules/AdminScheduleMembers";
import { GrSchedulePlay } from 'react-icons/gr';
import { Users } from "../module/logic/Users";
import { MdRememberMe } from 'react-icons/md';

const team = new _Teams_();
const users = new Users();

export const ScheduleRouter = () =>{
    const { user } = useAuth();

    const [processUsers, setProcessUsers] = useState([]);

    const navigate = useNavigate();


    useEffect(async()=>{
        if(!user.clientId) return;
        const userCollector = await users.getByClientId(user.clientId);
        const mapUsers = userCollector.list().map((u)=>({
            title: u.firstName + ' ' + u.lastName,
            icon: MdRememberMe,
            onClick: ()=>null,
        }));
        setProcessUsers({
            title: 
                <div className="d-inline-block">
                    <div className="d-flex align-items-center">
                        <div><AiFillSchedule/></div>
                        <div>Users</div>
                    </div>
                </div>,
            options: mapUsers
        });
        return () =>{}
    }, []);

    return(
        <LayoutPageHandler child={processUsers}>
            <Routes>
                <Route path="*" element={<AdminScheduleMembers />} />
            </Routes>
        </LayoutPageHandler>
    )
}