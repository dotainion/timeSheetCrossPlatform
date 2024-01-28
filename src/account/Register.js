import React, { useEffect, useRef, useState } from "react";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import logo from '../images/logo.png';
import { Authenticate } from "../module/logic/Authenticate";
import { Validation } from "../infrastructure/Validation";
import $ from 'jquery';
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Roles } from "../infrastructure/Roles";
import { AccountsContainer } from "./AccountsContainer";
import { Registration } from "../module/logic/Registration";
import { useProvider } from "../provider/ProviderWrapper";
import { Account } from "../module/logic/Account";
import { ToastHandler } from "../infrastructure/ToastHandler";



const auth = new Authenticate();
const account = new Account();

export const Register = () =>{
    const { isAuthenticated } = useAuth();
    const { registrationMatch } = useProvider();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const companyNameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef(); 

    const onRegister = async() =>{
        setLoading(true);
        await auth.register(
            firstNameRef.current.value, 
            lastNameRef.current.value, 
            emailRef.current.value, 
            companyNameRef.current.value, 
            passwordRef.current.value, 
            confirmPasswordRef.current.value,
        );
        setLoading(false);
    }

    useEffect(async()=>{
        if(!isAuthenticated) return;        
        if((new Roles()).isSuperior(isAuthenticated?.role)) navigate(routes.admin());
        else if((new Roles()).isMember(isAuthenticated?.role)) navigate(routes.clockIn);
    }, [isAuthenticated]);

    useEffect(async()=>$('.input-entery').css({backgroundColor: 'transparent'}), []);

    useEffect(()=>{
        if(isAuthenticated) navigate(routes.default);
        if(registrationMatch) return;
        navigate(routes.registration);
    }, [registrationMatch]);

    return(
        <AccountsContainer loading={loading}>
            <h2 className="my-4 text-center fw-bold">Creat an account</h2>
            <Input inputRef={firstNameRef} title="First Name" type="text" />
            <Input inputRef={lastNameRef} title="Last Name" type="text" />
            <Input inputRef={companyNameRef} title="Company Name" type="text" />
            <Input inputRef={emailRef} title="Email" type="email" />
            <Input inputRef={passwordRef} title="Password" type="password" />
            <Input inputRef={confirmPasswordRef} title="Conform Password" type="password" />
            <div className="text-end mb-3 mt-3 mb-2">
                <span className="text-primary pointer" onClick={()=>navigate(routes.signIn)}>Login instead</span>
            </div>
            <Button onClick={onRegister} title="Create" blue />
        </AccountsContainer>
    )
}