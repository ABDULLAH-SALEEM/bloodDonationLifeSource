import React from 'react'
import { Avatar } from '@material-ui/core'
import { getAuth, onAuthStateChanged, signOut as userSignOut } from "firebase/auth";
import './NavbarOptions.css'
import { Link, useNavigate } from 'react-router-dom'
import CurrentUser from '../CurrentUser/CurrentUser';
import VarifiedRecipients from '../VarifiedRecipients/VarifiedRecipients';
import CurrentAvatar from '../AvatarNameCurrentUser/CurrentAvatar';
import CurrentName from '../AvatarNameCurrentUser/CurrentName';

const NavbarOptions = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const Logout = () => {
        userSignOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
        });
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            Logout();
        }
    });

    return (
        <div>
            <input type="checkbox" id="check" />
            <label for="check">
                <span class="toggle-button">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </span>
            </label>

            <div className='navbarComponents'>
                <div>
                    <div className='navAvatar'>
                        <CurrentAvatar className='avatar' />
                        <p className='currnetN'><CurrentName /></p>
                        <p><Link className='prof' to='/profile'>Edit Profile</Link></p>
                    </div>
                    <div className='optDiv'>
                        <p><Link className='varified' to='/varifiedRecipients' >Varified Recipients</Link></p>
                        <p><Link className='varifiedDonors' to='/varifiedDonors' >Varified Donors</Link></p>
                        <p><Link className='varifiedDonors' to='/bloodCompatibility' >Blood Compatibility</Link></p>
                        <p><Link className='varifiedDonors' to='/bloodBanks' >Blood Banks</Link></p>
                        <p><Link className='varifiedDonors' to='/donationStatus' >Donation Status</Link></p>
                        <p><Link className='varifiedDonors' to='/recipientStatus' >Recipient Status</Link></p>
                        <p><Link className='varifiedDonors' to='/history' >History</Link></p>
                        <p><Link className='varifiedDonors' to='/reportProblem' >Report a Problem</Link></p>
                        <p onClick={Logout} >Logout</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default NavbarOptions
