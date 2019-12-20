import React from 'react';
import { connect } from 'react-redux'
import { Button, Form, InputNumber, Icon, Select, DatePicker, Result} from 'antd';
import 'antd/dist/antd.css';
import './ContactForm.scss'
import {userActions} from '../../../actions/user.actions'
import AddressInput from '../../../components/AddressInput/AddressInput'
import moment from 'moment';
import { chatActions } from '../../../actions/chat.actions';

const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;
const { RangePicker } = DatePicker;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ContactForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            total: 0,
            hour: 1,
            skillList: []
        }
    }

    componentDidMount = () =>{
        this.props.form.validateFields();
        const { teacherInfo, skills, getDetail, form } = this.props;
        getDetail();
        let skillList = []
        skills.forEach(skill => {
            if(teacherInfo.skill.indexOf(skill._id) !== -1){
                skillList.push(skill)
            }
        });
        this.setState({skillList : skills, total: teacherInfo.price})
        form.setFieldsValue({hour: 1})

    }

    handleSubmit = (e) =>{
        const {getFieldsValue} = this.props.form;
        const {userInfo, teacherInfo, requestContract, createRoom} = this.props;
        const {total} = this.state;
        e.preventDefault();
        const values = getFieldsValue();
        // console.log(userInfo.user.id, teacherInfo._id,values.fromdate[0].toString(),
        // values.fromdate[1].toString(), values.hour, values.skill, total, values.address)
        requestContract({
            studentID: userInfo.user._id,
            teacherID: teacherInfo._id,
            fromDate: values.fromdate[0].toString(),
            toDate: values.fromdate[1].toString(),
            hour: values.hour, 
            skill: values.skill,
            value: total,
            address: values.address
        });
        createRoom({
            studentID: userInfo.user._id,
            teacherID: teacherInfo._id
        })
        this.setState({isFirstLoad: false})
    }

    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    }
      
    disabledDate = (current)=> {
        return current && current < moment().endOf('day');
    }

    disabledRangeTime = (_, type) => {
        if (type === 'start') {
          return {
            disabledHours: () => this.range(0, 60).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        }
        return {
          disabledHours: () => this.range(0, 60).splice(20, 4),
          disabledMinutes: () => this.range(0, 31),
          disabledSeconds: () => [55, 56],
        };
    }

    onChange = e =>{
        const {getFieldsValue} = this.props.form;
        const { teacherInfo } = this.props;
        // const values = getFieldsValue();
        // const hour = values.hour
        console.log(e);
        if(parseInt(e)) {
            this.setState({
                total : e*teacherInfo.price,
            })
        }
        else {
            this.setState({
                total : teacherInfo.price,
            })
        }
        
    }

    render(){
        const { getFieldDecorator, getFieldsError,
             getFieldError, isFieldTouched } = this.props.form;
        const { errMessage, successMessage, pending } = this.props;
        const { skillList } = this.state;
        const fromDateError = isFieldTouched('fromdate') && getFieldError('fromdate');
        const hourError = isFieldTouched('hour') && getFieldError('hour');
        const skillError = isFieldTouched('skill') && getFieldError('skill');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const { total } = this.state;

        const selectSkill=[];
        skillList.forEach(skill => {
        selectSkill.push(<Option key={ skill._id }>{skill.name}</Option>)
        });
    

        return (
        <>
            {(errMessage !== undefined || successMessage !== undefined )&& !this.state.isFirstLoad ?(
            <>
                {successMessage !== undefined ? (
                    <Result
                        status="success"
                        title={successMessage}
                    />
                ):(
                    <Result
                        status="warning"
                        title={errMessage}
                    />
                )
                }
            </>
            ):(
                <Form onSubmit={this.handleSubmit} className="contract-detail-form">
                <Form.Item>
                    <Icon type="notification" theme="filled" className="mr-3" style={{color: 'red'}}/>
                    Hãy điền đầy đủ thông tin đề giáo viên sắp xếp bạn nhé !!!
                </Form.Item>
                <Form.Item label="Thời gian dạy" validateStatus={fromDateError ? 'error' : ''} help={fromDateError || ''}>
                  {getFieldDecorator('fromdate', {
                    rules: [
                    {
                      required: true,
                       message: 'Vui lòng chọn ngày học!',
                    },
                    ],
                    })(
                      <RangePicker
                            disabledDate={this.disabledDate}
                            disabledTime={this.disabledRangeTime}
                            name="range" id="range"
                            onChange = {this.onChange}
                            showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                            }}
                            format={dateFormat}
                            style={{width: '100%'}}
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
                <Form.Item label="Skill" validateStatus={skillError ? 'error': ''} help={skillError || ''}>
                  {getFieldDecorator('skill', {
                    rules: [
                      {
                        required: true,     
                        message: 'Vui lòng chọn kỹ năng bạn muốn học!',
                      },
                    ],
                  })(<Select 
                      mode="tags"
                      tokenSeparators={[',']}
                      placeholder="Skill">
                      {selectSkill}
                      </Select>,
                        )}
                </Form.Item>
                <Form.Item label="Tổng số giờ" validateStatus={hourError ? 'error' : ''} help={hourError || ''}>
                  {getFieldDecorator('hour', {
                    rules: [
                      {
                        required: true,
                        message: 'Enter number of studying hour',
                      },
                    ],
                      })(<InputNumber
                        prefix={<Icon type="hourglass" 
                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                        style={{width: '100%'}}
                        formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={this.onChange}
                        min={1}
                      />
                  )}
                </Form.Item>
                <Form.Item>
                  <p style={{fontSize: "20px", textAlign: "left"}}>{`Tổng tiền : ${total} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="" disabled={hasErrors(getFieldsError())} loading={pending} >
                    Gửi yêu cầu
                </Button>
                </Form.Item>  
            </Form>
            )
                
            }
        </>
            

        )
    }
}

function mapStateToProps(state) {
    return { 
      errMessage: state.user.errMessage,
      successMessage: state.user.successMessage,
      pending: state.user.pending,
      user: state.user.user
    };
  }
  
  const mapDispatchToProps = (dispatch) => ({
    requestContract: (data) => dispatch(userActions.requestContract(data)),
    createRoom: (data) => dispatch(chatActions.createRoom(data))
  });
  
  const WrapContactForm = (Form.create({ name: 'contact-modal' })(ContactForm))

  export default connect(mapStateToProps, mapDispatchToProps)(WrapContactForm)