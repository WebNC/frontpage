
import React from 'react';
import 'antd/dist/antd.css';
import {Form, Button, Input, Icon} from 'antd';
import Logo from '../../components/Logo';
import{ connect } from 'react-redux';
import './style.scss';

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
    }

    handleSubmit = e => {
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
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');

    return (
      <div className="login-page-component">
        <div className="login-form-component">
          <div className="left-component">
            <img src="./login-img.png" alt="" className="login-img"></img>
          </div>
          <div className="reset-pass-component">
            <div>
              <Logo size={120}></Logo>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {!this.state.isFirstLoad && message &&
                      <div className="error-message">{message}</div>
                    }
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
                  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="reset-pass-btn" loading={pending}>
                    Đặt lại mật khẩu
                  </Button>
                </Form.Item>
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
    message: state.user.errMessage,
    pending: state.user.pending,
  };
}

const mapDispatchToProps = (dispatch) => ({
});

const ResetPasswordPage = Form.create({ name: 'Reset-pass' })(ResetPasswordForm)

 export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)