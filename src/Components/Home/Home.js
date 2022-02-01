import React,{useEffect} from 'react'
import DonateBlood from '../DonateBlood/DonateBlood'
import Navbar from '../Navbar/Navbar'
import RequestForBlood from '../RequestForBlood/RequestForBlood'
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import InvertColorsRoundedIcon from '@material-ui/icons/InvertColorsRounded';
import axios from 'axios';
import banner from '../../Assets/Images/banner.jpg'
import './Home.css'
import { Avatar } from '@material-ui/core';
import CurrentUser from '../CurrentUser/CurrentUser';
import Footer from './Footer';
import AvatarName from '../AvatarNameCurrentUser/AvatarName';

const Home = () => {

    return (
        <div className='home'>
            <Navbar />
            <div className='body'>
                <div className='bodySecOne'>
                    <AvatarName />
                    {/* <Avatar className='bodyAvat' />
                    <div>
                        <p><CurrentUser /></p>
                        <p>Blood Group: </p>
                    </div> */}

                </div>
                <div><DonateBlood /></div>
            </div>
            <div className='homeOr'>OR</div>
            <div><RequestForBlood /></div>

            {/* <div className='footer'>
                <div className='footerOpt'>
                    <div><InvertColorsRoundedIcon /></div>
                    <div><HomeRoundedIcon /></div>
                    <div><LocalHospitalRoundedIcon /></div>
                </div>

            </div> */}
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Home
