import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import { db } from '../Auth/Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './RequestForBlood.css'


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

const RequestForBlood = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const storage = getStorage();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [blood, setBlood] = useState('')
    const [nic, setNIC] = useState('')
    const [city, setCity] = useState('')
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState("");
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }
    const phoneChangeHandler = (e) => {
        setPhone(e.target.value)
    }
    const nicChangeHandler = (e) => {
        setNIC(e.target.value)
    }
    const cityChangeHandler = (e) => {
        setCity(e.target.value)
    }
    const bloodChangeHandler = (e) => {
        setBlood(e.target.value)
    }
    let reportName = ""
    const onImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            reportName = file.name
            uploadHandler(file)
        }
    }
    const uploadHandler = (files) => {
        const storangeRef = ref(storage, `Reports/${reportName}`);
        const uploadTask = uploadBytesResumable(storangeRef, files)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = "Progress: " + Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + " %";
            setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setUrl(url);
                    })
            }
        )
    }
    const recipientSubmitHandler = (e) => {
        e.preventDefault();
        const head = Date.now().toString(36);
        const tail = Math.random().toString(36).substring(2);
        const random = head + tail;
        setDoc(doc(db, 'recipientRequest', random), {
            userUid: currentUser.uid,
            name,
            email,
            phoneNum: phone,
            city,
            nic,
            bloodGroup: blood,
            recipientId: random,
            reportUrl: url,
            status:"Pending"
        })
    }



    return (
        <div>
            <div className='editReqButton' onClick={handleOpen}>
                Request For Blood
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
                        <div className='reqHeader'>
                            <p className='reqHeading'>Request For Blood</p>
                            <CancelIcon onClick={handleClose} />
                        </div>

                        <form className='recieveBloodForm' onSubmit={recipientSubmitHandler}>
                            <TextField className="nameInput" onChange={nameChangeHandler} id="standard-basic" label="Name" variant="standard" />
                            <TextField className="emailInput" onChange={emailChangeHandler} id="standard-basic" label="Email" variant="standard" />
                            <TextField className="phoneInput" onChange={phoneChangeHandler} id="standard-basic" label="Phone Number" variant="standard" />
                            <TextField className="nicInput" onChange={nicChangeHandler} id="standard-basic" label="NIC" variant="standard" />
                            <TextField className="cityInput" onChange={cityChangeHandler} id="standard-basic" label="City" variant="standard" />
                            <TextField className="bloodInput" onChange={bloodChangeHandler} id="standard-basic" label="Blood Group (Optional)" variant="standard" />
                            <label for='uploadReport'><p className='uploadReports'><PublishIcon />Upload Reports</p></label>
                            <input id='uploadReport' onChange={onImageChangeHandler} type="file" />
                            <button onClick={handleClose} className='bloodRecieveSibmitBut'>Submit</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default RequestForBlood
