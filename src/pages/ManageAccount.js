import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../container/Modal";
import { Account } from "../module/logic/Account";
import { Users } from "../module/logic/Users";
import { useAuth } from "../provider/AuthenticationWrapper";
import { Button } from "../widgets/Button";
import { ButtonCardSm } from "../widgets/ButtonCardSm";
import { Input } from "../widgets/Input";
import { AddAccounts } from "./AddAccounts";
import img from '../images/lamp.gif';
import { Loading } from "../components/Loading";
import { ToastHandler } from "../infrastructure/ToastHandler";
import { PointerIndicator } from "../components/PointerIndicator";
import { UserAccount } from "../module/logic/UserAccount";
import { useAccounts } from "../provider/AccountsWrapper";


const _users = new Users();
const _account = new Account();
const toast = new ToastHandler();
const _userAccount = new UserAccount();

export const ManageAccount = () =>{
    const { user } = useAuth();
    const { account } = useAccounts();

    const [loading, setLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const [openCurrentAccount, setOpenCurrentAccount] = useState(false);
    const [availableAccounts, setAvailableAccounts] = useState([]);
    const [members, setMembers] = useState([]);
    const [accountsSelected, setAccountsSelected] = useState([]);
    const [membersSelected, setMembersSelected] = useState([]);
    const [managingMembers, setManagingMembers] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const nameRef = useRef();
    const descriptionRef = useRef();

    const accountIdRef = useRef();

    const onAddMembers = async() =>{
        setLoading(true);
        const res = await _account.updateAccount({
            id: accountIdRef.current,
            name: nameRef.current.value,
            clientId: account.clientId,
            description: descriptionRef.current.value
        });
        membersSelected.forEach(async(mbr)=>{
            await _userAccount.addUserAccount(mbr.id, accountIdRef.current);
        });
        setLoading(false);
        setMembersSelected([]);
        navigate(location.pathname, {state: res.first()});
    }

    const onCancel = () =>{
        setMembers([]);
        setOpenUsers(false);
        setMembersSelected([]);
        setAccountsSelected([]);
        setOpenCurrentAccount(false);
    }

    const onDoneAddMbrs = () =>{
        if(!membersSelected.length) return toast.warning('No new member selected.');
        setOpenUsers(false);
    }

    const addSelectedAccount = (acc) =>{
        if(accountsSelected.filter((accnt)=>accnt?.id === acc?.id).length){
            return setAccountsSelected(accountsSelected.filter((accnt)=>accnt?.id !== acc.id));
        }
        setAccountsSelected((accnt)=>[...accnt, acc]);
    }

    const addSelectedMbrs = (e, mbr) =>{
        if(e.target.checked){
            return setMembersSelected((mbrs)=>[...mbrs, mbr]);
        }
        setMembersSelected(membersSelected.filter((m)=>m?.uniqueKey !== mbr?.uniqueKey));
    }

    const getAccountsMembers = async() =>{
        if(!accountsSelected.length) return toast.warning('Select at least one account to continue.');
        setLoading(true);
        for(let acc of accountsSelected){
            const userCollector = await _users.getByAccountId(acc.id);
            for(let usr of userCollector.list()){
                if(!members.filter((o)=> o.id === usr.id).length){
                    setMembers((usrs)=>[...usrs, {...usr, accountName: acc?.name, accountId: acc?.id}]);
                }
            }
        }
        setOpenUsers(true);
        setOpenCurrentAccount(false);
        setLoading(false);
    }

    const getManagingAccountMembers = async() =>{
        if(!accountIdRef.current) return;
        const userCollector = await _userAccount.getUserAccountByAccountId(accountIdRef.current);
        setManagingMembers(userCollector.list());
    }

    const isUserIncluded = (userId) =>{
        for(let usr of managingMembers){
            if(usr.userId === userId) return true;
        }
        return null;
    }

    const onPrevious = () =>{
        setOpenUsers(false);
        setOpenCurrentAccount(true);
    }

    useEffect(async()=>{
        if(!user?.id) return;
        const accounts = await _account.getUserAccount(user?.id);
        accounts.hasItems() && setAvailableAccounts(accounts.list());
    }, []);

    useEffect(async()=>{
        const pathList = location.pathname.split(':');
        accountIdRef.current = pathList[pathList.length -1];
        let account = location.state;
        if(!account){
            const res = await _account.getAccountById(accountIdRef.current);
            if(res.hasItems()) account = res.first();
        }
        if(pathList.length >= 3) setIsCreate(false);

        await getManagingAccountMembers();
        
        nameRef.current.value = account?.name || '';
        descriptionRef.current.value = account?.description || '';
        nameRef.current.focus();
        descriptionRef.current.focus();
    }, []);

    return(
        <div>
            <div className="col-md-7 m-auto">
                <div className="border p-4 mt-5">
                    <div className="mb-5 display-6 fw-bold text-center">{isCreate ? 'Create Accoun' : 'Manage Account'}</div>
                    <Input inputRef={nameRef} title={'Account Name'} />
                    <Input inputRef={descriptionRef} title={'Description'} />
                    <div className="d-flex pt-5 pb-4 text-nowrap">
                        <div className="w-100">
                            <Button onClick={()=>setOpenCurrentAccount(true)} title={'Add Members'} />
                        </div>
                        <div className="w-100 text-end">
                            <PointerIndicator right={membersSelected.length > 0}>
                                <Button onClick={onAddMembers} title={'Update Account'} />
                            </PointerIndicator>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={'Select Members'} isOpen={openUsers} onClose={onCancel} onDone={onDoneAddMbrs} onPrevious={onPrevious}>
                {
                    members.length ?
                    members.map((usr, key)=>(
                        <label className="d-flex align-items-center text-start text-nowrap btn btn-dark my-1" key={key}>
                            <input onChange={(e)=>addSelectedMbrs(e, {...usr, uniqueKey: `${usr?.id}-${key}`})} checked={isUserIncluded(usr.id)} className="me-2 pointer" type="checkbox" style={{width: '20px', height: '20px'}} />
                            <div className="w-100 text-truncate fst-italic">Hellow orld</div>
                            <div className="w-25 text-end text-truncate text-uppercase">{usr?.accountName}</div>
                        </label>
                    )) :
                    <div>No members available</div>
                }
            </Modal>
            <Modal title={'Select Accounts'} isOpen={openCurrentAccount} onClose={onCancel} onDone={getAccountsMembers} onDoneTitle="Next">
                <div>Select one or more account to import users from.</div>
                <div className="justify-content-center overflow-auto h-100">
                    {availableAccounts.map((acc, key)=>(
                        <ButtonCardSm
                            key={key}
                            title={acc.name} 
                            image={img} 
                            isSelected={accountsSelected.filter((accnt)=>accnt?.id === acc?.id).length > 0}
                            onClick={()=>addSelectedAccount(acc)}
                        />
                    ))}
                </div>
            </Modal>
            <Loading loading={loading} />
        </div>
    )
}