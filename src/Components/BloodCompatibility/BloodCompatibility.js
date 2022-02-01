import React, {useState, useEffect} from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Home/Footer';
import bloodCom from './bloodCom.jpg'
import './BloodCompatibility.css'
// import './VarifiedRecipients.css'

const BloodCompatibility = () => {

    return (
        <div>
            <div className='nav'>
                <Navbar />
            </div>
            <div>
                <h3 className='bloodHead'>Blood Compability</h3>
                <div className='bloodCom'>
                    <img src={bloodCom} />
                </div>
                
                
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default BloodCompatibility;
