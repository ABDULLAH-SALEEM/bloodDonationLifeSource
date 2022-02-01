import React from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../Auth/Firebase';
import Sidebar from '../AdminDashboard/Sidebar/Sidebar'
import QRCode from 'qrcode';

const DonorFullApplication = () => {
    let currentDonorId = localStorage.getItem('currentDonor');
    currentDonorId = JSON.parse(currentDonorId);
    let [currentDonor, setCurrentDonor] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const approveHandler = async () => {
        try {
            const response = await QRCode.toDataURL(currentDonorId.donorId);
            console.log(response);
            setImageUrl(response);
            const nameRef = doc(db, "donationRequest", currentDonorId.donorId);
            await updateDoc(nameRef, {
                status: "Approved",
                qrCode: imageUrl
            })
        } catch (error) {
            console.log(error);
        }
    }
    const denyHandler = () => {
        const nameRef = doc(db, "donationRequest", currentDonorId.donorId);
        updateDoc(nameRef, {
            status: "Denied",
        })
    }

    useEffect(() => {
        const qry = query(collection(db, "donationRequest"));
        const q = query(qry, where("donationId", "==", currentDonorId.donorId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const currentDonorArr = [];
            querySnapshot.forEach((doc) => {
                currentDonorArr.push(doc.data())
            });
            setCurrentDonor(currentDonorArr)
        });
    }, [])

    let currentDonorMap = currentDonor.map((element, pos) => {
        return (
            <div>
                <b>Donor Id:</b> {element.donationId} <br />
                <b>Name:</b> {element.name} <br />
                <b>Email:</b> {element.email} <br />
                <b>Phone Number:</b> {element.phoneNum} <br />
                <b>City:</b> {element.city} <br />
                <b>NIC:</b> {element.nic} <br />
                <b>Blood Group:</b> {element.bloodGroup} <br />
                <b>Weight:</b> {element.weight} <br />
                <b>Recent Illeness:</b> {element.latestIllness}<br />
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
                    <div className='head'>Donor Detail Information</div>
                    {/* <div className='donorHead'>
                        <div>Recipient Id</div>
                        <div>Recipient Name</div>
                        <div>Status</div>
                    </div> */}
                    {currentDonorMap}</div>
            </div>
        </div>
    );
};

export default DonorFullApplication;
