import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../Auth/Firebase';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Home/Footer';
import './DonationStatus.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 270,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

const DonationStatus = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let [donationCard, setDonationCard] = useState('');
    let [status, setStatus] = useState('')

    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "donationRequest"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setDonationCard(doc.data().qrCode)
                    console.log(doc.data());
                    setStatus(doc.data().status)
                });
            });
        }
    }, [status])
    console.log(donationCard);
    return (
        <div>
            <div className='nav'>
                <Navbar />
            </div>
            <div>
                <h3>Donation Status</h3>
                {(status)?<><div className='donationStatus' onClick={handleOpen} ><b>Status:</b>{status}</div>
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

                            <div className='donationCrad'>
                                {(status == "Denied") ? <div>Sorry to inform you but your request has been denied</div>: ''}
                                {(status == "Pending")?"Your request will be varified by us and we will notify you soon":''}
                                {(status == "Approved") ? <div>Your request has been approved. Download this E-card and bring it with you while visiting any nearest blood bank.</div>:''}
                                {(status == "Approved") ? <div> <img src={donationCard} /></div> : ''}
                                {(status == "Approved") ? <div> <a href={donationCard} download >Click To Download Card</a></div> : ''}
                            </div>
                        </Box>
                    </Fade>
                </Modal></>:<div className='noData'>No data to show</div>}
                
            </div>
            <div>
                <Footer />
            </div>
        </div>

    );
};

export default DonationStatus;
