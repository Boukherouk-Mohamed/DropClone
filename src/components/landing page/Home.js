import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner-image.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Your All-in-One Cloud Storage Solution: Store, Share, Download, and Delete Files with Ease!
          </h1>
        <br />
        
        <Link className='secondary-button navLinkStart' style={{fontSize:"15px"}}  to={'/login'}>Start uploading</Link>


        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
