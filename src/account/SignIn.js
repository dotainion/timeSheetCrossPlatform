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


const role = new Roles();
const auth = new Authenticate();
const validate = new Validation();

export const SignIn = () =>{
    const { isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const recoveryEmailRef = useRef();
    
    const signInRef = useRef();
    const recoverRef = useRef();

    const navigate = useNavigate();

    const onSignIn = async() =>{
        setLoading(true);
        const response = await auth.signIn(emailRef.current.value, passwordRef.current.value);
        setLoading(false);
    }

    const onResetPassword = async() =>{
        setLoading(true);
        await auth.resetPasswordViaEmail(recoveryEmailRef.current.value);
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
                    <div ref={signInRef} className="relative">
                        <div className="float-center">
                            <h4>Log in</h4>
                            <Input inputRef={emailRef} title="Email" type="email" />
                            <Input inputRef={passwordRef} title="Password" type="password" />
                            <div className="sign-in-forget-pss">
                                <span onClick={openRecovery}>Forget password?</span>
                                <div style={{color: 'dodgerblue'}}>
                                    <span onClick={()=>navigate(routes.register)}>Create accoount</span>
                                </div>
                            </div>
                            <Button onClick={onSignIn} title="Login" loading={loading} useEnterKey />
                        </div>
                    </div>
                    <div ref={recoverRef} className="relative" hidden>
                        <div className="float-center">
                            <h4>Recover Account</h4>
                            <Input inputRef={recoveryEmailRef} title="Email" type="email" />
                            <div className="sign-in-forget-pss">
                                <span onClick={openSignIn} style={{color: 'dodgerblue'}}>Login instead</span>
                            </div>
                            <Button onClick={onResetPassword} title="Send" loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}