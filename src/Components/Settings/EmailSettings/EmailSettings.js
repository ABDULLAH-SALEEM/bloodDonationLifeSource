import React, { useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { db, auth } from '../../Auth/Firebase';
import { updateEmail } from '@firebase/auth';
import './EmailSettings.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
};

const EmailSettings = () => {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [newEmail, setNewEmail] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateNewEmail = () => {
        const emailRef = doc(db, "users", currentUser.uid);
        updateDoc(emailRef, {
            email: newEmail
        });
        updateEmail(auth.currentUser, newEmail).then(() => {
        });
        setOpen(false);
    }


    const onEmailChangeHandler = (e) => {
        setNewEmail(e.target.value);
    }
    return (
        <div>
            <div onClick={handleOpen}>
                <h4 className='edit'>Edit</h4>
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
                        <div className='cancelIcon'><CancelIcon onClick={handleClose} /></div>
                        <p className='emailSettings'>Edit Email</p>
                        <TextField className="emailInput" value={newEmail} id="standard-basic" onChange={onEmailChangeHandler} label="Enter New Email" variant="standard" /><br />
                        <Button onClick={updateNewEmail} variant="contained" className='saveEmailChanges'>Save Changes</Button>
                    </Box>
                </Fade>
            </Modal>

        </div >
    )
}

export default EmailSettings;
