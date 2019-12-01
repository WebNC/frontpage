import React from 'react';
import { Form, Input, Button, Icon, Select, DatePicker, Avatar} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import moment from 'moment';
import Header from '../../components/Header/Header';

const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UserInfoForm extends React.Component {
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
      form.setFieldsValue({username: user.username, age: user.age || '', sex: user.sex || 'Nam', degree: user.degree || 'Đại học', phone: user.phone || ''});
      form.validateFields();
    }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      this.props.getDetail();
      
      this.setState({isFirstLoad: false})
    }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message, pending, user} = this.props;
    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const ageError = isFieldTouched('age') && getFieldError('age');
    const sexError = isFieldTouched('sex') && getFieldError('sex');
    const degreeError = isFieldTouched('degree') && getFieldError('degree');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');

    return (
      <div className="info-user-page">
        <Header username={user.username}/>
        <h1>Cập nhật thông tin cá nhân</h1>
        <div className="info-component">
            <div className="avatar-component">
              <Avatar size={250} className='avatar'>
              </Avatar>
              <Button className="avatar-button" type="primary">Cập nhật ảnh đại diện</Button>
            </div>
            <Form onSubmit={this.handleSubmit} className="info-form">
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
              <Form.Item validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
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
              <Form.Item validateStatus={sexError ? 'error' : ''} help={sexError || ''} color="black">
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
              <Form.Item validateStatus={degreeError ? 'error' : ''} help={degreeError || ''} >
                {getFieldDecorator('degree', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng chọn trình độ!',
                    },
                  ],
                })(<Select placeholder="Trình độ" defaultValue="dh">
                    <Option value="th">Tiểu học</Option>
                    <Option value="thcs">THCS</Option>
                    <Option value="thpt">THPT</Option>
                    <Option value="cd">Cao đẳng</Option>
                    <Option value="dh">Đại học</Option>
                    <Option value="khac">Khác</Option>
                  </Select>,
                  )}
              </Form.Item>
              <Form.Item>
                <div className="info-buttons-component">
                  <Button type="primary">
                    Lưu thay đổi
                  </Button>
                  <Button type="primary">
                    Hủy thay đổi
                  </Button>
                </div>
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
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getdetail())
});

const UserInfoPage = (Form.create({ name: 'getdetail' })(UserInfoForm));

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPage)