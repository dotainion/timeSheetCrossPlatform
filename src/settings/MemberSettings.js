import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gender } from "../infrastructure/Gender";
import { Roles } from "../infrastructure/Roles";
import { Layout } from "../layout/Layout";
import { Users } from "../module/logic/Users";
import { Input } from "../widgets/Input";
import { AiOutlineEdit } from "react-icons/ai";
import $ from 'jquery';
import { Teams } from "../module/logic/Teams";
import profile from '../images/profile.jpg';


const _teams_ = new Teams();
const _members_ = new Users();

export const MemberSettings = () =>{
    const [usr, setUsr] = useState();
    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();
    const roleRef = useRef();
    const genderRef = useRef();
    const teamRef = useRef();

    const updateLocationState = (data) =>{
        const key = Object.keys(data)[0];
        location.state[key] = data[key];
        navigate(location.pathname, {state: location.state});
    }

    const updateRole = async(role, userId) =>{
        _members_.updateUser({role: role}, userId);
        updateLocationState({role: role});
    }

    const updateTeam = async(teamId, userId) =>{
        _members_.updateUser({teamId: teamId}, userId);
        updateLocationState({teamId: teamId});
    }

    const onUpdateProfile = async(data, userId) =>{
        _members_.updateUser(data, userId);
        updateLocationState(data);
    }

    useEffect(async()=>{
        if(!location.state){
            const userId = location.pathname?.split(':')?.[2];
            setUsr(await _members_.getById(userId));
        }else{
            setUsr(location.state);
        }
    }, []);

    useEffect(async()=>{
        if(!usr) return;

        const TTeams = await _teams_.getByClientId(usr?.clientId);
        setTeams(TTeams);
        
        firstNameRef.current.value = usr?.firstName;
        lastNameRef.current.value = usr?.lastName;
        numberRef.current.value = usr?.number;
        emailRef.current.value = usr?.email;
        roleRef.current.value = usr?.role;
        genderRef.current.value = usr?.gender;
        teamRef.current.value = usr?.teamId;

        firstNameRef.current.focus();
        lastNameRef.current.focus();
        numberRef.current.focus();
        emailRef.current.focus();
        genderRef.current.focus();

        $(firstNameRef.current).on('change', (e)=>onUpdateProfile({firstName: e.target.value}, usr?.id));
        $(lastNameRef.current).on('change', (e)=>onUpdateProfile({lastName: e.target.value}, usr?.id));
        $(numberRef.current).on('change', (e)=>onUpdateProfile({number: e.target.value}, usr?.id));
        $(emailRef.current).on('change', (e)=>onUpdateProfile({email: e.target.value}, usr?.id));
        $(roleRef.current).on('change', (e)=>onUpdateProfile({role: e.target.value}, usr?.id));
        $(teamRef.current).on('change', (e)=>onUpdateProfile({teamId: e.target.value}, usr?.id));
        $(genderRef.current).on('change', (e)=>onUpdateProfile({gender: e.target.value}, usr?.id));
    }, [usr]);

    return(
        <Layout>
            <div className="member-settings-container">
                <div data-nav-container>
                    <div data-nav data-no-pointer>
                        <AiOutlineEdit/>
                        <span>Edit Settings</span>
                    </div>
                    <div data-nav>
                        <select ref={roleRef}>
                            <option value={''}>unassign</option>
                            {(new Roles()).roles().map((role, key)=>(
                                <option key={key}>{role.title}</option>
                            ))}
                        </select>
                    </div>
                    <div data-nav>
                        <select ref={teamRef}>
                            <option value={''}>unassign</option>
                            {teams.map((team, key)=>(
                                <option value={team.id} key={key}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div data-profile-container>
                    <div data-header><h2>Profile</h2></div>
                    <div>
                        <img src={profile} />
                    </div>
                    <div data-inputs>
                        <Input inputRef={firstNameRef} title={'First Name'} />
                        <Input inputRef={lastNameRef} title={'Last Name'} />
                        <Input inputRef={numberRef} title={'Number'} type={'number'} />
                        <Input inputRef={emailRef} title={'Email Address'} />
                        <Input inputRef={genderRef} title={'Gender'} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}