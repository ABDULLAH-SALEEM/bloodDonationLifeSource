import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot} from 'firebase/firestore'
import { db } from '../../../Auth/Firebase';
import Sidebar from '../Sidebar/Sidebar';
import './AdminDashboard.css'

const AdminDashboard = () => {

    const [users, setUsers]=useState([])
    const [donors, setDonors]=useState([])
    const [recipients, setRecipients]=useState([])

    useEffect(() => {
        const q = query(collection(db, "recipientRequest"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const recipientsArr = [];
            querySnapshot.forEach((doc) => {
                recipientsArr.push(doc.data())
            });
            setRecipients(recipientsArr)
        });
    }, [])

    useEffect(() => {
        const q = query(collection(db, "donationRequest"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donorsArr = [];
            querySnapshot.forEach((doc) => {
                donorsArr.push(doc.data())
            });
            setDonors(donorsArr)
        });
    }, [])

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersArr = [];
            querySnapshot.forEach((doc) => {
                usersArr.push(doc.data())
            });
            setUsers(usersArr)
        });
    }, [])
    let usersCount=0
    const usersMap=users.map((element, pos)=>{
        usersCount++
    })
    let donorsCount=0
    const donorsMap=donors.map((element, pos)=>{
        donorsCount++
    })
    let recipientsCount=0
    const recipientsMap=recipients.map((element, pos)=>{
        recipientsCount++
    })

    return (
        <div className='dashboard'>
            <div className='settings' >
                <div className='sideBar'>
                    <p className='appName'>Life Source <span className='appTagline'>Give and let Live.</span></p>
                    <h2 className='admin'>Admin Panel</h2>
                    <div className='donorAppTab'>
                        <div className='donorAppTabSideBar'><Sidebar /></div>
                        <div className='dashboardTabInfo'>
                            <div>No of Users:<br /> {usersCount}</div>
                            <div>
                                No Of Donors: <br />
                                {donorsCount}
                            </div>
                            <div>No of Recipients:<br /> {recipientsCount}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard
