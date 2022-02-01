import React, {useState, useEffect} from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import CallIcon from '@material-ui/icons/Call';
import { db } from '../Auth/Firebase';
import Navbar from '../Navbar/Navbar';
import Footer from '../Home/Footer';
import './VarifiedRecipients.css'

const VarifiedRecipients = () => {
    let [currentRecipient, setCurrentRecipient] = useState([]);

    useEffect(() => {
        const qry = query(collection(db, "recipientRequest"));
        const q = query(qry, where("status", "==", "Approved"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const currentRecipientArr = [];
            querySnapshot.forEach((doc) => {
                currentRecipientArr.push(doc.data())
            });
            setCurrentRecipient(currentRecipientArr)
        });
    }, [])

    let currentRecipientMap = currentRecipient.map((element, pos) => {
        let num = `tel:${element.phoneNum}`
        return (
            <div className='varifiedShow'>
                <div className='varifiedShow_left'>
                    <b>Name:</b> {element.name}<br />
                    <b>Phone Number:</b>{element.phoneNum} <br />
                    <b>Status:</b> {element.status}<br />
                </div>
                <div className='varifiedShow_right'>
                    <a title='Call Now' href={num} target="_blank"><CallIcon /></a>
                </div>

            </div>
        )

    })


    return (
        <div>
            <div className='nav'>
                <Navbar />
            </div>
            <div>
                <h3 className='varifiedHead'>Varified Recipients</h3>
                 {currentRecipientMap}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default VarifiedRecipients;
