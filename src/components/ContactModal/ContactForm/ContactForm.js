import React from 'react';
import { Button, Form, InputNumber, Icon, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import './ContactForm.scss'
import {userActions} from '../../../actions/user.actions'
import AddressInput from '../../../components/AddressInput/AddressInput'
import moment from 'moment';


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
            hour: 0,
            skillList: []
        }
    }

    componentDidMount = () =>{
        this.props.form.validateFields();
        const {teacherInfo, skills, getDetail} = this.props;
        getDetail();
        let skillList = []
        skills.forEach(skill => {
            if(teacherInfo.skill.indexOf(skill._id) !== -1){
                skillList.push(skill)
            }
        });
        this.setState({skillList : skills})
    }

    handleSubmit = (e) =>{
        const {getFieldsValue} = this.props.form;
        const {userInfo, teacherInfo, handleCloseModal} = this.props;
        const {total} = this.state;
        console.log(userInfo)
        e.preventDefault();
        const values = getFieldsValue();
          handleCloseModal()

        userActions.requestContract(userInfo.user._id, teacherInfo._id,values.fromdate[0].toString(),
        values.fromdate[1].toString(), values.hour, values.skill, total, values.address).then(res=>{
            console.log(res)
        })
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
        const {teacherInfo} = this.props;

        const values = getFieldsValue();
        const hour = values.hour
        if(hour){
            this.setState({
                total : teacherInfo.price? teacherInfo.price*e : e*50000
            })
        }
        
    }


    render(){
        const {getFieldDecorator, getFieldsError,
             getFieldError, isFieldTouched } = this.props.form;
        const {userInfo} = this.props;

        const { skillList} = this.state;

        const fromDateError = isFieldTouched('fromdate') && getFieldError('fromdate');
        // const toDateError = isFieldTouched('todate') && getFieldError('todate');

        const hourError = isFieldTouched('hour') && getFieldError('hour');
        const skillError = isFieldTouched('skill') && getFieldError('skill');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const {total} = this.state;

        const selectSkill=[];
        skillList.forEach(skill => {
        selectSkill.push(<Option key={ skill._id }>{skill.name}</Option>)
        });
    

        return(
            
            <Form className="contact-form mt-5" onSubmit={this.handleSubmit}>

                <div className="d-flex">
                    <Form.Item  className="mr-3" label="Ngày bắt đầu" validateStatus={fromDateError ? 'error' : ''} help={fromDateError || ''}>
                        {getFieldDecorator('fromdate', {
                        rules: [
                            {
                            required: true,
                            message: 'Hãy chọn ngày  !',
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
                                />
                        )}
                     </Form.Item>
                </div>
               

                <Form.Item label="Địa chỉ" validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
                {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ!',
                  },
                ],
              })(<AddressInput value={userInfo.address} />
                )}
                </Form.Item>
           

                <Form.Item label="Kỹ năng" validateStatus={skillError ? 'error': ''} help={skillError || ''}>
                    {getFieldDecorator('skill', {
                        rules: [
                            {
                            required: true,     
                            message: 'Select skill',
                            },
                        ],
                        })(<Select 
                            mode="tags" 
                            style={{ width: '70%' }} 
                            tokenSeparators={[',']}
                            placeholder="Skill">
                            {selectSkill}
                        </Select>,
                    )}
                </Form.Item>

                <div className="d-flex">
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
                            style={{width: 150}}
                            formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                             onChange={this.onChange}
                            />
                            )}
                    </Form.Item>
                    <div className="total">
                        {`Tổng tiền : ${total} VND`}
                    </div>
             </div>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="" disabled={hasErrors(getFieldsError())}>
                    Hoàn tất
                  </Button>
                </Form.Item>  

            </Form>


        )
    }
}

const WrapContactForm = (Form.create({ name: 'contact-modal' })(ContactForm));

export default WrapContactForm;