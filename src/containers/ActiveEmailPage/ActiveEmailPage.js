import React from 'react';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';

require('dotenv').config()

class ActiveEmailPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }
    
    componentDidMount() {
      const {user, activeEmail} = this.props;
      activeEmail(user.token);
    }

    handleSubmit = e => {

      this.setState({isFirstLoad:false});
    }

  render() {
    const {errMessage, successMessage, user} = this.props;
    
    return (
      <div className="login-page-component">
        <div className="login-form-component">
          <div className="left-component">
            <img src="./login-img.png" alt="" className="login-img"></img>
          </div>
          <div className="active-email-component">
            <div>
              {(errMessage !== undefined && successMessage !== undefined) ? 
              (
                <p>
                  Chào {user.username}, <br/>
                  Bạn đã kích hoạt tài khoản thành công. <br/>
                  Nhấn vào <Link to='/'>đây</Link>để đến Trang chủ. <br />
                  {errMessage}
                </p>
              ):(
                <p>
                  {/* Chào {user.username}, <br/>
                  Đã có lỗi xảy ra trong quá trình xác nhận mail của bạn. <br />
                  Hãy thử <Link to='/login'> đăng nhập </Link> để nhận lại mail xác nhận! <br />
                  {errMessage} */}
                  aaaaaaaa
                </p>
              )
              } 
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

function mapStateToProps(state) {
  return { 
    errMessage: state.user.errMessage,
    successMessage: state.user.successMessage,
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  activeEmail: (token) => dispatch(userActions.activeEmail(token)),
});

 export default connect(mapStateToProps, mapDispatchToProps)(ActiveEmailPage)



