import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from 'react-icons/cg';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { BsFillForwardFill } from "react-icons/bs";
import { Search } from "../components/Search";
import { Roles } from "../infrastructure/Roles";
import { Layout } from "../layout/Layout";
import { Teams } from "../module/logic/Teams";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Users } from "../module/logic/Users";
import { Loading } from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { ButtonCard } from "../widgets/ButtonCard";
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import { ButtonCardMemberBody } from "../components/ButtonCardMemberBody";

const roles = new Roles();
const _teams_ = new Teams();
const _members_ = new Users();

export const AllMembers = () =>{
    const { user } = useAuth();

    const [teams, setTeams] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const membersList = useRef();

    const onSearch = (search) =>{
        if(!search) return;
        setLoading(true);
        let maches = [];
        let unMaches = [];
        let s = search?.toLowerCase();
        for(let item of membersList.current || []){
            const fName = item.firstName?.toLowerCase()?.includes(s);
            const lName = item.lastName?.toLowerCase()?.includes(s)
            if (fName || lName) maches.push(item);
            else unMaches.push(item);
        }
        setMembers([...maches, ...unMaches]);
        setLoading(false);
    }

    const onFilter = (teamId) =>{
        setLoading(true);
        setMembers([]);
        let maches = [];
        if(teamId != 'ALL'){
            for(let item of membersList.current || []){
                if (item.teamId === teamId) maches.push(item);
            }
        }else maches = membersList.current || [];
        setTimeout(()=>{
            setMembers(maches);
            setLoading(false);
        }, 0);
    }

    const seletedMembers = (mbrs) =>{
        let maches = [];
        let unMaches = [];
        if(!location.state)return mbrs;
        for(let obj of mbrs){
            if (obj.id == location.state){
                let mbrObj = JSON.parse(JSON.stringify(obj));
                mbrObj['selected'] = true;
                maches.push(mbrObj);
            }else unMaches.push(obj);
        }
        return [...maches, ...unMaches];
    }

    const getTeamName = (mbrs, fTeams) =>{
        let updateMembers = [];
        for(let mbr of mbrs){
            let psx = false;
            for(let tteam of fTeams || []){
                if (mbr?.teamId === tteam?.id){
                    mbr['teamName'] = tteam?.name;
                    psx = true;
                    break;
                }
            }
            if(!psx){
                mbr['teamName'] = 'unassign';
            }
            updateMembers.push(mbr);
        }
        return updateMembers;
    }

    const initialize = async() =>{
        setLoading(true);
        membersList.current = [];
        let tTeams = await _teams_.getByClientId(user?.clientId);
        let tMembers = await _members_.getByClientId(user?.clientId);
        tMembers = getTeamName(tMembers, tTeams);
        tMembers = seletedMembers(tMembers);
        membersList.current = tMembers;
        setTeams(tTeams);
        setMembers(tMembers);
        setLoading(false);
    }

    useEffect(initialize, []);

    return(
        <Layout title={'Title'}>
            <div className="container pt-3">
                <div className="d-md-flex w-75 m-auto" style={{minWidth: '320px'}}>
                    <div className="w-100">
                        <Search onSearch={onSearch} />
                    </div>
                    <div className="ps-md-5 mt-2">
                        <select className="border-0 border-bottom bg-transparent p-1 pointer" onChange={(e)=>onFilter(e.target.value)}>
                            <option value={'ALL'} >View All</option>
                            {teams.map((t, key)=>(
                                <option value={t?.id} key={key}>{t?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <ButtonCardContainer>
                    {members.map((usr, key)=>(
                        <ButtonCard
                            title={`${usr?.firstName || ''} ${usr?.lastName || ''}`}
                            subTitle={usr?.email}
                            body={<ButtonCardMemberBody role={usr?.role} team={usr?.teamName} />}
                            profile
                            onClick={()=>navigate(routes.memberSettings.replace('userId', `userId:${usr?.id}`), {state: usr})}
                            key={key}
                        />
                    ))}
                </ButtonCardContainer>
            </div>
            <Loading loading={loading} />
        </Layout>
    )
}