import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { routes } from "../Routes/Routes";
import { BreadCrumbs } from "../widgets/BreadCrumbs";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import { VscAdd } from 'react-icons/vsc';
import { Modal } from "../container/Modal";
import { Teams as _Teams_ } from '../module/logic/Teams';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineClose } from "react-icons/ai";
import $ from 'jquery';
import { MemberCard } from "../components/MemberCard";
import { IoIosPeople } from 'react-icons/io';
import bgImg from '../images/team-bg.webp';
import { NoRecords } from "../components/NoRecords";
import teamIcon from '../images/team-icon.png';
import { ModalXl } from "../container/ModalXl";
import { ConfirmXl } from "../widgets/ConfirmXl";
import { Loading } from "../components/Loading";
import { useProvider } from "../provider/ProviderWrapper";


const team = new _Teams_();
export const Teams = () =>{
    const { teams, addToTeam } = useProvider();

    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteMembersAlso, setDeleteMembersAlso] = useState();
    const [openAlert, setOpenAlert] = useState({state: false, data: null, cardRef: null});

    const navigate = useNavigate();
    const location = useLocation();

    const nameRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();

    const breadCrumbs = [
        
    ];

    const onAddTeam = async() =>{
        setLoading(true);
        const teamObj = await team.add(
            nameRef.current.value,
            descriptionRef.current.value,
            imageRef.current
        );

        if (teamObj == 'error'){
            return setLoading(false);
        };

        nameRef.current.value = '';
        descriptionRef.current.value = '';
        descriptionRef.current.focus();
        nameRef.current.focus();

        addToTeam(teamObj);
        setLoading(false);
    }

    const onDeleteTeam = (teamId, cardRef) =>{
        team.delete(teamId, deleteMembersAlso);
        $(cardRef).remove();
    }

    useEffect(()=>{

        return () =>{
            
        }
    }, [teams]);

    return(
        <Layout options={breadCrumbs} title="Teams">
            <div className="team-list-container">
                <div className="team-button-cards-container" style={{backgroundImage: `url(${bgImg})`}}>
                    <MemberCard onClick={()=>setOpenModal(true)} asBtn={true}>
                        <VscAdd className="float-center" />
                        <div className="float-center" style={{top: '80%'}}>Add team</div>
                    </MemberCard>
                </div>
                {
                    teams.length?
                    teams.map((obj, key)=>(
                        <MemberCard 
                            icon={<IoIosPeople/>}
                            name={obj.name}
                            description={obj.description}
                            supervisor="None"
                            useHover={true}
                            onClick={()=>navigate(`${routes.TeamMembers}:${obj.id}:${obj.name}`, {state: obj})}
                            menu={[
                                {
                                    title: 'Manage',
                                    action: ()=>navigate(`${routes.TeamMembers}:${obj.id}:${obj.name}`, {state: obj})
                                },/*{
                                    title: 'Report',
                                    action: (e)=>navigate(`${routes.report}:${obj.id()}`, {state: obj})
                                },*/{
                                    title: 'Delete',
                                    action: (e)=>setOpenAlert({state: true, data: obj, cardRef: e.ref})
                                }
                            ]}
                            key={key}
                        />
                    )):
                    <NoRecords 
                        image={teamIcon}
                        btnName = "Add Team"
                        title="Welcome to Time Sheet App"
                        messages={[
                            'Lets get started with creating your first team',
                            'Create your first team by clicking the card  with the plus +.'
                        ]}
                        onClick={()=>setOpenModal(true)}
                    />
                }
            </div>
            
            <ModalXl 
                isOpen={openModal} 
                onClose={()=>setOpenModal(false)} 
                title="Create a team"
                message="Let's start with a name for your team"
                onConfirm={onAddTeam}
                onImageSelect={(img)=>imageRef.current = img}
                >
                <Input title="Name" inputRef={nameRef} />
                <Input title="Description" inputRef={descriptionRef} paragraph />
            </ModalXl>

            <ConfirmXl
                isOpen={openAlert.state}
                title="Warning! This will permanently delete all data conresponding to this team."
                switchMsg="Delete members assocciated with this team."
                switchOnMsg="Members to this team will be deleted."
                message="deleting {'Team Name'}"
                onSwitch={setDeleteMembersAlso}
                onClose={()=>setOpenAlert({state: false, data: null, cardRef: null})}
                onConfirm={()=>onDeleteTeam(openAlert.data.id, openAlert.cardRef)}
                >

            </ConfirmXl>

            <Loading loading={loading} />
        </Layout>
    )
}