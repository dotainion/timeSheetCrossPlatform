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



const auth = new Authenticate();

export const Register = () =>{
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
            ()=> navigate(routes.dashboard)
        );
        setLoading(false);
    }

    useEffect(()=>{
        $('.input-entery').css({backgroundColor: 'transparent'})
    }, []);

    return(
        <div className="sign-in-container">
            <div className="sign-in-card">
                <div className="sign-in-side-l">
                    <div className="sign-in-logo-container">
                        <img src={logo} draggable={false} />
                    </div>
                </div>
                <div className="sign-in-side-r">
                    <h4>Creat an account</h4>
                    <Input inputRef={firstNameRef} title="First Name" type="name" />
                    <Input inputRef={lastNameRef} title="Last Name" type="name" />
                    <Input inputRef={companyNameRef} title="Company Name" type="name" />
                    <Input inputRef={emailRef} title="Email" type="email" />
                    <Input inputRef={passwordRef} title="Password" type="password" />
                    <Input inputRef={confirmPasswordRef} title="Conform Password" type="password" />
                    <div className="sign-in-forget-pss">
                        <span onClick={()=>navigate(routes.signIn)} style={{color: 'dodgerblue'}}>Login instead</span>
                    </div>
                    <Button onClick={onRegister} title="Login" />
                </div>
            </div>
            <Loading loading={loading} />
        </div>
    )
}