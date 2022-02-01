import React, {useState, useEffect} from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import CallIcon from '@material-ui/icons/Call';
import { db } from '../Auth/Firebase';
import Navbar from '../Navbar/Navbar';
import Footer from '../Home/Footer';
// import './VarifiedRecipients.css'

const BloodBanks = () => {
    let [bloodBanks, setBloodBanks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "bloodBanks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const banksArr = [];
            querySnapshot.forEach((doc) => {
                banksArr.push(doc.data())
            });
            setBloodBanks(banksArr)
        });
    }, [])

    let bloodBanksMap = bloodBanks.map((element, pos) => {
        let num = `tel:${element.number}`
        return (
            <div key={pos} className='varifiedShow'>
                <div className='varifiedShow_left'>
                    <b>Name:</b> {element.name}<br />
                    <b>Address: </b>{element.address} <br />
                    <b>Number:</b> {element.number}<br />
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
                <h3 className='varifiedHead'>Blood Banks</h3>
                 {bloodBanksMap}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default BloodBanks;
