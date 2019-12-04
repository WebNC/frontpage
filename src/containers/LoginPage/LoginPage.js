import React from 'react';
import { Form, Input, Button, Icon} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { access } from 'fs';
import Logo from '../../components/Logo'

require('dotenv').config()

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }
    
    componentDidMount() {
      this.props.form.validateFields();
    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      this.props.login({
          email: values.email,
          password: values.password,
      });

      this.setState({isFirstLoad:false});
    }

    responseFacebook = (response) => {
      this.props.loginWithFB(response.accessToken);
    }

    responseGoogle = (response) => {
      this.props.loginWithGG(response.Zi.access_token);
    }


  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message, pending} = this.props;
    console.log(pending);
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    
    return (
      <div className="login-page-component">
        <div className="login-form-component">
          <div className="left-component">
            <img src="./login-img.png" alt="" className="login-img"></img>
          </div>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <Logo></Logo>
                {!this.state.isFirstLoad && message &&
                  <div className="error-message">{message}</div>
                }
            </Form.Item>
            <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ],
              })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Tên đăng nhập"
                />
                )}
            </Form.Item>

            <Form.Item hasFeedback validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  }
                ],
              })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Mật khẩu"
              />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })}
              <a className="login-form-forgot" href="#">
                Quên mật khẩu?
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())}>
                Đăng nhập
              </Button>
              <p>Bạn có thể đăng nhập với các tài khoản xã hội: </p>
              <div className="login-button-component">
                <FacebookLogin
                  appId = "771279956617163"
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  textButton="Facebook"
                  cssClass="button-login-facebook"
                />
                <GoogleLogin
                  clientId= "951194193712-20krm3fg807tvb7mqr4h080cakkg1msn.apps.googleusercontent.com"
                  buttonText="Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  className="button-login-google"
                  icon={false}
                />
              </div>
              <p>Bạn chưa có tài khoản?<a href="/register"> Đăng ký ngay!</a></p>
            </Form.Item>
          </Form>
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
  login: (email, password) => dispatch(userActions.login(email,password)),
  loginWithFB:(accessToken) => dispatch(userActions.loginWithFB(accessToken)),
  loginWithGG: (accessToken) => dispatch(userActions.loginWithGG(accessToken))
});

const LoginPage = (Form.create({ name: 'login' })(LoginForm));

 export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

