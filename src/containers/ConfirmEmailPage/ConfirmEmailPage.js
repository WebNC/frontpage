
import React from 'react';
import 'antd/dist/antd.css';
import{ connect } from 'react-redux';

require('dotenv').config()

class ConfirmEmailPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }
    
    componentDidMount() {
    }

    handleSubmit = e => {

      this.setState({isFirstLoad:false});
    }

  render() {
    
    return (
      <div className="login-page-component">
        <div className="login-form-component">
          <div className="left-component">
            <img src="./login-img.png" alt="" className="login-img"></img>
          </div>
          <div className="active-email-component">
            <div>
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

function mapStateToProps(state) {
  return { 
    message: state.user.message,
    pending: state.user.pending,
  };
}

const mapDispatchToProps = (dispatch) => ({
});

 export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailPage)