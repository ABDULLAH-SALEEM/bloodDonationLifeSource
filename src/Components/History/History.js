import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Auth/Firebase';
import Navbar from '../Navbar/Navbar';
import Footer from '../Home/Footer';

const History = () => {

    let [donationHistory, setDonationHistory] = useState([]);
    let [recipientHistory, setRecipientHistory] = useState([]);
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "donationRequest"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const donationHistoryArr = [];
                querySnapshot.forEach((doc) => {
                    donationHistoryArr.push(doc.data().date)
                    // console.log(doc.data().date);
                });
                setDonationHistory(donationHistoryArr)
            });
        }
    }, [])

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "recipientRequest"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const recipientHistoryArr = [];
                querySnapshot.forEach((doc) => {
                    recipientHistoryArr.push(doc.data().date)
                });
                setRecipientHistory(recipientHistoryArr)
            });
        }
    }, [])

    let donationHistoryMap = donationHistory.map((element, pos) => {
        if (element) {
            return (
                <div key={pos} className='varifiedShow'>
                    <div><b>Last donated on :</b>{element}</div>
                </div>
            )
        } else {
            return (
                <div className='noData'>No Data To Show</div>
            )
        }

    })

    let recipientHistoryMap = recipientHistory.map((element, pos) => {
        console.log("hello"+element);
        if (element) {
            return (
                <div key={pos} className='varifiedShow'>
                    <div><b>Last received on :</b>{element}</div>
                </div>
            )
        }else {
            return (
                <div className='noData'>No Data To Show</div>
            )
        } 
    })

    return (
        <div>
            <div className='nav'>
                <Navbar />
            </div>
            <div>
                <h3 className='varifiedHead'>Donation History</h3>
                {donationHistoryMap}
            </div>
            <div>
                <h3 className='varifiedHead'>Received History</h3>
                {recipientHistoryMap}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default History;
