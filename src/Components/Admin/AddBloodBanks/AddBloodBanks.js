import React from 'react';
import { collection, query, where, onSnapshot, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../Auth/Firebase';
import Sidebar from '../AdminDashboard/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import './AddBloodBanks.css'


const AddBloodBanks = () => {
    const [donationReq, setDonationReq] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [bank, setBank] = useState([])
    const onNameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const onAddressChangeHandler = (e) => {
        setAddress(e.target.value)
    }
    const onNumberChangeHandler = (e) => {
        setNumber(e.target.value)
    }

    const addBankHandler = (e) => {
        e.preventDefault()
        setDoc(doc(db, 'bloodBanks', name), {
            name,
            address,
            number
        })
        setName('')
        setAddress('')
        setNumber('')
    }
    useEffect(() => {
        const q = query(collection(db, "bloodBanks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const bankArr = [];
            querySnapshot.forEach((doc) => {
                bankArr.push(doc.data())
            });
            setBank(bankArr)
        });
    }, [])

    const bankMap = bank.map((element, pos) => {
        if (bank) {
            return (
                <div className='don'>
                    <div >{element.name}</div>
                    <div>{element.address}</div>
                    <div>{element.number}</div>
                </div>
            )
        } else {
            return (
                <div>No Data To Show</div>
            )
        }

    })

    return (
        <div>
            <p className='appName'>Life Source <span className='appTagline'>Give and let Live.</span></p>
            <h2 className='admin'>Admin Panel</h2>
            <div className='donorAppTab'>
                <div className='donorAppTabSideBar'><Sidebar /></div>
                <div className='donorAppTabInfo'>
                    <div className='head'>Blood Banks</div>
                    <div>
                        <form className='addBankForm' onSubmit={addBankHandler}>
                            <TextField value={name} onChange={onNameChangeHandler} id="standard-basic" label="Name" variant="standard" />
                            <TextField value={address} onChange={onAddressChangeHandler} id="standard-basic" label="Address" variant="standard" />
                            <TextField type='number' value={number} onChange={onNumberChangeHandler} id="standard-basic" label="Number" variant="standard" />
                            <button className="Button-Signup">Add</button>
                        </form>
                    </div>
                    <div className='donorHead'>
                        <div>Name</div>
                        <div>Address</div>
                        <div>Contact</div>
                    </div>
                    {bankMap}</div>
            </div>


        </div>
    );
};

export default AddBloodBanks;
