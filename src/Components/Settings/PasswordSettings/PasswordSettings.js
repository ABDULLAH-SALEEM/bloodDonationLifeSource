import React, { useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import CancelIcon from '@material-ui/icons/Cancel';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { db, auth } from '../../Auth/Firebase';
import { updatePassword } from '@firebase/auth';
import './PasswordSettings.css';

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

const PasswordSettings = () => {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [newPassword, setNewPassword] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateNewPassword = () => {
        const passwordRef = doc(db, "users", currentUser.uid);
        updateDoc(passwordRef, {
            password: newPassword
        });
        updatePassword(auth.currentUser, newPassword).then(() => {
        });
        setOpen(false);
    }


    const onPasswordChangeHandler = (e) => {
        setNewPassword(e.target.value);
    }
    return (
        <div>
            <div onClick={handleOpen}>
                <h4 className='edit' >Edit</h4>
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
                        <p className='passwordSettings'>Edit Password</p>
                        <TextField className="passwordInput" value={newPassword} id="standard-basic" onChange={onPasswordChangeHandler} label="Enter New Password" variant="standard" /><br />
                        <Button onClick={updateNewPassword} variant="contained" className='savePasswordChanges'>Save Changes</Button>
                    </Box>
                </Fade>
            </Modal>

        </div >
    )
}

export default PasswordSettings;
