import React from 'react';
import { Form, Input, Button, Icon, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'
import moment from 'moment';
const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegistrationTeacherForm extends React.Component {
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
      // this.props.register({
      //     email: values.email,
      //     password: values.password,
      //     username: values.username
      // });
      // this.setState({isFirstLoad: false})
    }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message, pending} = this.props;
    // Only show error after a field is touched.
    const dobError = isFieldTouched('dob') && getFieldError('dob');
    const sexError = isFieldTouched('sex') && getFieldError('sex');
    const skillError = isFieldTouched('skill') && getFieldError('skill');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    const majorError = isFieldTouched('major') && getFieldError('major');

    return (
      <div className="registerform-component">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              <h1>WEB NAME</h1>
              <h2>Đăng Ký Trở Thành Người Dạy</h2>
                {message && !this.state.isFirstLoad &&
                  <div className="error-message">{message}</div>
                }
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
            <Form.Item validateStatus={dobError ? 'error' : ''} help={dobError || ''}>
              {getFieldDecorator('dob', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập ngày sinh!',
                  },
                ],
              })(<DatePicker placeholder='Ngày sinh' format={dateFormat} style={{width:370}}/>
                )}
            </Form.Item>
            <Form.Item validateStatus={majorError ? 'error' : ''} help={majorError || ''}>
              {getFieldDecorator('major', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập chuyên môn của bạn!',
                  },
                ],
              })(<Input placeholder="Chuyên môn"/>,
                )}
            </Form.Item>
            <Form.Item validateStatus={skillError ? 'error': ''} help={skillError || ''}>
              {getFieldDecorator('skill', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập những kỹ năng của bạn!',
                    },
                  ],
                })(<Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} placeholder="Kỹ năng">
                   </Select>,
              )}
            </Form.Item>
            <Form.Item validateStatus={sexError ? 'error' : ''} help={sexError || ''}>
              {getFieldDecorator('sex', {
                rules: [{ 
                  required: true, 
                  message: 'Vui lòng chọn giới tính!' 
                }],
              })(
                <Select placeholder="Giới tính" defaultValue="Nam">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button" disabled={hasErrors(getFieldsError())} loading = {pending ? pending : false}>
                Đăng ký
              </Button>
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

const RegisterTeacherPage = (Form.create({ name: 'registerteacher' })(RegistrationTeacherForm));

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTeacherPage)