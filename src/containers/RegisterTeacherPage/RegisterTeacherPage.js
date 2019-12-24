import React from 'react';
import { Form, Input, Button, Icon, Select, DatePicker, InputNumber} from 'antd';
import AddressInput from '../../components/AddressInput/AddressInput'
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions'
import {skillActions} from '../../actions/skill.actions'
import Logo from '../../components/Logo';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
// const listSkill = ['HTML5', 'CSS3', 'JavaScript', 'C#', 'C++', 'React', 'Video Editing', 'Graphic Design', 'UX Design', 'Mobile UI Design', 'Web Design'];

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
      const { form, getAllSkill } = this.props;
      form.setFieldsValue({sex: "Nam"});
      getAllSkill();
      this.props.form.validateFields();
    }

    handleSubmit = e => {
      const {user} = this.props;
      const {getFieldsValue} = this.props.form;

      
      e.preventDefault();
      const values = getFieldsValue();
      this.props.registerTeacher({
          id: user.id,
          address: values.address,
          phone: values.phone,
          birthday: values.dob.toString(),
          intro: values.intro !== undefined ? values.intro : '',
          major: values.major,
          skill: values.skill,
          sex: values.sex,
          price: values.salary
      });
      this.setState({isFirstLoad: false})
    }
    checkPhoneNumber = (rule, value, callback) => {
      const isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
      if (isVNPhoneMobile.test(value) === false && value.length !== 0) {
        callback('Số điện thoại không hợp lệ');
      } else {
        callback();
      }
    };
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message, pending, allSkill} = this.props;
    // Only show error after a field is touched.
    const dobError = isFieldTouched('dob') && getFieldError('dob');
    const sexError = isFieldTouched('sex') && getFieldError('sex');
    const skillError = isFieldTouched('skill') && getFieldError('skill');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    const majorError = isFieldTouched('major') && getFieldError('major');
    const addressError = isFieldTouched('address') && getFieldError('address');
    const salaryError = isFieldTouched('salary') && getFieldError('salary');

    const selectSkill=[];
    if (allSkill !== undefined) {
      allSkill.forEach(skill => {
        selectSkill.push(<Option key={ skill._id }>{skill.name}</Option>)
        });
    }
    

    return (
      <div className="register-teacher-page-component">
          <Form onSubmit={this.handleSubmit} className="register-teacher-form">
            <Form.Item className="logo-component">
              <Logo size={120}></Logo>
            </Form.Item>
            <Form.Item className="top-register-teacher-form">
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
              })(<AddressInput/>
                )}
            </Form.Item>
            <Form.Item label="Số điện thoại" 
            validateStatus={phoneError ? 'error' : ''}
             help={phoneError || ''}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                  },
                  {
                    validator: this.checkPhoneNumber,
                  },
                ],
              })(<Input
                prefix={<Icon type="phone"
                 style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Số điện thoại"
                />
                )}
            </Form.Item>
            <Form.Item label="Mức lương mong muốn (đ/giờ)" validateStatus={salaryError ? 'error' : ''} help={salaryError || ''}>
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
                    style={{width: "100%"}}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                    )}
                </Form.Item>
            
            <Form.Item label="Ngày sinh"
             validateStatus={dobError ? 'error' : ''}
             
             help={dobError || ''}>
              {getFieldDecorator('dob', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập ngày sinh!',
                  },
                ],
              })(<DatePicker placeholder='dd/mm/yyyy'
               format={dateFormat} style={{width:570}}/>
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
              <Button type="primary" htmlType="submit" className="register-teacher-form-button" disabled={hasErrors(getFieldsError())} loading={pending}>
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
    message: state.user.errMessage,
    pending: state.user.pending,
    user: state.user.user,
    allSkill: state.skill.allSkill
  };
}

const mapDispatchToProps = (dispatch) => ({
  registerTeacher: (user) => dispatch(userActions.registerTeacher(user)),
  getAllSkill:() => dispatch(skillActions.getAll())
});

const RegisterTeacherPage = (Form.create({ name: 'registerteacher' })(RegistrationTeacherForm));

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTeacherPage)