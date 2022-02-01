import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { db } from '../Auth/Firebase';
import { setDoc, doc } from 'firebase/firestore';
import './DonateBlood.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const DonateBlood = () => {
    const [open, setOpen] = React.useState(false);
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [phone, setPhone]=useState('')
    const [blood, setBlood]=useState('')
    const [nic, setNIC]=useState('')
    const [weight, setWeight]=useState('')
    const [city, setCity]=useState('')
    const [illness, setIllness]=useState('')
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const nameChangeHandler=(e)=>{
        setName(e.target.value)
    }
    const emailChangeHandler=(e)=>{
        setEmail(e.target.value)
    }
    const phoneChangeHandler=(e)=>{
        setPhone(e.target.value)
    }
    const nicChangeHandler=(e)=>{
        setNIC(e.target.value)
    }
    const cityChangeHandler=(e)=>{
        setCity(e.target.value)
    }
    const weightChangeHandler=(e)=>{
        setWeight(e.target.value)
    }
    const illnessChangeHandler=(e)=>{
        setIllness(e.target.value)
    }
    const bloodChangeHandler=(e)=>{
        setBlood(e.target.value)
    }

    const donateSubmitHandler=(e)=>{
        e.preventDefault();
        const head = Date.now().toString(36);
        const tail = Math.random().toString(36).substring(2);
        const random = head + tail;
        setDoc(doc(db, 'donationRequest', random ), {
            userUid: currentUser.uid,
            name,
            email,
            phoneNum:phone,
            city,
            nic,
            weight,
            latestIllness:illness,
            bloodGroup:blood,
            donationId:random,
            status:"Pending"
        })
    }
    return (
        <div>
            <div className='editButton' onClick={handleOpen}>
                Tap To Donate
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='donHeader'>
                            <p className='donHeading'>Application For Donation</p>
                            <CancelIcon onClick={handleClose} />
                        </div>
                        <form className='donateBloodForm' onSubmit={donateSubmitHandler}>
                            <TextField className="nameInput" onChange={nameChangeHandler}  id="standard-basic" label="Name" variant="standard" />
                            <TextField className="emailInput" onChange={emailChangeHandler} id="standard-basic" label="Email" variant="standard" />
                            <TextField className="phoneInput" onChange={phoneChangeHandler} id="standard-basic" label="Phone Number" variant="standard" />
                            <TextField className="cityInput" onChange={cityChangeHandler} id="standard-basic" label="City" variant="standard" />
                            <TextField className="nicInput" onChange={nicChangeHandler} id="standard-basic" label="NIC" variant="standard" />
                            <TextField className="bloodInput" onChange={bloodChangeHandler} id="standard-basic" label="Blood Group (Optional)" variant="standard" />
                            <TextField className="illnessInput" onChange={illnessChangeHandler} id="standard-basic" label="Resent Illnes (If Any)" variant="standard" />
                            <TextField className="weightInput" onChange={weightChangeHandler} id="standard-basic" label="Weight" variant="standard" />
                            <button onClick={handleClose} className='bloodDonationSibmitBut'>Submit</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default DonateBlood
