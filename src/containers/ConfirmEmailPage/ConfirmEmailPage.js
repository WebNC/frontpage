
import React from 'react';
import 'antd/dist/antd.css';
import Logo from '../../components/Logo';

require('dotenv').config()

class ConfirmEmailPage extends React.Component {

  render() {
    
    return (
      <div className="login-page-component">
        <div className="login-form-component">
          <div className="left-component">
            <img src="/login-img.png" alt="" className="login-img"></img>
          </div>
          <div className="active-email-component">
            <div>
            <Logo size={120} style={{margin: 30}}/>
              <p>
                Hệ thống đã gửi thông báo vào mail cho bạn. 
              </p>
              <p>
                Mời bạn kiểm tra mail để hoàn thành đăng ký.
              </p>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default ConfirmEmailPage