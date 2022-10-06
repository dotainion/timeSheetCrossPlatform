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



const auth = new Authenticate();
const registration = new Registration();;

export const Registrations = () =>{
    const { isAuthenticated } = useAuth();
    const { registrationMatch, setRegistrationMatch } = useProvider();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const radioKeyRef = useRef();
    const radioEmailRef = useRef();
    const sixtyDaysTrialRef = useRef();
    const registrationKeyRef = useRef();

    const onRegistationKey = async() =>{
        setLoading(true);
        $(registrationKeyRef.current).css({border: ''});
        $(sixtyDaysTrialRef.current).css({border: ''});
        if(radioKeyRef.current.checked){
            if(registration.hasMatch()){
                setRegistrationMatch(true);
            }else{
                registrationKeyRef.current.style.border = '1px solid red';
            }
        }else if(radioEmailRef.current.checked){
            if(sixtyDaysTrialRef.current.value){
                
            }else{

            }
        }else{
            $(radioKeyRef.current).parent().css({border: '1px solid red'});
            $(radioEmailRef.current).parent().css({border: '1px solid red'});
        }
        setLoading(false);
    }   

    useEffect(async()=>{ 
        setLoading(true);
        await registration.initializeRegistration(registrationKeyRef.current);
        $(registrationKeyRef.current).focus((e)=>$(e.target).css({border: ''}));
        $(sixtyDaysTrialRef.current).focus((e)=>$(e.target).css({border: ''}));
        setLoading(false);
    }, []);

    useEffect(()=>{
        if(!registrationMatch) return;
        navigate(routes.register);
    }, [registrationMatch]);

    return(
        <AccountsContainer loading={loading}>
            <div className="position-absolute start-50 top-50 translate-middle">
                <h2 className="mb-4 text-center fw-bold">Registration</h2>
                <div>
                    <label className="d-flex align-items-center pointer mb-2">
                        <input ref={radioKeyRef} className="pointer" type={'radio'} name="registration-key" checked onChange={()=>null} />
                        <span className="ms-2">I have a Registration Key</span>
                    </label>
                    <div className="d-flex align-items-center">
                        <label className="fw-bold me-2 text-nowrap" style={{width: '55px'}}>Key</label>
                        <input ref={registrationKeyRef} className="w-100 form-control"  placeholder="ENTER REGISTRATION KEY"/>
                    </div>
                </div>
                <div className="mt-5">
                    <label className="d-flex align-items-center pointer mb-2 text-nowrap">
                        <input ref={radioEmailRef} className="pointer" type={'radio'} name="registration-key" disabled />
                        <span className="ms-2 text-muted">Register for a fully functional 60 Days Trial</span>
                    </label>
                    <div className="d-flex align-items-center">
                        <label className="fw-bold me-2 text-nowrap text-muted" style={{width: '55px'}}>Email</label>
                        <input ref={sixtyDaysTrialRef} className="w-100 form-control" disabled />
                    </div>
                </div>
                <div className="d-flex align-items-center mt-5 float-end">
                    <span className="float-end text-primary pointer" onClick={()=>navigate(routes.signIn)}>Login</span>
                    <span className="ms-5">
                        <Button onClick={onRegistationKey} title="Register Now" blue />
                    </span>
                </div>
            </div>
        </AccountsContainer>
    )
}