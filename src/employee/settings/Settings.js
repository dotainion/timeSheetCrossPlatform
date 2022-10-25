import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gender } from "../../infrastructure/Gender";
import { Roles } from "../../infrastructure/Roles";
import { Users } from "../../module/logic/Users";
import { Input } from "../../widgets/Input";
import { AiOutlineEdit } from "react-icons/ai";
import $ from 'jquery';
import { Teams } from "../../module/logic/Teams";
import { Switch } from "../../widgets/Switch";
import { Button } from "../../widgets/Button";
import { UserSetting } from "../../module/logic/UserSetting";
import { UserLayout } from "../layout/UserLayout";
import { useAuth } from "../../provider/AuthenticationWrapper";


const _teams_ = new Teams();
const _members_ = new Users();
const _settings_ = new UserSetting();

export const Settings = () =>{
    const { user } = useAuth();

    const [team, setTeam] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();

    const updateLocationState = (data) =>{
        if(!location.state) return;
        const key = Object.keys(data)[0];
        location.state[key] = data[key];
        navigate(location.pathname, {state: location.state});
    }

    const onUpdateProfile = async(data) =>{
        _members_.updateUser(data, user?.id);
        updateLocationState(data);
    }

    useEffect(async()=>{
        const currentTeam = await _teams_.getById(user?.teamId);
        setTeam(currentTeam);

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

    return(
        <UserLayout>
            <div className="m-3 mb-5">
                <div className="text-center border-bottom"><h2>Profile</h2></div>
                <div className="col-md-6 m-auto">
                    <div>
                        <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                            <Input inputRef={firstNameRef} title={'First Name'} />
                            <Input inputRef={lastNameRef} title={'Last Name'} />
                            <Input inputRef={numberRef} title={'Number'} type={'number'} />
                            <Input inputRef={emailRef} title={'Email Address'} />
                            <Input inputRef={genderRef} title={'Gender'} options={(new Gender()).genders()} />
                        </div>
                    </div>
                    <div>
                        <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                            <h5>Role</h5>
                            <p className="text-secondary">The behaviour expected of an individual who occupies a given position or status.</p>
                            <div className="ps-3 border-bottom">{user?.role}</div>
                        </div>
                        <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                            <h5>Team</h5>
                            <p className="text-secondary">A group of people who perform interdependent tasks to work toward accomplishing a common mission or specific objective.</p>
                            <div className="ps-3 border-bottom">{team?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}