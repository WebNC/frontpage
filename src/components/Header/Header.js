import React from 'react';
import {Input, Button} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import Logo from '../Logo'
import {history} from '../../helper'
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';


const {Search} = Input;

class Header extends React.Component {

  render() {
    const {user, logout} = this.props;
    return (
      <div className="header">
        <div className="tab-component">
          <Logo size={60}></Logo>
          <Button type="link" className="btn-header" onClick={()=> history.push('/home')}>Trang Chủ</Button>
        </div>
        <div className="search-bar">
            <Search placeholder="Nhập từ khóa"
              style={{ width: 400, color: "#0c6b94" }}
            />
          </div>
         
         {
          user !== null && user!== undefined ? (
            <div className="user-component">
              <Button className="btn-header" type="link" onClick={() => history.push('/student/info')}>{user.username}</Button>
              <Button className="btn-header" type="link" onClick={()=> logout()}>Đăng xuất</Button>
            </div>
          ) : (
            <div className="user-component">
              <Button className="btn-header" type="link" onClick={() => history.push('/login')}>Đăng Nhập</Button>
              <Button className="btn-header" type="link" onClick={() => history.push('/register')}>Đăng Ký</Button>
            </div>
            )
          }
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return { 
    user: state.user.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getdetail()),
  logout: () => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)
