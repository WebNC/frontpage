import React from 'react';
import { Form, Input, Button, Icon, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'
import moment from 'moment';
import Logo from '../../components/Logo';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const listSkill = ['HTML5', 'CSS3', 'JavaScript', 'C#', 'C++', 'React', 'Video Editing', 'Graphic Design', 'UX Design', 'Mobile UI Design', 'Web Design'];
const selectSkill=[];

listSkill.forEach(skill => {
selectSkill.push(<Option key={ skill }>{skill}</Option>)
});

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
      const { form } = this.props;
      // form.setFieldsValue({username: username});
      form.setFieldsValue({sex: "Nam"});

      this.props.form.validateFields();
    }

    handleSubmit = e => {
      const {userId} = this.props;
      const {getFieldsValue} = this.props.form;
      e.preventDefault();
      const values = getFieldsValue();
      console.log(values);
      this.props.registerTeacher({
          id: userId,
          address: values.address,
          phone: values.phone,
          birthday: values.dob.toString(),
          intro: values.intro !== undefined ? values.intro : '',
          major: values.major,
          skill: values.skill,
          sex: values.sex,
      });
      this.setState({isFirstLoad: false})
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
    const addressError = isFieldTouched('address') && getFieldError('address');

    return (
      <div className="register-teacher-page-component">
          <Form onSubmit={this.handleSubmit} className="register-teacher-form">
            <Form.Item className="top-register-teacher-form">
              <Logo></Logo>
              <h2>Đăng Ký Trở Thành Người Dạy</h2>
                {message && !this.state.isFirstLoad &&
                  <div className="error-message">{message}</div>
                }
            </Form.Item>
            <Form.Item label="Địa chỉ" validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ!',
                  },
                ],
              })(<Input
                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Địa chỉ"
                />
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
            <Form.Item label="Giới thiệu">
              {getFieldDecorator('intro')(<Input.TextArea style={{height: 150}} autoSize={{ minRows: 5 }} placeholder="Giới thiệu bản thân"/>,
                )}
            </Form.Item>
            <Form.Item label="Chuyên môn" validateStatus={majorError ? 'error' : ''} help={majorError || ''}>
              {getFieldDecorator('major', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập chuyên môn của bạn!',
                  },
                ],
              })(<Input placeholder="Web developer"/>,
                )}
            </Form.Item>
            <Form.Item label="Kỹ năng" validateStatus={skillError ? 'error': ''} help={skillError || ''}>
              {getFieldDecorator('skill', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập những kỹ năng của bạn!',
                    },
                  ],
                })(<Select 
                    mode="tags" 
                    style={{ width: '100%' }} 
                    tokenSeparators={[',']}
                    defaultValue={['CSS', 'HTML', 'JS']} 
                    placeholder="Kỹ năng">
                      {selectSkill}
                  </Select>,
              )}
            </Form.Item>
            <Form.Item label="Giới tính" validateStatus={sexError ? 'error' : ''} help={sexError || ''}>
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
              <Button type="primary" htmlType="submit" className="register-teacher-form-button" disabled={hasErrors(getFieldsError())}>
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
    userId: state.user.userId
  };
}

const mapDispatchToProps = (dispatch) => ({
  registerTeacher: (user) => dispatch(userActions.registerTeacher(user))
});

const RegisterTeacherPage = (Form.create({ name: 'registerteacher' })(RegistrationTeacherForm));

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTeacherPage)