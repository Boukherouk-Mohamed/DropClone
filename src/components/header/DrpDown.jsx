import React from 'react';
import { Dropdown, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import './header.css'
import {  getAuth } from 'firebase/auth';


const DrpDown = () => {

    const auth2 = getAuth();

    const navigate = useNavigate()


    const items = [
        {
          key: '1',
          label: (
              <Link className='' to={'/profile'} style={{display:"flex", alignItems:"center"}}><img src={auth2.currentUser.photoURL} style={{width:"30px",height:"30px", borderRadius:'50%', marginRight:"1rem"}} alt=""  /> {auth2.currentUser.displayName}  </Link>
      
          ),
        },
        {
          key: '2',
          label: (
              <Link style={{paddingLeft:"1rem"}} onClick={() => { doSignOut().then(() => { navigate('/login') }) }}> <LogoutOutlined  /> Logout</Link>
      
          ),
        },
      ];

    return (

  <Space direction="vertical">
    <Space wrap>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        arrow
        style={{width:"150px"}}
      >
        <div className='btnProfLogoutHeader'> 
        
        <svg
      class="icon"
      stroke="currentColor"
      fill="white"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
      ></path>
    </svg>
        </div>
      </Dropdown>

    </Space>

  </Space>
    )
};
export default DrpDown;