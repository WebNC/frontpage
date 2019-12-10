import React from 'react';
import { Form, Input, InputNumber, Button, Icon, Select, DatePicker} from 'antd';
import AddressInput from '../../../components/AddressInput/AddressInput'
import 'antd/dist/antd.css';
import {userActions} from '../../../actions/user.actions';
import{ connect } from 'react-redux';
import moment from 'moment';
// import './style.css';

const {Option} = Select;
const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditInfoTeacherForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
      };
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      const { form, user} = this.props;
      // form.setFieldsValue({username: username});
      form.setFieldsValue({username: user.username, dob: moment(user.birthday) || '', sex: user.sex || 'Nam', address: user.address || '', phone: user.phone || '', salary: user.price || 0 });
      form.validateFields();
    }
   
    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      const {updateTeacherInfo, user} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      updateTeacherInfo({
        id: user._id,
        username: values.username,
        address: values.address,
        phone: values.phone,
        sex: values.sex,
        birthday: values.dob,
        price: values.salary
      });
      
      this.setState({isFirstLoad: false})
    }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {successMessage, errMessage, pending} = this.props;
    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const dobError = isFieldTouched('dob') && getFieldError('dob');
    const sexError = isFieldTouched('sex') && getFieldError('sex');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    const addressError = isFieldTouched('address') && getFieldError('address');
    const salaryError = isFieldTouched('salary') && getFieldError('salary');

    return (
              <Form className="info-form" onSubmit={this.handleSubmit}>
                <Form.Item>
                    {successMessage && !this.state.isFirstLoad &&
                      <div className="success-message">{successMessage}</div>
                    }
                    {errMessage && !this.state.isFirstLoad &&
                      <div className="error-message">{errMessage}</div>
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
                <Form.Item label="Địa chỉ" validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
                {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ!',
                  },
                ],
              })(<AddressInput />
                )}
                </Form.Item>
                <Form.Item label="Số điện thoại" validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
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
                <Form.Item label="Mức lương mong muốn (/giờ)" validateStatus={salaryError ? 'error' : ''} help={salaryError || ''}>
                  {getFieldDecorator('salary', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập mức lương bạn mong muốn!',
                      },
                    ],
                  })(<InputNumber
                    prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    placeholder="Mức lương mong muốn"
                    min={0} step={10000}
                    style={{width: 680}}
                    formatter={value => `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                    )}
                </Form.Item>
                <Form.Item label="Ngày sinh" validateStatus={dobError ? 'error' : ''} help={dobError || ''}>
                  {getFieldDecorator('dob', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập ngày sinh!',
                      },
                    ],
                  })(<DatePicker placeholder='dd/mm/yyyy' format={dateFormat} style={{width:570}}/>
                    )}
                </Form.Item>
                <Form.Item label="Giới tính" validateStatus={sexError ? 'error' : ''} help={sexError || ''}>
                  {getFieldDecorator('sex', {
                    rules: [{ 
                      required: true, 
                      message: 'Vui lòng chọn giới tính!' 
                    }],
                  })(
                    <Select placeholder="Giới tính">
                      <Option value="Nam">Nam</Option>
                      <Option value="Nữ">Nữ</Option>
                      <Option value="Khác">Khác</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="register-teacher-form-button" disabled={hasErrors(getFieldsError())} loading={pending}>
                    Lưu thay đổi
                  </Button>
                </Form.Item>  
              </Form>
    );
  }
}

function mapStateToProps(state) {
  return { 
    successMessage: state.user.successMessage,
    errMessage: state.user.errMessage,
    pending: state.user.pending,
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateTeacherInfo: (user) => dispatch(userActions.updateTeacherInfo(user))
});

const WrappedEditInfoTeacherForm = (Form.create({ name: 'edit-info-teacher' })(EditInfoTeacherForm));

export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditInfoTeacherForm)