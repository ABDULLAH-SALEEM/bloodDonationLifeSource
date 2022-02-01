import React from 'react';
import './Sidebar.css'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate()
    const auth1 = getAuth();
    const adminLogout = () => {
        signOut(auth1).then(() => {
            navigate('/admin')
        }).catch((error) => {
        });
    }

    onAuthStateChanged(auth1, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            adminLogout();
        }
    });
    return (
        <div className='sidebar'>
            <div><Link className='donorApp' to='/admin/dashboard'>Dashboard</Link></div>
            <div><Link className='donorApp' to='/admin/dashboard/donarApplication'>Donor Applications</Link></div>
            <div><Link className='donorApp' to='/admin/dashboard/recipientApplication'>Recipient Applications</Link></div>
            <div><Link className='donorApp' to='/admin/dashboard/bloodBanks'>Blood Banks</Link></div>
            <div><Link className='donorApp' to='/admin/dashboard/reportedProblem'>Reported Problems</Link></div>
            <div>About App</div>
            <div>Settings</div>
            <div onClick={adminLogout}>Logout</div>
        </div>
    );
};

export default Sidebar;
