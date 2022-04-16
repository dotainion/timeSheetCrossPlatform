import React, { useEffect, useState } from "react";
import { PercentageCard } from "../components/PercentageCard";
import { Layout } from "../layout/Layout";



export const Home = () =>{

    useEffect(()=>{
        
    }, []);
    return(
        <Layout>
            <div className="dashboard-container">
                <div className="dash-employee-count">
                    <PercentageCard title={'Active Users'} color="green" />
                    <PercentageCard title={'Users On Lunch'} color="orange" />
                    <PercentageCard title={'Inactive Users'} color="black" />
                </div>
            </div>
        </Layout>
    )
}