import React, { useEffect, useRef, useState } from "react";
import { Gender } from "../infrastructure/Gender";
import { Users } from "../module/logic/Users";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Input } from "../widgets/Input";
import { Switch } from "../widgets/Switch";
import profileImage from '../images/stone.jpg';
import $ from 'jquery';
import { Button } from "../widgets/Button";
import { Validation } from "../infrastructure/Validation";
import { Authenticate } from "../module/logic/Authenticate";
import { ToastHandler } from "../infrastructure/ToastHandler";


const _members_ = new Users();
const auth = new Authenticate();
const validate = new Validation();
const toast = new ToastHandler();

export const Profile = ({ member }) =>{
    const { user } = useAuth();

    const [isCurrentUser, setIsCurrentUser] = useState();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();

    const passwordRef = useRef();
    const newPasswordRef = useRef();
    const conformPasswordRef = useRef();

    const onUpdateProfile = async(data) =>{
        if(!member?.id) return;
        await _members_.updateUser(data, member?.id);
    }

    const changePassword = async() =>{
        if(newPasswordRef.current.value !== conformPasswordRef.current.value){
            return toast.error('Password mismatch.');
        }
        const response = await auth.verifyPassword(emailRef.current.value, passwordRef.current.value);
        if(response !== false){
            await auth.changePassword(emailRef.current.value, newPasswordRef.current.value);
            passwordRef.current.value = '';
            newPasswordRef.current.value = '';
            conformPasswordRef.current.value = '';
            return toast.success('Password changed successfully.');
        }
        toast.error('Incorrect email or password.');
    }

    const disabledAccount = (checked) =>{
        if(!member?.id || isCurrentUser) return;
        console.log(checked);
    }

    const changeEmail = async(data) =>{
        const response = await auth.changeEmail(emailRef.current.value);
        if(response !== false){
            onUpdateProfile(data);
        }
    }
    useEffect(()=>{        
        firstNameRef.current.value = member?.firstName || '';
        lastNameRef.current.value = member?.lastName || '';
        numberRef.current.value = member?.number || '';
        emailRef.current.value = member?.email || '';
        genderRef.current.value = member?.gender || '';

        firstNameRef.current.focus();
        lastNameRef.current.focus();
        numberRef.current.focus();
        emailRef.current.focus();
        genderRef.current.focus();

        $(firstNameRef.current).on('change', (e)=>onUpdateProfile({firstName: e.target.value}));
        $(lastNameRef.current).on('change', (e)=>onUpdateProfile({lastName: e.target.value}));
        $(numberRef.current).on('change', (e)=>onUpdateProfile({number: e.target.value}));
        $(emailRef.current).on('change', (e)=>changeEmail({email: e.target.value}));
        $(genderRef.current).on('change', (e)=>onUpdateProfile({gender: e.target.value}));
    
        if(!member?.id) return;
        setIsCurrentUser(user?.id === member?.id);
    }, [member]);

    return (
        <div className="col-md-10 m-md-auto px-2">
            <div className="d-md-flex">
                <div className="w-100 bg-white m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                    <img src={profileImage} className="w-100 mb-3" alt="" />
                    <div className="p-3">
                        <Input inputRef={firstNameRef} title={'First Name'} />
                        <Input inputRef={lastNameRef} title={'Last Name'} />
                        <Input inputRef={numberRef} title={'Number'} type={'number'} />
                        <Input inputRef={genderRef} title={'Gender'} options={(new Gender()).genders()} />
                    </div>
                </div>
                <div className="w-100 p-3 bg-white m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                    <div className="fw-bold fs-4 mt-5 text-center">Accounts</div>
                    <div className="fw-bold mt-4 mb-3 text-secondary">To change password enter your current one.</div>
                    <Input inputRef={passwordRef} title={'Current Password'} type={'password'} />
                    <div className="fw-bold mt-4 mb-3 text-secondary">Change your new password.</div>
                    <Input inputRef={newPasswordRef} title={'New Password'} type={'password'} />
                    <Input inputRef={conformPasswordRef} title={'Confirm Password'} type={'password'} />
                    <Button onClick={changePassword} title={'Change Password'} cssClass="mt-3" />
                </div>
            </div>
            <div className="d-md-flex">
                <div className="w-100 bg-white m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                    <div className="p-3">
                        <div className="fw-bold text-secondary">Disable Account</div>
                        <div className="text-secondary">This user will not be able to log in if disabed.</div>
                        <Switch onChange={disabledAccount} on={'Enabled'} off={'Disabled'} disabled={isCurrentUser} />
                    </div>
                </div>
                <div className="w-100 p-3 bg-white m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                    <div className="fw-bold mt-2 mb-3 text-secondary">Change email address.</div>
                    <Input inputRef={emailRef} title={'Email Address'} />
                </div>
            </div>
        </div>
    )
}