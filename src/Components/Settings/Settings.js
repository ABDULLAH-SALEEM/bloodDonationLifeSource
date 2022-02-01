import React from 'react';
import { Divider } from '@material-ui/core';
import CurrentName from '../AvatarNameCurrentUser/CurrentName';
import EmailSettings from './EmailSettings/EmailSettings';
import PasswordSettings from './PasswordSettings/PasswordSettings';
import NameSettings from './NameSettings/NameSettings';
import CurrentEmail from '../AvatarNameCurrentUser/CurrentEmail';
import './Settings.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Home/Footer';
import CurrentUserProfileAvatar from './CurrentUserProfileAvatar/CurrentUserProfileAvatar';
import CurrentUser from '../CurrentUser/CurrentUser';

const style={
    color:'black'
}

const Settings = () => {
    return (
        <div>
            <div className='nav'>
                <Navbar />
            </div>
            <div>
                <div>
                    <CurrentUserProfileAvatar />
                    <h2 className='accSet'>General Account Settings</h2>
                    <Divider />
                    <div className='set'><div className='nameSet'> <h4> Name:</h4><CurrentUser /></div><NameSettings /></div>
                    <Divider />
                    <div className='set'> <div className='nameSet'><h4> Email:</h4><CurrentEmail /></div><EmailSettings /></div>
                    <Divider />
                    <div className='set'><div className='nameSet'><h4> Password:</h4>*******</div><PasswordSettings /></div>
                    <Divider />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Settings
