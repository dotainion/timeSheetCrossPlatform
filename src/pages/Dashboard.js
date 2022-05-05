import React, { useEffect, useState } from "react";
import { PercentageCard } from "../components/PercentageCard";
import { Layout } from "../layout/Layout";



export const Dashboard = () =>{

    useEffect(()=>{
        
    }, []);
    return(
        <Layout>
            <div className="dashboard-container">
                <div className="dash-employee-count">
                    <PercentageCard title={'Active Users'} data={'data'} color="rgb(0, 128, 0, 0.7)" />
                    <PercentageCard title={'Users On Lunch'} data={'data'} color="rgb(255, 165, 0, 0.7)" />
                    <PercentageCard title={'Inactive Users'} data={'data'} color="rgb(0, 0, 0, 0.7)" />
                </div>
            </div>
        </Layout>
    )
}