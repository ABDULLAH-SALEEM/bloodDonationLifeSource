import React from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../Auth/Firebase';
import Sidebar from '../AdminDashboard/Sidebar/Sidebar';

const ReportedProblem = () => {
    const [reportedProb, setReportedProb] = useState([])
    useEffect(() => {
        const q = query(collection(db, "reportedProb"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reportedProbArr = [];
            querySnapshot.forEach((doc) => {
                reportedProbArr.push(doc.data())
            });
            setReportedProb(reportedProbArr)
        });
    }, [])

    const reportedProbMap = reportedProb.map((element, pos) => {
        return (
            <div className='don'>
                <div >{element.name}</div>
                <div>{element.email}</div>
                <div>{element.des}</div>
            </div>
        )
    })

    return (
        <div>
            <p className='appName'>Life Source <span className='appTagline'>Give and let Live.</span></p>
            <h2 className='admin'>Admin Panel</h2>
            <div className='donorAppTab'>
                <div className='donorAppTabSideBar'><Sidebar /></div>
                <div className='donorAppTabInfo'>
                    <div className='head'>Reported Problems Or Feedback</div>
                    <div className='donorHead'>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Description</div>
                    </div>
                    {reportedProbMap}</div>
            </div>
        </div>
    );
};

export default ReportedProblem;
