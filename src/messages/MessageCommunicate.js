import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MessageNavbar } from "./MessageNavbar";
import { IoSendSharp } from 'react-icons/io5';
import { useLayout } from "../layout/Layout";
import $ from 'jquery';
import { Users } from "../module/logic/Users";
import { useLocation } from "react-router-dom";

const _user_ = new Users();

export const MessageCommunicate = () =>{
    const { topMenuSize } = useLayout();

    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState([]);

    const location = useLocation();

    const msgRef = useRef();

    const sendMessage = () =>{
        if(msgRef.current.value){
            setMessages((msg)=>[...msg, {message: msgRef.current.value}]);
        }else{
            $(msgRef.current).parent().removeClass('bg-dark').css({backgroundColor: 'LightCoral'});
            $(msgRef.current).fadeOut('fast').fadeIn('fast').fadeOut('fast').fadeIn('fast');
            setTimeout(()=>$(msgRef.current).parent().addClass('bg-dark').css({backgroundColor: ''}), 800);
        }
    }
    
    useEffect(async()=>{
        $(msgRef.current).keypress((e)=>{e.key === 'Enter' && sendMessage()});
        const userUrl = location.pathname.split('/')[4];
        const userId = userUrl.split(':')[2];
        setUser(await _user_.getById(userId));
    }, []);

    return(
        <div>
            <div className="overflow-auto" style={{height: '85vh'}}>
                {
                    messages.length ?
                    messages.map((msg, key)=>(
                        <div className="d-flex" key={key}>
                            <div><CgProfile className="fs-1 m-2" /></div>
                            <div className="me-2 pt-2">
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    )):
                    <div className="text-center mt-5">
                        <div className="display-6">Send your first message to:</div>
                        <div className="fw-bold display-6">{user.firstName} {user.lastName}</div>
                    </div>
                }
            </div>
            
            <div className="ms-2 mt-3">
                <div className="d-flex form-group rounded align-items-center text-light bg-dark bottom-0 w-100">
                    <input ref={msgRef} type="text" className="p-3 text-light bg-dark border-0 w-100" placeholder="Enter your message here"/>
                    <IoSendSharp onClick={sendMessage} className="ms-3 me-3 fs-3 pointer" />
                </div>
            </div>
        </div>
    )
}