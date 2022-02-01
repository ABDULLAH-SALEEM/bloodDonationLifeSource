import React from 'react'
import NavbarOptions from '../NavbarOptions/NavbarOptions'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div>
                <NavbarOptions />
            </div>
            <div>
                <p className='logoName'>Life Source <span className='LogoTagline'>Live and Let Live</span></p>
            </div>
            
        </div>
    )
}

export default Navbar
