import React from 'react';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot} from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../Auth/Firebase';
import Sidebar from '../AdminDashboard/Sidebar/Sidebar';
import './RecipientsApplication.css'

const RecipientsApplication = () => {
    const [donationReq, setDonationReq] = useState([])
    useEffect(() => {
        const q = query(collection(db, "recipientRequest"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationReqArr = [];
            querySnapshot.forEach((doc) => {
                donationReqArr.push(doc.data())
            });
            setDonationReq(donationReqArr)
        });
    }, [])

    const recipientReqMap = donationReq.map((element, pos) => {
        const linkTo=`/admin/dashboard/recipientApplication/${element.recipientId}`
        const onClickHandler=()=>{
            const recipientId = {
                recipientId: element.recipientId
            }
            localStorage.setItem('currentRecipient', JSON.stringify(recipientId))     
        }
        return (
            <div className='don'>
                <div>{element.recipientId}</div>
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
                    <div className='head'>Recipient Applications</div>
                    <div className='donorHead'>
                        <div>Recipient Id</div>
                        <div>Recipient Name</div>
                        <div>Details</div>
                    </div>
                    {recipientReqMap}</div>
            </div>


        </div>
    );
};

export default RecipientsApplication;
