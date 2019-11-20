import React from 'react';
import { Form, Input, Button, Icon} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'
// import moment from 'moment';
// const { Option } = Select;
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
      this.props.form.validateFields();
    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      this.props.register({
          email: values.email,
          password: values.password,
          username: values.username
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

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message, pending} = this.props;
    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');
    const usernameError = isFieldTouched('username') && getFieldError('username');
    // const ageError = isFieldTouched('age') && getFieldError('age');
    // const sexError = isFieldTouched('sex') && getFieldError('sex');
    // const degreeError = isFieldTouched('degree') && getFieldError('degree');
    // const phoneError = isFieldTouched('phone') && getFieldError('phone');

    return (
      <div className="registerform-component">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              <h1>WEB NAME</h1>
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
            {/* <Form.Item validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
              {getFieldDecorator('age', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập ngày sinh!',
                  },
                ],
              })(<DatePicker placeholder='Ngày sinh' format={dateFormat} style={{width:370}}/>
                )}
            </Form.Item>
            <Form.Item validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                  },
                ],
              })(<Input
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Số điện thoại"
                />
                )}
            </Form.Item>
            <Form.Item validateStatus={sexError ? 'error' : ''} help={sexError || ''}>
              {getFieldDecorator('sex', {
                rules: [{ 
                  required: true, 
                  message: 'Vui lòng chọn giới tính!' 
                }],
              })(
                <Select placeholder="Giới tính">
                  <Option value="nam">Nam</Option>
                  <Option value="nu">Nữ</Option>
                  <Option value="khac">Khác</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item validateStatus={degreeError ? 'error' : ''} help={degreeError || ''}>
              {getFieldDecorator('degree', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng chọn trình độ!',
                  },
                ],
              })(<Select placeholder="Trình độ">
                  <Option value="th">Tiểu học</Option>
                  <Option value="thcs">THCS</Option>
                  <Option value="thpt">THPT</Option>
                  <Option value="cd">Cao đẳng</Option>
                  <Option value="dh">Đại học</Option>
                  <Option value="khac">Khác</Option>
                </Select>,
                )}
            </Form.Item> */}
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
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button" disabled={hasErrors(getFieldsError())} loading = {pending ? pending : false}>
                Đăng ký
              </Button>
              <p>Bạn đã có tài khoản?<a href="/login"> Đăng nhập ngay!</a></p>
            </Form.Item>
          </Form>
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
  register: (user) => dispatch(userActions.register(user))
});

const RegisterPage = (Form.create({ name: 'register' })(RegistrationForm));

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)