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


const uTeam = new Teams();
const users = new Users();

let teamId;
export const TeamMembers = () =>{
    const { members, addToMember, InitializeMembers } = useProvider();

    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openSetting, setOpenSetting] = useState({state: false, data: null});
    const [openAlert, setOpenAlert] = useState({state: false, data: null, cardRef: null});

    const location = useLocation();
    const navigate = useNavigate();

    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const roleRef = useRef();
    const phoneRef = useRef();
    const genderRef = useRef();
    const imageRef = useRef();

    const navOption = [
        {
            title: 'Teams',
            action: ()=>navigate(routes.teams)
        }
    ];

    const addMember = async() =>{
        setLoading(true);
        const rtUsr = await users.add(
            'clientId',
            emailRef.current.value,
            fNameRef.current.value,
            lNameRef.current.value,
            imageRef.current || '',
            roleRef.current.value,
            'supervisorId',
            team._id,
            phoneRef.current.value,
            genderRef.current.value
        );

        if (rtUsr == 'error'){
            return setLoading(false);
        };

        emailRef.current.value = '';
        fNameRef.current.value = '';
        lNameRef.current.value = '';
        imageRef.current = '';
        roleRef.current.value = '';
        phoneRef.current.value = '';
        genderRef.current.value = '';

        addToMember(rtUsr);
        setLoading(false);
    }

    const onDeleteMember = (userId, cardRef) =>{
        users.delete(userId);
        $(cardRef).remove();
    }

    useEffect(async()=>{
        const id = location.pathname.split(':')?.[2];

        let avilTeam;
        if(location.state) avilTeam = location.state
        else avilTeam = await uTeam.getById(id);

        if(!avilTeam?._id){
            return;
        }

        setTeam(avilTeam);

        if (teamId == id) return;
        InitializeMembers(id);
        teamId = id;

        return () =>{

        }
    }, [location]);
    return(
        <Layout options={navOption} title={`Members of team '${team?._name}'.`}>
            <div>
                <div className="team-button-cards-container" style={{backgroundImage: `url(${bgImg})`}}>
                    <MemberCard onClick={()=>setOpenModal(true)} asBtn={true}>
                        <VscAdd className="float-center" />
                        <div className="float-center" style={{top: '80%'}}>Add member</div>
                    </MemberCard>
                </div>
                {
                    members.length?
                    members.map((usr, key)=>(
                        <MemberCard
                            icon={<BsFillPersonFill/>}
                            name={`${usr.firstName()} ${usr.lastName()}`}
                            gender={usr.gender()}
                            number={usr.number()}
                            supervisor="None"
                            role={usr.role()}
                            menu={[
                                {
                                    title: 'Spreadsheet',
                                    action: (e)=>setOpenSetting({state: true, data: usr})
                                },{
                                    title: 'Delete',
                                    action: (e)=>setOpenAlert({state: true, data: usr, cardRef: e.ref})
                                },{
                                    title: 'Report',
                                    action: (e)=>navigate(`${routes.report.replace('memberId', `memberId:${usr.id()}`)}`, {state: usr})
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

            <ModalXl 
                isOpen={openModal} 
                onClose={()=>setOpenModal(false)}
                title="Create a member"
                message="Let's start with information on your member"
                onImageSelect={(img)=>imageRef.current = img}
                onConfirm={addMember}
                >
                <Input title="First Name" inputRef={fNameRef} />
                <Input title="Last Name" inputRef={lNameRef} />
                <Input title="Email" inputRef={emailRef} type="email" />
                <Input title="Phone Number" inputRef={phoneRef} />
                <Input title="Gender" inputRef={genderRef} options={[
                    {
                        title: 'Male'
                    },{
                        title: 'Female'
                    }
                ]} />
                <Input title="Role" inputRef={roleRef} />
            </ModalXl>

            <ConfirmXl
                isOpen={openAlert.state}
                title="Warning! This will permanently delete all data conresponding to this member."
                message="Are you sure you will like to perminatly delete this team?"
                switchMsg=""
                switchOnMsg=""
                onClose={()=>setOpenAlert({state: false, data: null, cardRef: null})}
                onConfirm={()=>onDeleteMember(openAlert.data.id(), openAlert.cardRef)}
            />

            <Loading loading={loading} />

            <MemberSettings 
                isOpen={openSetting.state} 
                onClose={()=>setOpenSetting({state: false, data: null})} 
            />
        </Layout>
    )
}