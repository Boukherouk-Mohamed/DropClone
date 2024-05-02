import React from 'react'
import { Provider } from 'react-redux'
import SideBarFinal from '../sidebar/SideBarFinal'
import Navbar from '../header/Navbar'

const Home = () => {
    return (
        <div className='text-2xl font-bold pt-14'>
            
            {/* <Data></Data> */}
                {/* <Provider>
                    <Sidebar />
                </Provider> */}
                <SideBarFinal></SideBarFinal>
                

        
        </div>
    )
}

export default Home