import React, { useEffect, useState } from "react";
import { ButtonCard } from "../widgets/ButtonCard";
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import img from '../images/lamp.gif';
import { useAuth } from "../provider/AuthenticationWrapper";
import { Account } from "../module/logic/Account";
import { AccountsContainer } from "./AccountsContainer";
import { useAccounts } from "../provider/AccountsWrapper";
import { Roles } from "../infrastructure/Roles";
import { routes } from "../Routes/Routes";
import { useNavigate } from "react-router-dom";

const account = new Account();
const roles = new Roles();

export const AccountSignIn = () =>{
    const { user, isAuthenticated } = useAuth();
    const { accounts, selectNewAccount, loading } = useAccounts();

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated) return;
        if(roles.isSuperior(isAuthenticated?.role)) navigate(routes.admin());
        else if(roles.isMember(isAuthenticated?.role)) navigate(routes.clockIn);
    }, [isAuthenticated, user]);
    
    return(
        <AccountsContainer loading={loading}>
            <div className="fs-4 px-2 text-dark text-center">Choose an account</div>
            <div className="justify-content-center overflow-auto h-100">
                {
                    accounts.length?
                    accounts.map((acc, key)=>(
                        <div className="d-inline-block px-0 w-50" key={key}>
                            <div onClick={()=>selectNewAccount(acc)} className="card m-2 pointer bg-primary text-light h-scale">
                                <img src={img} className="w-100" alt="" style={{height: '80px'}} />
                                <div className="p-1">
                                    <div className="text-truncate">{acc.name}</div>
                                </div>
                            </div>
                        </div> 
                    )):
                    <div className="text-center text-info position-absolute top-50 start-50 translate-middle w-100">
                        <div className="fs-6 fw-bold">You are not yet assign to any account</div>
                        <div className="fs-6">Contact you administrator for assistance</div>
                        <div className="d-flex mt-5">
                            <div className="fs-6 w-50 text-end me-2">
                                <span onClick={()=>navigate(routes.signIn)} className="pointer text-primary">Sign In</span>
                            </div>
                            <div className="fs-6 w-50 text-start ms-2">
                                <span onClick={()=>navigate(routes.register)} className="pointer text-primary">Register</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </AccountsContainer>
    )
}