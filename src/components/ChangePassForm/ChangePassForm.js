import React from 'react';
import { Form, Input, Button, Icon} from 'antd';
import 'antd/dist/antd.css';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ChangePassForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
      };
    }

    handleSubmit = e => {
      const { changePass, userId } = this.props;
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      changePass({
          id: userId,
          password: values.password,
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
    const {errMessage, successMessage, pending} = this.props;
    // console.log(errMessage);
    // console.log(successMessage);
    // Only show error after a field is touched
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');

    return (
          <Form onSubmit={this.handleSubmit} style={{maxWidth: "450px"}}>
            {successMessage && !this.state.isFirstLoad &&
              <Form.Item>
                <div className="success-message">{successMessage}</div>
              </Form.Item>
            }
            {errMessage && !this.state.isFirstLoad &&
              <Form.Item>
                <div className="error-message">{errMessage}</div>
              </Form.Item>
            }
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
              <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} loading={pending}>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
    );
  }
}

const WrappedChangePassFrom = (Form.create({ name: 'change-pass' })(ChangePassForm));

export default (WrappedChangePassFrom)