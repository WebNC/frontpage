import React from 'react';
import {Input} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import {Link} from 'react-router-dom'


const {Search} = Input;

class Header extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     isFirstLoad: true,
    //   };
    // }

  render() {
    const {username} = this.props;
    return (
      <div className="header">
         <div className="tab-component d-flex">
            <Link to="/home">LOGO</Link>
            <Link to="/home">TRANG CHỦ</Link>
            <div className="search-bar ml-5">
            <Search placeholder="Nhập từ khóa"
                style={{ width: 400, color: "#143675" }}
            />
         </div>
         </div>
       
         <div className="user-component">
         {
          username !== null ? (
              <Link to="/user-info">{username}</Link>
          ) : (
            <Link to="/login">ĐĂNG NHẬP</Link>
            )
          }
         </div>
      </div>
      
    );
  }
}

export default Header