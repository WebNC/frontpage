import React from 'react';
import './Footer.scss';
import { SocialIcon } from 'react-social-icons';

class Footer extends React.Component {
  
  render() {
    return (
      <div className="footer">
        <h6 >Looking to hire for many awesome classes to develope yourself</h6>
        <div className="d-flex justify-content-between p-5 sub-infor">
          <h5>About Us</h5>
          <h5>Resources</h5>
          <h5>Browse</h5>
        </div>
        <div className="d-flex follow-us justify-content-between">
          <div className="d-flex">
            <p>Follow us</p>
            <SocialIcon url="https://www.facebook.com/" label="facebook" style={{ height: 25, width: 25 }} className="mr-2 ml-4"/>
            <SocialIcon url="http://twitter.com/" label="twitter" style={{ height: 25, width: 25 }}className="mr-2"/>
            <SocialIcon url="https://www.instagram.com/" label="instagram" style={{ height: 25, width: 25 }}className="mr-2" />
            <SocialIcon url="https://www.linkedin.com/" label="linkedin" style={{ height: 25, width: 25 }}className="mr-2"/>

          </div>

          <div className="d-flex">
            <p>Other</p>
            <SocialIcon url="https://www.youtube.com/" label="youtube" style={{ height: 25, width: 25 }} className="mr-2 ml-4"/>
            <SocialIcon url="https://webchat.teamontherun.com/" label="twitter" style={{ height: 25, width: 25 }}className="mr-2"/>
          </div>
         
        </div>
        <h6 className="copyright">© 2015 - 2019 Upwork® Global Inc.</h6>
      
      </div> 
    );
  }
}

export default Footer;