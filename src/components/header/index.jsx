import React from 'react'
// import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import Prof from '../profile/Prof'
// import { getAuth } from 'firebase/auth'
import "./header.css"
import Navbar from './Navbar'
import NavbarRegister from './NavbarRegister'

const Header = () => {
    // const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    // const auth2 = getAuth();
    return (
        <>
        <Prof/>

       
    
        <div className='navbarHeader'>
            {
                userLoggedIn
                    ?
                    <>
                        <Navbar/>
                    </>
                    :
                    < >
                        <NavbarRegister></NavbarRegister>
                    </>
            }

            

        </div>

        {/* <DrawerAppBar/> */}

        </>
    )
}

export default Header