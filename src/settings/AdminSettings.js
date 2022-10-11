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
import { useAuth } from "../provider/AuthenticationWrapper";


const _teams_ = new Teams();
const _members_ = new Users();
const _settings_ = new UserSetting();

export const AdminSettings = () =>{
    const { user } = useAuth();

    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const roleRef = useRef();
    const teamRef = useRef();

    const onUpdateProfile = async(data) =>{
        _members_.updateUser(data, user?.id);
    }

    useEffect(async()=>{
        const userSetting = await _settings_.getSetting(user?.id);
        const TTeams = await _teams_.getByClientId(user?.clientId);
        setTeams(TTeams);
        
        roleRef.current.value = user?.role || '';
        teamRef.current.value = user?.teamId || '';
        roleRef.current.focus();
        teamRef.current.focus();

        $(roleRef.current).on('change', (e)=>onUpdateProfile({role: e.target.value}));
        $(teamRef.current).on('change', (e)=>onUpdateProfile({teamId: e.target.value}));
    }, []);

    return(
        <LayoutPageHandler>
            <div className="mb-5 mbr-settings">
                <div className="text-center border-bottom display-6 fw-bold p-2">Settings</div>
                <div className="col-md-6 m-auto">
                    <div className="bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                        <h5>Role</h5>
                        <p className="text-secondary">The behaviour expected of an individual who occupies a given position or status.</p>
                        <Input inputRef={roleRef} title={'User Role'} options={(new Roles()).roles()} />
                    </div>
                    <div className="bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                        <h5>Team</h5>
                        <p className="text-secondary">A group of people who perform interdependent tasks to work toward accomplishing a common mission or specific objective.</p>
                        <Input inputRef={teamRef} options={teams} />
                    </div>
                    <div className="bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                        <h5>Rate Per Hour</h5>
                        <p className="text-secondary">You can upgrade to a custom domain to make your site more memberable SSL.</p>
                        <Input title={'Pay Rate'} />
                    </div>
                    <div className="bg-white p-3 m-md-3 mb-3 mt-3 rounded-3 shadow-sm">
                        <h5>Disable</h5>
                        <p className="text-secondary">This user will not be able to log in if disabed.</p>
                        <Switch />
                    </div>
                </div>
            </div>
        </LayoutPageHandler>
    )
}