import React from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../Auth/Firebase';
import Sidebar from '../AdminDashboard/Sidebar/Sidebar'
import './RecipientFullApplication.css'
import QRCode from 'qrcode';

const RecipientFullApplication = () => {
    let currentRecipientId = localStorage.getItem('currentRecipient');
    currentRecipientId = JSON.parse(currentRecipientId);
    let [currentRecipient, setCurrentRecipient] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const approveHandler = async () => {
        try {
            const response = await QRCode.toDataURL(currentRecipientId.recipientId);
            console.log(response);
            setImageUrl(response);
            const nameRef = doc(db, "recipientRequest", currentRecipientId.recipientId);
            await updateDoc(nameRef, {
                status: "Approved",
                qrCode: imageUrl
            })
        } catch (error) {
            console.log(error);
        }
    }
    const denyHandler = () => {
        const nameRef = doc(db, "recipientRequest", currentRecipientId.recipientId);
        updateDoc(nameRef, {
            status: "Denied",
        })
    }

    useEffect(() => {
        const qry = query(collection(db, "recipientRequest"));
        const q = query(qry, where("recipientId", "==", currentRecipientId.recipientId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const currentRecipientArr = [];
            querySnapshot.forEach((doc) => {
                currentRecipientArr.push(doc.data())
            });
            setCurrentRecipient(currentRecipientArr)
        });
    }, [])

    let currentRecipientMap = currentRecipient.map((element, pos) => {
        return (
            <div className='recipientFullDetails'>
                <b>Recipient Id:</b> {element.recipientId} <br />
                <b>Name:</b> {element.name} <br />
                <b>Email:</b> {element.email} <br />
                <b>Phone </b>Number: {element.phoneNum} <br />
                <b>City: </b>{element.city} <br />
                <b>NIC: </b> {element.nic} <br />
                <b>Blood Group: </b> {element.bloodGroup} <br />
                <b>Reports: </b> <br />
                <img src={element.reportUrl} /> <br />
                <b>Status:</b> {element.status}<br /> <br />
                <div><div><button className='approve' onClick={approveHandler}>Approve</button><button className='deny' onClick={denyHandler}>Deny</button></div></div>
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
                    <div className='head'>Recipient Detail Information</div>
                    {/* <div className='donorHead'>
                        <div>Recipient Id</div>
                        <div>Recipient Name</div>
                        <div>Status</div>
                    </div> */}
                    {currentRecipientMap}</div>
            </div>
        </div>
    );
};

export default RecipientFullApplication;
