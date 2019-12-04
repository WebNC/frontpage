import React from 'react';
import {Input} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import {Link} from 'react-router-dom'
import Logo from '../Logo'


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
        <div className="tab-component">
          <a href="/home">TRANG CHỦ</a>
        </div>
        <div className="search-bar">
            <Search placeholder="Nhập từ khóa"
              style={{ width: 400, color: "#143675" }}
            />
          </div>
         <div className="user-component">
         {
          username !== null ? (
              <a href="/user-info">{username}</a>
          ) : (
            <a href="/login">ĐĂNG NHẬP</a>
            )
          }
         </div>
      </div>
      
    );
  }
}

export default Header