import React, { useEffect, useRef } from "react";
import { Gender } from "../infrastructure/Gender";
import { Users } from "../module/logic/Users";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Input } from "../widgets/Input";
import { Switch } from "../widgets/Switch";
import $ from 'jquery';


const _members_ = new Users();

export const Profile = () =>{
    const { user } = useAuth();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();

    const onUpdateProfile = async(data) =>{
        _members_.updateUser(data, user?.id);
    }

    useEffect(()=>{        
        firstNameRef.current.value = user?.firstName || '';
        lastNameRef.current.value = user?.lastName || '';
        numberRef.current.value = user?.number || '';
        emailRef.current.value = user?.email || '';
        genderRef.current.value = user?.gender || '';

        firstNameRef.current.focus();
        lastNameRef.current.focus();
        numberRef.current.focus();
        emailRef.current.focus();
        genderRef.current.focus();

        $(firstNameRef.current).on('change', (e)=>onUpdateProfile({firstName: e.target.value}));
        $(lastNameRef.current).on('change', (e)=>onUpdateProfile({lastName: e.target.value}));
        $(numberRef.current).on('change', (e)=>onUpdateProfile({number: e.target.value}));
        $(emailRef.current).on('change', (e)=>onUpdateProfile({email: e.target.value}));
        $(genderRef.current).on('change', (e)=>onUpdateProfile({gender: e.target.value}));
    }, []);

    return (
        <div>
            <div className="col-md-6 m-auto">
                <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                    <Input inputRef={firstNameRef} title={'First Name'} />
                    <Input inputRef={lastNameRef} title={'Last Name'} />
                    <Input inputRef={numberRef} title={'Number'} type={'number'} />
                    <Input inputRef={emailRef} title={'Email Address'} />
                    <Input inputRef={genderRef} title={'Gender'} options={(new Gender()).genders()} />
                </div>
                <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                    <h5>Disable</h5>
                    <p className="text-secondary">This user will not be able to log in if disabed.</p>
                    <label>
                        <Switch />
                    </label>
                </div>
            </div>
        </div>
    )
}