import React, { useEffect, useRef, useState } from "react";
import { Profile } from "./Profile";
import { Input } from "../widgets/Input";
import $ from 'jquery';
import { LayoutPageHandler } from "../layout/LayoutPageHandler";
import { RiSettings3Fill } from 'react-icons/ri';
import { UserSetting } from "../module/logic/UserSetting";
import { Users } from "../module/logic/Users";
import { Teams } from "../module/logic/Teams";
import { useAuth } from "../provider/AuthenticationWrapper";
import { GiSteampunkGoggles } from 'react-icons/gi';
import { routes } from "../Routes/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useAccounts } from "../provider/AccountsWrapper";

const _teams_ = new Teams();
const _members_ = new Users();
const _settings_ = new UserSetting();

export const AdminProfile = () =>{
    const { user } = useAuth();
    const { account } = useAccounts();

    const navigate = useNavigate();
    const location = useLocation();

    const [member, setMember] = useState({});
    const [loading, setLoading] = useState(false);
    const [processTeams, setProcessTeams] = useState([]);

    const subMenu = [
        {
            title: 'Users Settings',
            icon: RiSettings3Fill,
            optionsTitle: 'Select a members to see settings',
            toggle: false,
            options: processTeams,
        }
    ];

    const userHandler = (_user_, defaultTitle = null) =>{
        _user_['title'] = defaultTitle ? defaultTitle : `${_user_.firstName} ${_user_.lastName}`;
        _user_['icon'] = GiSteampunkGoggles;
        _user_['onClick'] = ()=>navigate(`${routes.nested().adminProfile()}:${_user_?.id}`);
        return _user_;
    }

    useEffect(async()=>{
        let userId = location.pathname.split(':');
        userId = userId[userId.length -1];
        const mbr = await _members_.getById(userId);
        if(!mbr) return;
        setLoading(true);
        setMember(mbr);
        const userSetting = await _settings_.getSetting(mbr?.id);
        const teamCollector = await _members_.getByAccountId(account?.id);

        let mapMembers = [userHandler(JSON.parse(JSON.stringify(user)), 'Me')];
        teamCollector.list().forEach((m)=>{
            if(user?.id === m?.id) return;
            mapMembers.push(userHandler(m));
        });
        setProcessTeams(mapMembers);
        setLoading(false);
    }, [location]);

    return (
        <LayoutPageHandler loading={loading} subMenu={subMenu}>
            <div className="text-center border-bottom display-6 fw-bold p-2">{member.firstName+' '+member.lastName} Profile</div>
            <div style={{overflow: 'auto', height: '90vh'}}>
                <Profile member={member} />
            </div>
            <Loading loading={loading} />
        </LayoutPageHandler>
    )
}