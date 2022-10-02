import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutPageHandler } from '../layout/LayoutPageHandler';
import { routes } from '../Routes/Routes';
import { BsFillPersonFill } from 'react-icons/bs';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthenticationWrapper';
import { Teams } from '../module/logic/Teams';
import { MessageWelcome } from './MessageWelcome';
import { MessageCommunicate } from './MessageCommunicate';
import { MessageNavbar } from './MessageNavbar';
import $ from 'jquery';

const _team_ = new Teams();

export const Messages = () =>{

    useEffect(async()=>{
        
    }, []);
    return(
        <MessageNavbar>
            <Routes>
                <Route path="*" element={<MessageWelcome/>} />
                <Route path={routes.route().userMessage()} element={<MessageCommunicate/>} />
            </Routes>
        </MessageNavbar>
    )
}

