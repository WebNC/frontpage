
import React from 'react';
import 'antd/dist/antd.css';
import {Form, Button, Input, Icon} from 'antd';
import Logo from '../../components/Logo';
import{ connect } from 'react-redux';
import './style.scss';
import {userActions} from '../../actions/user.actions';

require('dotenv').config()

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }
  
    componentDidMount() {
      const {verifiedAcccountForget} = this.props;
      verifiedAcccountForget(this.props.match.params.token);
    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      const {resetPassword, userId} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      resetPassword({
        id: userId,
        password: values.password
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
    const {successMessage, errMessage, pending, userId} = this.props;
    console.log(userId);
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');

    return (
      <div className="login-page-component">
        <div className="login-form-component">
          <div className="left-component">
            <img src="/login-img.png" alt="" className="login-img"></img>
          </div>
          <div className="reset-pass-component">
            <div>
              <Logo size={120}></Logo>
              {userId !== undefined ? (
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {successMessage && !this.state.isFirstLoad &&
                      <div className="success-message">{successMessage}</div>
                    }
                    {errMessage && !this.state.isFirstLoad &&
                      <div className="error-message">{errMessage}</div>
                    }
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
                  <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="reset-pass-btn" loading={pending}>
                      Đặt lại mật khẩu
                    </Button>
                  </Form.Item>
                </Form> 
              ) : (
                  <div>
                    Đã có lỗi xảy ra khi xác nhận mail của bạn. 
                    <span>
                      Không thể đặt lại mật khẩu.
                    </span> 
                  </div>
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
    pending: state.user.pending,
    userId: state.user.userId,
  };
}

const mapDispatchToProps = (dispatch) => ({
  verifiedAcccountForget: (token) => dispatch(userActions.verifiedAcccountForget(token)),
  resetPassword: (user) => dispatch(userActions.resetPassword(user))
});

const ResetPasswordPage = Form.create({ name: 'reset-pass' })(ResetPasswordForm)

 export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)