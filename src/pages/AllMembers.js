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
        setLoading(true);
        let maches = [];
        let unMaches = [];
        if(!search) return;
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
        <Layout>
            <div className="all-member-container">
                <div data-search>
                    <div>
                        <Search onSearch={onSearch} />
                    </div>
                    <div>
                        <select onChange={(e)=>onFilter(e.target.value)}>
                            <option value={'ALL'} >View All</option>
                            {teams.map((role, key)=>(
                                <option value={role?.id} key={key}>{role?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="all-members-scroll">
                    {members.map((usr, key)=>(
                        <div 
                            onClick={()=>navigate(routes.memberSettings.replace('userId', `userId:${usr?.id}`), {state: usr})}
                            className="all-member-card" 
                            style={{backgroundColor: usr?.selected && 'lightblue'}} 
                            key={key}
                            >
                            <div data-profile>
                                <div data-image>
                                    <CgProfile/>
                                </div>
                                <div>
                                    <span>{usr?.firstName}</span>&nbsp;
                                    <span>{usr?.lastName}</span>
                                    <div>{usr?.email}</div>
                                </div>
                            </div>
                            <div>{usr?.role}</div>
                            <div>{usr?.teamName}</div>
                            <div data-settings-pointer>
                                <BsFillForwardFill/>
                                <MdOutlineSettingsSuggest/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Loading loading={loading} />
        </Layout>
    )
}