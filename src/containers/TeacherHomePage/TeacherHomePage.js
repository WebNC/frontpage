import React from 'react';
import { Form, Input, Button, Icon, Select, Typography, Avatar, Tabs} from 'antd';
import Course from '../../components/Course/Course';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import moment from 'moment';
import Header from '../../components/Header/Header';

const { TabPane } = Tabs;
const { Paragraph } = Typography;
const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TeacherHomePage extends React.Component {

    componentDidMount() {
    }

    // handleSubmit = e => {
    //   const {getFieldsValue} = this.props.form;
    //   e.preventDefault();
      
    //   const values = getFieldsValue();
      
    //   this.props.getDetail();
      
    //   this.setState({isFirstLoad: false})
    // }

  render() {
    const {username, logout} = this.props;

    return (
      <div className="teacher-home-page">
        <Header username={username}/>
        <div class="cover-component">
            <Avatar size={130}/>
            <div class="info-component">
              <h3>{username}</h3>
              <h4>Developer</h4>
            </div>
            <div className="btns-component">
              <Button icon="edit" className="btn">Cập nhật thông tin cá nhân</Button>
              <Button icon="plus" className="btn">Thêm khóa học mới</Button>
              <Button onClick={() => logout()}>Đăng xuất</Button>
            </div>
        </div>
        <div class="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              <div className="intro-component">
                <h3>Giới thiệu</h3>
                <Paragraph class="intro">
                  UI/UX designer & Front end developer
                    Experience:
                    • 5+ years of professional experience in Web/UI/Visual design

                    Areas of expertise:

                    • UI/UX design
                    • Responsive/Adaptive Web and App design
                    • High-fidelity prototyping
                    • UI/UX auditing (creating an in-depth report of the current UI/UX state and performance of your product)
                    • Front-end web development

                    Tools & Technologies:

                    • Adobe XD, Adobe Photoshop
                    • Sketch
                    • InvisionApp
                    • HTML/CSS
                    • JavaScript/jQuery/Vue.js/Angular/React
                  </Paragraph>
              </div>
              <div class="skill-component">
                <h3>Kỹ năng</h3>
                <h5>
                  <Icon type="check" className="icon"/>
                  Web design
                </h5>
                <h5>
                  <Icon type="check" className="icon"/>
                  HTML5
                </h5>
                <h5>
                  <Icon type="check" className="icon"/>
                  CSS
                </h5>
                <h5>
                  <Icon type="check" className="icon"/>
                  JavaScript
                </h5>
                <h5>
                  <Icon type="check" className="icon"/>
                  Prototyping
                </h5>
              </div>
            </TabPane>
            <TabPane tab="Các khóa học" key="2">
              <div class="courses-component">
                <h3>Khóa học hiện có</h3>
                <Course/>
                <Course/>
              </div>
            </TabPane>
            <TabPane tab="Yêu cầu từ người học" key="3">
              <div className="requirement-component">
                Danh sách người học gửi yêu cầu
              </div>
            </TabPane>
            <TabPane tab="Lịch sử" key="4">
              <div className="history-component">
                Lịch sử yêu cầu từ người học
              </div>
            </TabPane>
            <TabPane tab="Doanh thu" key="5">
              <div className="history-component">
                Doanh thu
              </div>
            </TabPane>
          </Tabs>
          
          
        </div>
        
        {/* <div className="info-component">
            <div className="avatar-component">
              
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
        </div>  */}
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return { 
    message: state.user.message,
    pending: state.user.pending,
    username: state.user.username,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getdetail()),
  logout: () => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHomePage)