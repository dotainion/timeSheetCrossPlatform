import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MemberCard } from "../components/MemberCard";
import { Layout } from "../layout/Layout";
import { routes } from "../Routes/Routes";
import { BsFillPersonFill } from 'react-icons/bs';
import { VscAdd } from 'react-icons/vsc';
import bgImg from '../images/member-bg.jpg';
import { NoRecords } from "../components/NoRecords";
import memberIcon from '../images/member-icon.png';
import { Users } from "../module/logic/Users";
import { ModalXl } from "../container/ModalXl";
import { Input } from "../widgets/Input";
import { Button } from "../widgets/Button";
import { Teams } from "../module/logic/Teams";
import $ from 'jquery';
import { ConfirmXl } from "../widgets/ConfirmXl";
import { Loading } from "../components/Loading";
import { useProvider } from "../provider/ProviderWrapper";
import { MemberSettings } from "../settings/MemberSettings";
import { Roles } from "../infrastructure/Roles";
import { NewMember } from "../components/NewMember";
import { BiImport } from 'react-icons/bi';
import { ButtonCard } from "../widgets/ButtonCard";
import { AsignMembers } from "./AsignMembers";


const uTeam = new Teams();
const users = new Users();

export const TeamMembers = () =>{
    const { members, initializeMembers } = useProvider();

    const [team, setTeam] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openSetting, setOpenSetting] = useState({state: false, data: null});

    const location = useLocation();
    const navigate = useNavigate();


    const navOption = [
        {
            title: 'Teams',
            action: ()=>navigate(routes.teams)
        }
    ];

    useEffect(async()=>{
        const id = location.pathname.split(':')?.[2];

        let teamObject;
        if(location.state) teamObject = location.state
        else teamObject = await uTeam.getById(id);

        if(!teamObject?.id){
            return;
        }

        setTeam(teamObject);

        initializeMembers(teamObject?.id);

        return () =>{

        }
    }, [location]);
    return(
        <Layout options={navOption} title={`Members of team '${team?.name}'.`}>
            <div>
                <div className="team-button-cards-container" style={{backgroundImage: `url(${bgImg})`}}>
                    <ButtonCard onClick={()=>setOpenModal(true)} title={'Add Member'} add />
                    <ButtonCard onClick={()=>navigate(routes.asignMembers)} title={'Import Member'} imports />
                </div>
                {
                    members.length?
                    members.map((usr, key)=>(
                        <MemberCard
                            icon={<BsFillPersonFill/>}
                            name={`${usr.firstName} ${usr.lastName}`}
                            gender={usr.gender}
                            number={usr.number}
                            supervisor="None"
                            role={usr.role}
                            useHover={true}
                            onClick={(e)=>navigate(`${routes.report.replace('memberId', `memberId:${usr.id}`)}`, {state: usr})}
                            menu={[
                                {
                                    title: 'Settings',
                                    action: (e)=>setOpenSetting({state: true, data: usr})
                                },{
                                    title: 'Re Assign',
                                    action: (e)=>navigate(routes.asignMembers, {state: usr.id})
                                },{
                                    title: 'Report',
                                    action: (e)=>navigate(`${routes.report.replace('memberId', `memberId:${usr.id}`)}`, {state: usr})
                                }
                            ]}
                            key={key}
                        />
                    )):
                    <NoRecords 
                        image={memberIcon}
                        btnName="Add Member"
                        title="Welcome to Time Sheet App"
                        messages={[
                            'Lets get started with creating your first member to the team',
                            'Create your first member by clicking the card  with the plus +.'
                        ]}
                        onClick={()=>{}}
                    />
                }
            </div>

            <NewMember 
                isOpen={openModal}
                onClose={()=>setOpenModal(false)}
                teamId={team?.id}
                message="Let's start with information on your member"
            />

            <MemberSettings 
                user={openSetting.data}
                isOpen={openSetting.state} 
                onClose={()=>setOpenSetting({state: false, data: null})} 
            />
        </Layout>
    )
}