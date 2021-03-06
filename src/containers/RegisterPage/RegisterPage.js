import React from 'react';
import { Form, Input, Button, Icon, Select} from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'
import Logo from '../../components/Logo'
// import moment from 'moment';
const { Option } = Select;
// const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
      };
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      const { form } = this.props;
      form.setFieldsValue({type: "Người học"});
      this.props.form.validateFields();
    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      this.props.register({
          email: values.email,
          password: values.password,
          username: values.username,
          type: values.type
      });
      this.setState({isFirstLoad: false})
    }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không khớp!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  checkPassword = (rule,value, callback) => {
    if(value.length<8 || value.length >20){
      callback('Mật khẩu phải từ 8 đến 20 kí tự')
    }
    callback()
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message, pending} = this.props;
    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const typeError = isFieldTouched('type') && getFieldError('type');

    return (
      <div className="register-page-component">
        <div className="register-form-component">
          <div className="left-component">
            <img src="./login-img.png" alt="" className="register-img"></img>
          </div>
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item className="logo-component">
              <Logo size={120}></Logo>
            </Form.Item>
            <Form.Item>
                {message && !this.state.isFirstLoad &&
                  <div className="error-message">{message}</div>
                }
            </Form.Item>
            <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập tên hiển thị!',
                  },
                ],
              })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Tên đăng nhập"
                />
                )}
            </Form.Item>
            <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Email không hợp lệ',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ],
              })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                />
                )}
            </Form.Item>
            <Form.Item hasFeedback validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                  {
                    validator: this.checkPassword,
                  }
                ],
              })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Mật khẩu"
              />
              )}
            </Form.Item>
            <Form.Item hasFeedback validateStatus={confirmError ? 'error' : ''} help={confirmError || ''}>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Nhập lại mật khẩu"
              />)}
            </Form.Item>
            <Form.Item validateStatus={typeError ? 'error' : ''} help={typeError || ''}>
              {getFieldDecorator('type', {
                rules: [{ 
                  required: true,
                  message: "Vui lòng chọn vai trò bạn mong muốn!"
                }],
              })(
                <Select placeholder="Bạn tham gia với vai trò">
                  <Option value="Người học">Người học</Option>
                  <Option value="Người dạy">Người dạy</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button" disabled={hasErrors(getFieldsError())} loading={pending}>
                Đăng ký
              </Button>
              <p>Bạn đã có tài khoản?<Link to={`/login`}> Đăng nhập ngay!</Link></p>
            </Form.Item>
          </Form>
        </div>
      </div> 
    );
  }
}

function mapStateToProps(state) {
  return { 
    message: state.user.errMessage,
    pending: state.user.pending,
  };
}

const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(userActions.register(user))
});

const RegisterPage = (Form.create({ name: 'register' })(RegistrationForm));

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)