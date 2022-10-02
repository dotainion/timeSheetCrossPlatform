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



const auth = new Authenticate();

export const Register = () =>{
    const { isAuthenticated } = useAuth();

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
            companyNameRef.current.value, 
            emailRef.current.value, 
            passwordRef.current.value, 
            confirmPasswordRef.current.value,
            ()=> null
        );
        setLoading(false);
    }

    useEffect(()=>{
        if(!isAuthenticated) return;
        if((new Roles()).isSuperior(isAuthenticated?.role)) navigate(routes.admin());
        else if((new Roles()).isMember(isAuthenticated?.role)) navigate(routes.clockIn);
    }, [isAuthenticated]);

    useEffect(()=> $('.input-entery').css({backgroundColor: 'transparent'}), []);

    return(
        <AccountsContainer>
            <h4 className="my-4 text-center">Creat an account</h4>
            <Input inputRef={firstNameRef} title="First Name" type="name" />
            <Input inputRef={lastNameRef} title="Last Name" type="name" />
            <Input inputRef={companyNameRef} title="Company Name" type="name" />
            <Input inputRef={emailRef} title="Email" type="email" />
            <Input inputRef={passwordRef} title="Password" type="password" />
            <Input inputRef={confirmPasswordRef} title="Conform Password" type="password" />
            <div className="text-end mb-3 mt-3 mb-2">
                <span className="text-primary pointer" onClick={()=>navigate(routes.signIn)}>Login instead</span>
            </div>
            <Button onClick={onRegister} title="Create" useEnterKey blue />
        </AccountsContainer>
    )
}