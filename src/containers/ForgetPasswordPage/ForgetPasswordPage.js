
import React from 'react';
import 'antd/dist/antd.css';
import {Form, Button, Input, Icon} from 'antd';
import Logo from '../../components/Logo';
import{ connect } from 'react-redux';
import './style.scss';
import { userActions } from '../../actions/user.actions';

require('dotenv').config()

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ForgetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }
  
    componentDidMount() {
    }

    handleSubmit = e => {
      e.preventDefault();
      const {getFieldsValue} = this.props.form;
      const values = getFieldsValue();

      this.props.requireResetPassword({
          email: values.email,
      });

      this.setState({isFirstLoad:false});
    }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {pending, errMessage, successMessage} = this.props;
    console.log(successMessage);
    const emailError = isFieldTouched('email') && getFieldError('email');

    return (
      <div className="login-page-component">
        <div className="login-form-component">
          <div className="left-component">
            <img src="./login-img.png" alt="" className="login-img"></img>
          </div>
          <div className="forget-pass-component">
            <div>
              <Logo size={120}></Logo>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item />
                    {successMessage && !this.state.isFirstLoad &&
                      <Form.Item >
                        <div>{successMessage}</div>
                      </Form.Item>
                    }
                    
                    {errMessage && !this.state.isFirstLoad &&
                      <Form.Item>
                        <div>{errMessage}</div>
                      </Form.Item>
                    }
                {this.state.isFirstLoad && 
                <>
                <Form.Item>
                  <div>Nhập email của bạn để đặt lại mật khẩu</div>
                </Form.Item>
                <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập email!',
                      },
                      {
                        type: 'email',
                        message: 'Email không hợp lệ',
                      },
                    ],
                  })(<Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email của bạn"
                    />
                    )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="forget-pass-btn" loading={pending}>
                    Nhận email
                  </Button>
                </Form.Item>
                </>
                }
              </Form>
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
    pending: state.user.pending,
  };
}

const mapDispatchToProps = (dispatch) => ({
  requireResetPassword: (email) => dispatch(userActions.requireResetPassword(email)),
});

const ForgetPasswordPage = Form.create({ name: 'forget-pass' })(ForgetPasswordForm)

 export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordPage)