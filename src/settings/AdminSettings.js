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
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { routes } from "../Routes/Routes";
import { GiSteampunkGoggles } from 'react-icons/gi';
import { FaGrinSquintTears } from 'react-icons/fa';
import { RiSettings3Fill } from 'react-icons/ri';
import { Loading } from "../components/Loading";


const _teams_ = new Teams();
const _members_ = new Users();
const _settings_ = new UserSetting();

export const AdminSettings = () =>{
    const { user } = useAuth();

    const [teams, setTeams] = useState([]);
    const [member, setMember] = useState({});
    const [processTeams, setProcessTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const roleRef = useRef();
    const teamRef = useRef();

    const subMenu = [
        {
            title: 'Users Settings',
            icon: RiSettings3Fill,
            optionsTitle: 'Select a members to see settings',
            toggle: false,
            options: processTeams,
        }
    ]

    const onUpdateProfile = async(data) =>{
        if(member?.id) return;
        _members_.updateUser(data, member?.id);
    }

    const userHandler = (_user_, defaultTitle = null) =>{
        _user_['title'] = defaultTitle ? defaultTitle : `${_user_.firstName} ${_user_.lastName}`;
        _user_['icon'] = GiSteampunkGoggles;
        _user_['onClick'] = ()=>navigate(`${routes.nested().adminSettings()}:${_user_?.id}`);
        return _user_;
    }

    useEffect(async()=>{
        let userId = location.pathname.split(':');
        userId = userId[userId.length -1];
        const mbr = await _members_.getById(userId);
        if(!mbr) return;
        setLoading(true);
        const userSetting = await _settings_.getSetting(mbr?.id);
        const TTeams = await _members_.getByClientId(mbr?.clientId);
        setMember(mbr);
        setTeams(TTeams);
        
        roleRef.current.value = mbr?.role || '';
        teamRef.current.value = mbr?.teamId || '';
        roleRef.current.focus();
        teamRef.current.focus();

        $(roleRef.current).on('change', (e)=>onUpdateProfile({role: e.target.value}));
        $(teamRef.current).on('change', (e)=>onUpdateProfile({teamId: e.target.value}));

        let mapMembers = [userHandler(JSON.parse(JSON.stringify(user)), 'Me')];
        TTeams.forEach((m)=>{
            if(user?.id === m?.id) return;
            mapMembers.push(userHandler(m));
        });
        setProcessTeams(mapMembers);
        setLoading(false);
    }, [location]);

    return(
        <LayoutPageHandler subMenu={subMenu}>
            <div className="m-3 mb-5">
                <div className="text-center border-bottom display-6 fw-bold p-2">{member.firstName+' '+member.lastName} Settings</div>
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
            <Loading loading={loading} />
        </LayoutPageHandler>
    )
}