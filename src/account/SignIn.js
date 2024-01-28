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
import { onAuthStateChanged } from "firebase/auth";
import { useProvider } from "../provider/ProviderWrapper";


const role = new Roles();
const auth = new Authenticate();
const validate = new Validation();

export const SignIn = () =>{
    const { user, isAuthenticated } = useAuth();
    const { registrationMatch } = useProvider();

    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const onSignIn = async() =>{
        setLoading(true);
        $(emailRef.current).parent().removeClass('border-danger');
        $(passwordRef.current).parent().removeClass('border-danger');
        if(!emailRef.current.value){
            $(emailRef.current).parent().addClass('border-danger');
        }
        if(!passwordRef.current.value){
            $(passwordRef.current).parent().addClass('border-danger');
        }
        const response = await auth.signIn(emailRef.current.value, passwordRef.current.value);
        if(auth.errorLog()?.includes('not found')){
            $(emailRef.current).parent().addClass('border-danger');
        }else{
            $(passwordRef.current).parent().addClass('border-danger');
        }
        setLoading(false);
    }

    const navigateToRegistration = () =>{
        if(registrationMatch) return navigate(routes.register);
        navigate(routes.registration);
    }

    useEffect(()=>{
        if(!isAuthenticated) return;
        if((new Roles()).isSuperior(isAuthenticated?.role)) navigate(routes.admin());
        else if((new Roles()).isMember(isAuthenticated?.role)) navigate(routes.clockIn);
    }, [isAuthenticated, user]);

    useEffect(()=>{
        $(emailRef.current).focus((e)=>$(e.target).parent().removeClass('border-danger'));
        $(passwordRef.current).focus((e)=>$(e.target).parent().removeClass('border-danger'));
    }, []);

    return(
        <AccountsContainer loading={loading}>
            <div className="position-relative w-100 h-100">
                <div className="position-absolute start-50 top-50 translate-middle w-100">
                    <h2 className="my-4 text-center fw-bold">Log in</h2>
                    <Input inputRef={emailRef} title="Email" cssClass={''} type="email" />
                    <Input inputRef={passwordRef} title="Password" cssClass={''} type="password" />
                    <div className="text-end mb-3 mt-3">
                        <span className="pointer text-danger" onClick={()=>navigate(routes.recovery)}>Forget password?</span>
                        <div className="mt-1">
                            <span className="text-primary pointer" onClick={navigateToRegistration}>Create accoount</span>
                        </div>
                    </div>
                    <Button onClick={()=>onSignIn()} title="Login" useEnterKey blue />
                </div>
            </div>
        </AccountsContainer>
    )
}