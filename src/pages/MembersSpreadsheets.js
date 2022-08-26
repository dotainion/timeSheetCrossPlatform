import React, { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { FileCard } from "../widgets/FileCard";
import { FileCardContainer } from "../widgets/FileCardContainer";
import { Spreadsheet } from "../module/logic/Spreadsheet";
import { UserSetting } from "../module/logic/UserSetting";
import { useAuth } from "../provider/AuthenticationWrapper";
import { useNavigate } from "react-router-dom";
import { routes } from "../Routes/Routes";
import { Loading } from "../components/Loading";


const api = new Spreadsheet();
const settings = new UserSetting();

export const MembersSpreadsheets = () =>{
    const { user } = useAuth();
    const [Spreadsheets, setSpreadSheets] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const bindInfoToSpreadsheet = (userSettings, spreadsheets) =>{
        for(let setting of userSettings.list()){
            let index = 0;
            for(let sheet of spreadsheets){
                if(setting.spreadsheetId === sheet.spreadsheetId){
                    spreadsheets[index]['userId'] = setting.id;
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
        const spreadSheetData = bindInfoToSpreadsheet(userSettings, sheet.data);
        setSpreadSheets(spreadSheetData || []);
        setLoading(false);
    }, [user]);
    
    return (
        <Layout>
            <FileCardContainer>
                {Spreadsheets.map((file, key)=>(
                    <FileCard
                        key={key}
                        google
                        title={file?.properties.title}
                        onClick={()=>{
                            navigate(
                                routes.spreadsheetReport
                                .replace(':memberId', ':memberId:'+file.userId)
                                .replace(':spreadsheetId', ':spreadsheetId:'+file.spreadsheetId)
                            );
                        }}
                    />
                ))}
            </FileCardContainer>
            <Loading loading={loading} />
        </Layout>
    )
}