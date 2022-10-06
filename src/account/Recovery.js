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


const role = new Roles();
const auth = new Authenticate();
const validate = new Validation();

export const Recovery = () =>{
    const { isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);
    const [btnTitle, setBtnTitle] = useState('Send');

    const recoveryEmailRef = useRef();
    const recoverInfoRef = useRef();

    const navigate = useNavigate();

    const onResetPassword = async() =>{
        setLoading(true);
        const response = await auth.resetPasswordViaEmail(recoveryEmailRef.current.value);
        if(!response){
            $(recoveryEmailRef.current).parent().addClass('border-danger');
            return setLoading(false);
        }
        $(recoverInfoRef.current).show('fast');
        setBtnTitle('Re Send');
        setLoading(false);
    }

    useEffect(()=>{
        if(!isAuthenticated) return;
        if((new Roles()).isSuperior(isAuthenticated?.role)) navigate(routes.admin());
        else if((new Roles()).isMember(isAuthenticated?.role)) navigate(routes.clockIn);
    }, [isAuthenticated]);

    useEffect(()=>{
        $(recoveryEmailRef.current).focus((e)=>$(e.target).parent().removeClass('border-danger'));
    }, []);

    return(
        <AccountsContainer loading={loading}>
            <div className="position-relative w-100 h-100">
                <div className="position-absolute start-50 top-50 translate-middle w-100">
                    <h4 className="my-4 text-center fw-bold">Recover Account</h4>
                    <div ref={recoverInfoRef} className="text-primary mb-4" style={{display: 'none'}}>
                        <div>Message sent. Please visit your email account for information on how to reset your password.</div>
                        <div className="small text-danger">Didn't get my email? Check Your email spam folder.</div>
                    </div>
                    <Input inputRef={recoveryEmailRef} title="Email" type="email" />
                    <div className="text-end mb-3 mt-3">
                        <span className="pointer text-primary" onClick={()=>navigate(routes.signIn)}>Login instead</span>
                    </div>
                    <Button onClick={onResetPassword} title={btnTitle} blue />
                </div>
            </div>
        </AccountsContainer>
    )
}