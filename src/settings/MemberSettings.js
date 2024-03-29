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
import { Switch } from "../widgets/Switch";
import { LayoutPageHandler } from "../layout/LayoutPageHandler";
import { Button } from "../widgets/Button";
import { UserSetting } from "../module/logic/UserSetting";


const _teams_ = new Teams();
const _members_ = new Users();
const _settings_ = new UserSetting();

export const MemberSettings = () =>{
    const [usr, setUsr] = useState();
    const [teams, setTeams] = useState([]);
    const [settings, setSettings] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();
    const roleRef = useRef();
    const genderRef = useRef();
    const teamRef = useRef();
    const spreadsheetRef = useRef();

    const updateLocationState = (data) =>{
        if(!location.state) return;
        const key = Object.keys(data)[0];
        location.state[key] = data[key];
        navigate(location.pathname, {state: location.state});
    }

    const onUpdateProfile = async(data, userId) =>{
        _members_.updateUser(data, userId);
        updateLocationState(data);
    }

    const splitSpeadSheetUrl = (data, userId) =>{
        const urlList = data.spreadsheetUrl?.split('/');
        const spreadsheetId = urlList?.[5];
        if(!spreadsheetId) return;
        updateSettings({spreadsheetId}, userId);
    }

    const updateSettings = (data, userId) =>{
        const key = Object.keys(data)[0];
        let cloneSetting = Object.keys(JSON.parse(JSON.stringify(settings || {})));
        cloneSetting[key] = data[key];
        cloneSetting['clientId'] = usr?.clientId;
        cloneSetting['url'] = spreadsheetRef.current.value;
        _settings_.addSetting(cloneSetting, userId);
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

        const userSetting = await _settings_.getSetting(usr?.id);
        setSettings(userSetting || {});
        const TTeams = await _teams_.getByClientId(usr?.clientId);
        setTeams(TTeams.list());
        
        firstNameRef.current.value = usr?.firstName || '';
        lastNameRef.current.value = usr?.lastName || '';
        numberRef.current.value = usr?.number || '';
        emailRef.current.value = usr?.email || '';
        roleRef.current.value = usr?.role || '';
        genderRef.current.value = usr?.gender || '';
        teamRef.current.value = usr?.teamId || '';

        spreadsheetRef.current.value = userSetting?.url || '';

        firstNameRef.current.focus();
        lastNameRef.current.focus();
        numberRef.current.focus();
        emailRef.current.focus();
        genderRef.current.focus();
        roleRef.current.focus();

        spreadsheetRef.current.focus();

        $(firstNameRef.current).on('change', (e)=>onUpdateProfile({firstName: e.target.value}, usr?.id));
        $(lastNameRef.current).on('change', (e)=>onUpdateProfile({lastName: e.target.value}, usr?.id));
        $(numberRef.current).on('change', (e)=>onUpdateProfile({number: e.target.value}, usr?.id));
        $(emailRef.current).on('change', (e)=>onUpdateProfile({email: e.target.value}, usr?.id));
        $(roleRef.current).on('change', (e)=>onUpdateProfile({role: e.target.value}, usr?.id));
        $(teamRef.current).on('change', (e)=>onUpdateProfile({teamId: e.target.value}, usr?.id));
        $(genderRef.current).on('change', (e)=>onUpdateProfile({gender: e.target.value}, usr?.id));

        $(spreadsheetRef.current).on('change', (e)=>splitSpeadSheetUrl({spreadsheetUrl: e.target.value}, usr?.id));
    }, [usr]);

    return(
        <LayoutPageHandler>
            <div className="m-3 mb-5">
                <div className="row bg-white p-2 m-md-3 mb-3 mt-3 rounded-3 shadow-sm"><h2>Profile</h2></div>
                <div className="d-md-flex">
                    <div>
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
                            <Switch />
                        </div>
                    </div>
                    <div>
                        <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                            <h5>Role</h5>
                            <p className="text-secondary">The behaviour expected of an individual who occupies a given position or status.</p>
                            <Input inputRef={roleRef} title={'User Role'} options={(new Roles()).roles()} />
                        </div>
                        <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                            <h5>Team</h5>
                            <p className="text-secondary">A group of people who perform interdependent tasks to work toward accomplishing a common mission or specific objective.</p>
                            <Input inputRef={teamRef} options={teams} />
                        </div>
                        <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                            <h5>Title</h5>
                            <p className="text-secondary">You can upgrade to a custom domain to make your site more memberable SSL.</p>
                            <Input title={'Pay Rate'} />
                        </div>
                    </div>
                </div>
                <div className="row bg-white p-2 m-md-3 mb-3 mt-3 rounded-3 shadow-sm"><h2>Settings</h2></div>
                <div>
                    <div className="row bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                        <h5>Spreadsheet</h5>
                        <p className="text-secondary">Enter the spreadsheet url you will like to get access to.</p>
                        <Input inputRef={spreadsheetRef} title={'Enter spreadsheet url here'} cssClass="mb-4" />
                        <Button onClick={()=>splitSpeadSheetUrl({spreadsheetUrl: spreadsheetRef.current.value}, usr?.id)} title={'Save'} />
                    </div>
                </div>
            </div>
        </LayoutPageHandler>
    )
}