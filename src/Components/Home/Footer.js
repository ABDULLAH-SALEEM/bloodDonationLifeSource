import React from 'react';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import InvertColorsRoundedIcon from '@material-ui/icons/InvertColorsRounded';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='footer'>
            <div className='footerOpt'>
                <div><Link className='homeIco' to='/varifiedDonors'><InvertColorsRoundedIcon /></Link></div>
                <div><Link className='homeIco' to='/' ><HomeRoundedIcon /></Link></div>
                <div><Link className='homeIco' to='/varifiedRecipients'><LocalHospitalRoundedIcon /></Link></div>
            </div>

        </div>
    );
};

export default Footer;
