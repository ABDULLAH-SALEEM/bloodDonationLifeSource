import React, { useState } from 'react';
import { doc, updateDoc, query, collection, onSnapshot } from "firebase/firestore";
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import CancelIcon from '@material-ui/icons/Cancel';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { db } from '../../Auth/Firebase';
import './NameSettings.css';

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

const NameSettings = () => {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [newName, setNewName] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateNewName = () => {
        const nameRef = doc(db, "users", currentUser.uid);
        updateDoc(nameRef, {
            name: newName
        });
        const q = query(collection(db, "usersPosts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc1) => {
                if(currentUser.uid==doc1.data().userUid){
                    const nameRef = doc(db, "usersPosts", doc1.data().postId );
                    updateDoc(nameRef, {
                        names:newName,
                    })
                }
            });
        });
        setOpen(false);
    }

    const onNameChangeHandler = (e) => {
        setNewName(e.target.value);
    }
    return (
        <div>
            <div  onClick={handleOpen}>
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
                        <p className='nameSettings'>Edit Name</p>
                        <TextField className="nameInput" value={newName} id="standard-basic" onChange={onNameChangeHandler} label="Enter New Name" variant="standard" /><br />
                        <Button onClick={updateNewName} variant="contained" className='saveNameChanges'>Save Changes</Button>
                    </Box>
                </Fade>
            </Modal>

        </div >
    )
}

export default NameSettings;
