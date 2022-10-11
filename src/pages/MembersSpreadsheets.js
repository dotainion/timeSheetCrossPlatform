import React, { useEffect, useState } from "react";
import { Layout, useLayout } from "../layout/Layout";
import { Spreadsheet } from "../module/logic/Spreadsheet";
import { UserSetting } from "../module/logic/UserSetting";
import { useAuth } from "../provider/AuthenticationWrapper";
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { Loading } from "../components/Loading";
import { Modal } from "../container/Modal";
import { Clipboard } from "../widgets/Clipboard";
import { LayoutPageHandler } from '../layout/LayoutPageHandler';
import { ButtonCardContainer } from "../widgets/ButtonCardContainer";
import { ButtonCard } from "../widgets/ButtonCard";
import img from '../images/google.webp';
import { Users } from "../module/logic/Users";


const api = new Spreadsheet();
const settings = new UserSetting();
const users = new Users();

export const MembersSpreadsheets = () =>{
    const { user } = useAuth();
    const { setMenu } = useLayout();

    const [Spreadsheets, setSpreadSheets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const info = {
        email: 'time-sheet@calm-pagoda-322120.iam.gserviceaccount.com',
        google_url: 'https://support.google.com/docs/answer/2494822?hl=en&co=GENIE.Platform%3DDesktop'
    }

    const bindInfoToSpreadsheet = (userSettings, spreadsheets, userList) =>{
        for(let setting of userSettings.list()){
            let index = 0;
            for(let sheet of spreadsheets){
                if(setting.spreadsheetId === sheet.spreadsheetId){
                    spreadsheets[index]['userId'] = setting.id;
                    for(let usr of userList){
                        if(usr.id === setting.id){
                            spreadsheets[index]['user'] = usr;
                            break;
                        }
                    }
                }
                index ++;
            }
        }
        return spreadsheets
    }

    useEffect(async()=>{
        if(!user?.clientId) return;
        setLoading(true);
        const userSettings = await settings.getSettings(user?.clientId);
        const spreadsheetIds = userSettings.list().map((obj)=>obj.spreadsheetId);
        const sheet = await api.getSpreadsheet(spreadsheetIds);
        if(sheet?.error) return setLoading(false);
        const userList = await users.getByClientId(user?.clientId);
        const spreadSheetData = bindInfoToSpreadsheet(userSettings, sheet.data, userList);
        setSpreadSheets(spreadSheetData || []);
        setLoading(false);
    }, [user]);

    useEffect(()=>{
        setTimeout(()=>setMenu([{title: 'new', onClick: ()=>setShowModal(true)}]), 50);
    }, []);
    
    return (
        <div className="overflow-hidden h-100">
            <ButtonCardContainer>
                {Spreadsheets.map((file, key)=>(
                    <ButtonCard
                        image={img}
                        title={file?.properties.title}
                        subTitle={`${file.user.firstName} ${file.user.lastName}`}
                        onClick={()=>{
                            navigate(
                                routes.nested().spreadsheetReport()
                                .replace(':memberId', ':memberId:'+file.user.id)
                                .replace(':spreadsheetId', ':spreadsheetId:'+file.spreadsheetId)
                            );
                        }}
                        key={key}
                    />
                ))}
            </ButtonCardContainer>
            <Modal isOpen={showModal} onClose={()=>setShowModal(false)} >
                <h5>To share a file</h5>
                <div>On a computer, go to Google Drive, Docs, Sheets, or Slides.</div>
                <div>Click the file you want to share, then Click Share.</div>
                <div>Copy the email bellow to share with the document to give access.</div>
                <div className="mt-2 mb-2">
                    <Clipboard value={info.email}/>
                </div>
                <a href={info.google_url} target={'_blank'} className="link-primary text-decoration-none pointer">Read more...</a>
            </Modal>
            <Loading loading={loading} />
        </div>
    )
}