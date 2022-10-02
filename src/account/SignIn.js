import React, { useEffect, useRef, useState } from "react";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import logo from '../images/logo.png';
import { Authenticate } from "../module/logic/Authenticate";
import { Validation } from "../infrastructure/Validation";
import $ from 'jquery';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Roles } from "../infrastructure/Roles";
import { Loading } from "../components/Loading";
import { AccountsContainer } from "./AccountsContainer";


const role = new Roles();
const auth = new Authenticate();
const validate = new Validation();

export const SignIn = () =>{
    const { isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);
    const [btnTitle, setBtnTitle] = useState('Send');

    const emailRef = useRef();
    const passwordRef = useRef();
    const recoveryEmailRef = useRef();
    
    const signInRef = useRef();
    const recoverRef = useRef();

    const recoverInfoRef = useRef();

    const navigate = useNavigate();

    const onSignIn = async() =>{
        setLoading(true);
        const response = await auth.signIn(emailRef.current.value, passwordRef.current.value);
        setLoading(false);
    }

    const onResetPassword = async() =>{
        setLoading(true);
        const response = await auth.resetPasswordViaEmail(recoveryEmailRef.current.value);
        if(!response) return setLoading(false);
        $(recoverInfoRef.current).show('fast');
        setBtnTitle('Re Send');
        setLoading(false);
    }

    const openRecovery = () =>{
        $(signInRef.current).hide('fast');
        $(recoverRef.current).show('fast');
        $(recoveryEmailRef.current).parent().css({border: ''});
    }

    const openSignIn = () =>{
        $(signInRef.current).show('fast');
        $(recoverRef.current).hide('fast');
        $(emailRef.current).parent().css({border: ''});
    }

    useEffect(()=>{
        if(!isAuthenticated) return;
        if((new Roles()).isSuperior(isAuthenticated?.role)) navigate(routes.admin());
        else if((new Roles()).isMember(isAuthenticated?.role)) navigate(routes.clockIn);
    }, [isAuthenticated]);

    return(
        <AccountsContainer>
            <div ref={signInRef} className="position-relative w-100 h-100">
                <div className="position-absolute start-50 top-50 translate-middle w-100">
                    <h4 className="my-4 text-center">Log in</h4>
                    <Input inputRef={emailRef} title="Email" type="email" />
                    <Input inputRef={passwordRef} title="Password" type="password" />
                    <div className="text-end mb-3 mt-3">
                        <span className="pointer text-danger" onClick={openRecovery}>Forget password?</span>
                        <div className="mt-1">
                            <span className="text-primary pointer" onClick={()=>navigate(routes.register)}>Create accoount</span>
                        </div>
                    </div>
                    <Button onClick={onSignIn} title="Login" useEnterKey blue />
                </div>
            </div>
            <div ref={recoverRef} className="position-relative w-100 h-100" style={{display: 'none'}}>
                <div className="position-absolute start-50 top-50 translate-middle w-100">
                    <h4>Recover Account</h4>
                    <div ref={recoverInfoRef} className="text-primary mb-4" style={{display: 'none'}}>
                        <div>Message sent. Please visit your email account for information on how to reset your password.</div>
                        <div className="small text-danger">Didn't get my email? Check Your email spam folder.</div>
                    </div>
                    <Input inputRef={recoveryEmailRef} title="Email" type="email" />
                    <div className="text-end mb-3 mt-3">
                        <span className="pointer text-primary" onClick={openSignIn}>Login instead</span>
                    </div>
                    <Button onClick={onResetPassword} title={btnTitle} blue />
                </div>
            </div>
        </AccountsContainer>
    )
}