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
import { AdminSchedule } from "../schedules/AdminSchedule";
import { GrSchedulePlay } from 'react-icons/gr';

const team = new _Teams_();

export const ScheduleRouter = () =>{
    const { user } = useAuth();

    const navigate = useNavigate();

    const subMenu = [
        {
            title: 'Request Schedule',
            icon: MdOutlineScheduleSend,
            optionsTitle: null,
            options: null,
        },{
            title: 'See Schedule',
            icon: AiFillSchedule,
            optionsTitle: null,
            options: null,
        }
    ];

    useEffect(async()=>{
        return () =>{}
    }, []);

    return(
        <LayoutPageHandler subMenu={subMenu}>
            <Routes>
                <Route path="*" element={<AdminSchedule />} />
            </Routes>
        </LayoutPageHandler>
    )
}