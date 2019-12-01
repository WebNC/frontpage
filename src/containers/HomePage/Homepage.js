import React from 'react';
import './style.css';
import {Button} from 'antd';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import {history} from '../../helper';
import Header from '../../components/Header/Header'


class HomePage extends React.Component {
  
  render() {
    const {logout, getdetail, username, message, loggedIn} = this.props;
    return (
      <div className="home">
        <Header username = {username}/>
         <h2>Home Page</h2>
          {message && !this.state.isFirstLoad &&
                  <div className="error-message">{message}</div>
                }
          <Button type="primary" onClick={()=> logout()} disabled={!loggedIn}>Đăng xuất</Button>
          <Button type="primary" onClick ={() => getdetail()} disabled={!loggedIn}>Thông tin cá nhân</Button>
      </div> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    message: state.user.message,
    loggedIn: state.user.loggedIn,
  };

}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
  getdetail: ()  => dispatch(userActions.getdetail()),
  //loginWithFBGG:(token) => dispatch(userActions.loginWithFBGG(token))
});

 export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

