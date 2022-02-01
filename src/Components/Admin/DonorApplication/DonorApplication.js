import React from 'react';
import { collection, query, where, onSnapshot, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../Auth/Firebase';
import Sidebar from '../AdminDashboard/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './DonorApplication.css'

const DonorApplication = () => {
    const [donationReq, setDonationReq] = useState([])
    useEffect(() => {
        const q = query(collection(db, "donationRequest"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationReqArr = [];
            querySnapshot.forEach((doc) => {
                donationReqArr.push(doc.data())
            });
            setDonationReq(donationReqArr)
        });
    }, [])

    const donationReqMap = donationReq.map((element, pos) => {
        const linkTo=`/admin/dashboard/donorApplication/${element.donationId}`
        const onClickHandler=()=>{
            const donorId = {
                donorId: element.donationId
            }
            localStorage.setItem('currentDonor', JSON.stringify(donorId))     
        }
        return (
            <div className='don'>
                <div >{element.donationId}</div>
                <div>{element.name}</div>
                <Link to={linkTo}><div onClick={onClickHandler}>View Full Detail</div></Link>
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
                    <div className='head'>Donor Applications</div>
                    <div className='donorHead'>
                        <div>Donor Id</div>
                        <div>Donor Name</div>
                        <div>Details</div>
                    </div>
                    {donationReqMap}</div>
            </div>


        </div>
    );
};

export default DonorApplication;
