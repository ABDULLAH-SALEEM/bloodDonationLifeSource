import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Auth/Firebase';
import QrReader from 'react-qr-reader';
import './ModeratorDashboard.css'

const ModeratorDashboard = () => {
    const qrRef = useRef(null);
    const [scanResultFile, setScanResultFile] = useState('');
    // const [scanResultWebCam, setScanResultWebCam] = useState('');
    const [qrRecipientResult, setQrRecipientResult] = useState([]);
    const [qrDonorResult, setQrDonorResult] = useState([]);
    // const [qrRecipientScanResult, setQrRecipientScanResult] = useState([]);
    // const [qrDonorScanResult, setQrDonorScanResult] = useState([]);

    const handleErrorFile = (error) => {
        console.log(error);
    }
    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(result);
        }
    }
    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }

    const handleErrorWebCam = (error) => {
        console.log(error);
    }
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultFile(result);
        }
    }

    useEffect(() => {
        const qry = query(collection(db, "recipientRequest"));
        const q = query(qry, where("recipientId", "==", scanResultFile));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const qrResultArr = [];
            querySnapshot.forEach((doc) => {
                qrResultArr.push(doc.data())
            });
            setQrRecipientResult(qrResultArr)
        });
    }, [scanResultFile])

    useEffect(() => {
        const qry = query(collection(db, "donationRequest"));
        const q = query(qry, where("donationId", "==", scanResultFile));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const qrResultArr = [];
            querySnapshot.forEach((doc) => {
                qrResultArr.push(doc.data())
            });
            setQrDonorResult(qrResultArr)
        });
    }, [scanResultFile])

    /////////////////////////////////////////////////////////////////////

    // useEffect(() => {
    //     const qry = query(collection(db, "recipientRequest"));
    //     const q = query(qry, where("recipientId", "==", scanResultWebCam));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const qrResultArr = [];
    //         querySnapshot.forEach((doc) => {
    //             qrResultArr.push(doc.data())
    //         });
    //         setQrRecipientScanResult(qrResultArr)
    //     });
    // }, [scanResultWebCam])

    // useEffect(() => {
    //     const qry = query(collection(db, "donationRequest"));
    //     const q = query(qry, where("donationId", "==", scanResultWebCam));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const qrResultArr = [];
    //         querySnapshot.forEach((doc) => {
    //             qrResultArr.push(doc.data())
    //         });
    //         setQrDonorResult(qrResultArr)
    //     });
    // }, [scanResultWebCam])

    // let currentRecipientMapScan = qrRecipientScanResult.map((element, pos) => {
    //     return (
    //         <div className='recipientFullDetails'>
    //             <b>Recipient Id:</b> {element.recipientId} <br />
    //             <b>Name:</b> {element.name} <br />
    //             <b>Email:</b> {element.email} <br />
    //             <b>Phone </b>Number: {element.phoneNum} <br />
    //             <b>City: </b>{element.city} <br />
    //             <b>NIC: </b> {element.nic} <br />
    //             <b>Blood Group: </b> {element.bloodGroup} <br />
    //             <b>Reports: </b> <br />
    //             <img src={element.reportUrl} /> <br />
    //             <b>Status:</b> {element.status}<br /> <br />
    //         </div>
    //     )

    // })
    // let currentDonorMapScan = qrDonorScanResult.map((element, pos) => {
    //     return (
    //         <div>
    //             <b>Donor Id:</b> {element.donationId} <br />
    //             <b>Name:</b> {element.name} <br />
    //             <b>Email:</b> {element.email} <br />
    //             <b>Phone Number:</b> {element.phoneNum} <br />
    //             <b>City:</b> {element.city} <br />
    //             <b>NIC:</b> {element.nic} <br />
    //             <b>Blood Group:</b> {element.bloodGroup} <br />
    //             <b>Weight:</b> {element.weight} <br />
    //             <b>Recent Illeness:</b> {element.latestIllness}<br />
    //             <b>Status:</b> {element.status}<br /> <br />
    //         </div>
    //     )

    // })

    ///////////////////////////////////////////////////////
    const onRecipientConfirm=()=>{
        let dateTime = new Date();
        let date = dateTime.toLocaleString('en-US');
        date.toString();
        const nameRef = doc(db, "recipientRequest", scanResultFile );
        updateDoc(nameRef, {
            date:date,
        })
    }

    const onDonationConfirm=()=>{
        let dateTime = new Date();
        let date = dateTime.toLocaleString('en-US');
        date.toString();
        const nameRef = doc(db, "donationRequest", scanResultFile );
        updateDoc(nameRef, {
            date:date,
        })
    }

    let currentRecipientMap = qrRecipientResult.map((element, pos) => {
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
                <div className='imgReport'><img src={element.reportUrl} /></div> <br />
                <b>Status:</b> {element.status}<br /> <br />
                <button className='cnfButt' onClick={onRecipientConfirm}>Confirm</button>
            </div>
        )

    })
    let currentDonorMap = qrDonorResult.map((element, pos) => {
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
                <button className='cnfButt' onClick={onDonationConfirm}>Confirm</button>
            </div>
        )

    })


    return (
        <div>
            <div className='header'>
                <div className='appNamea'><p >Life Source <span className='appTagline'>Give and let Live.</span></p></div>
                <div className='modeLogout'>Logout</div>
            </div>
            <div className='qrResult'>
                <div className='qrResultByImg'>
                    <h4>Qr Code Scan by Image</h4>
                    <QrReader
                        ref={qrRef}
                        delay={300}
                        style={{ width: '100%' }}
                        onError={handleErrorFile}
                        onScan={handleScanFile}
                        legacyMode
                    />
                    <button className='cnfButt' onClick={onScanFile}>Scan Qr Code</button>

                </div>
                <div className='qrResultByScan'>
                    <h4>Qr Code Scan by Web Cam</h4>
                    <QrReader
                        delay={300}
                        style={{ width: '100%' }}
                        onError={handleErrorWebCam}
                        onScan={handleScanWebCam}
                    />
                </div>
                <div className='qrResultByImgShow' ><h2>Scanned Result:</h2>
                    {currentDonorMap}{currentRecipientMap}</div>
                {/* <div className='qrResultByScanShow'><h2>Scanned Result:</h2>
                    {currentDonorMapScan}{currentRecipientMapScan}</div> */}
            </div>
        </div>

    );
};

export default ModeratorDashboard;
