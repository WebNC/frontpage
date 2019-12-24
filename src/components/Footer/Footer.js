import React from 'react';
import './Footer.scss';
import {  Layout } from 'antd';
import Logo from '../../components/Logo'
import { SocialIcon } from 'react-social-icons';
const {  Footer} = Layout;

class MyFooter extends React.Component {
  
  render() {
    return (
      <Footer style={{ bottom: "0", backgroundColor: "#b8d8f2", color: "#0c6b94" }}>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Logo size={90} />
        </div>
        <div style={{display: "flex", justifyContent: "space-between", padding: "0px 10%", marginTop: "10px"}}>
          <p style={{fontSize: "18px", fontWeight: "bold"}}>227 Nguyễn Văn Cừ, P4, Q5, Tp. Hồ Chí Minh</p>
          <p style={{fontSize: "18px", fontWeight: "bold"}}>0397350xxx</p>
          <p style={{fontSize: "18px", fontWeight: "bold"}}>WebTeam@mail.com</p>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
          <p style={{fontSize: "18px", fontWeight: "bold", paddingTop: "5px"}}>Follow us</p>
          <SocialIcon url="https://www.facebook.com/" label="facebook" style={{ height: 40, width: 40 }} className="mr-2 ml-4"/>
          <SocialIcon url="https://www.instagram.com/" label="instagram" style={{ height: 40, width: 40 }}className="mr-2" />
          <SocialIcon url="https://www.linkedin.com/" label="linkedin" style={{ height: 40, width: 40 }}className="mr-2"/>
        </div>
      </Footer> 
    );
  }
}

export default MyFooter;