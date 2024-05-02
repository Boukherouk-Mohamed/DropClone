import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import Prof from '../profile/Prof'
import { getAuth } from 'firebase/auth'
import "./header.css"
import DrpDown from './DrpDown'
import Navbar from './Navbar'
import NavbarRegister from './NavbarRegister'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    const auth2 = getAuth();
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