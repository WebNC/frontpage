import React from 'react';
import { Button, Form, InputNumber, Icon, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import { skillActions } from '../../../actions/skill.actions'
import { contractActions } from '../../../actions/contract.actions'
import AddressInput from '../../../components/AddressInput/AddressInput'
import moment from 'moment';
import {connect} from 'react-redux'


const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;
const { RangePicker } = DatePicker;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class ContractDetailForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            total: 0,
            hour: 0
        }
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      const {form, contractInfo } = this.props;
      console.log(contractInfo.contract);

      form.validateFields();
      
      const selectedSkill = [];
      contractInfo.contract.skill.forEach((element)=>{
        selectedSkill.push(element.id)
      })
      form.setFieldsValue({
        skill: selectedSkill, 
        fromdate: [moment(contractInfo.contract.fromDate),moment(contractInfo.contract.toDate)],
        address: contractInfo.contract.address, 
        hour: contractInfo.contract.hour,
        });

      this.setState({total: contractInfo.contract.value});
    }

    handleSubmit = (e) =>{
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
      const { teacher } = this.props.contractInfo;
      const {getFieldsValue} = this.props.form;
      const values = getFieldsValue();
      const hour = values.hour
      
      if(hour){
        this.setState({
          total : teacher.price ? teacher.price*e : e*50000
        })
      }
    }


    render(){
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const {allSkill, contractInfo, handleShowDetailContract} = this.props;

        const fromDateError = isFieldTouched('fromdate') && getFieldError('fromdate');
        const hourError = isFieldTouched('hour') && getFieldError('hour');
        const skillError = isFieldTouched('skill') && getFieldError('skill');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const {total} = this.state;

        const selectSkill=[];
        allSkill.forEach(skill => {
        selectSkill.push(<Option key={ skill._id }>{skill.name}</Option>)
        });

        return(
          <Form onSubmit={this.handleSubmit} className="contract-detail-form">
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
                  />
              )}
            </Form.Item>
            <Form.Item>
              {`Tổng tiền : ${total} đ`}
            </Form.Item>
            <Form.Item>
              {contractInfo.contract.status === 'Đang chờ' ? (
                <div style={{display: "flex", justifyContent: "space-between", paddingLeft: "10%", paddingRight: "10%"}}>
                  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Cập nhật hợp đồng
                  </Button>
                  <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Xóa hợp đồng
                  </Button>
                </div>
              ) : ( 
                  <p></p>
                )
              }
              
            </Form.Item>
          </Form>
        )
    }
}

function mapStateToProps(state) {
  return {
    allSkill: state.skill.allSkill,
    contractInfo: state.contracts.contractInfo
  };
}
const mapDispatchToProps = dispatch => ({
  getAllSkill:() => dispatch(skillActions.getAll()),
  getContractDetail: (id) => dispatch(contractActions.getContractDetail(id)),
});

const WrappedContractDetailForm = (Form.create({ name: 'contract-detail-form' })(ContractDetailForm));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedContractDetailForm)