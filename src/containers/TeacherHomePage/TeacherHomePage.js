import React from 'react'
import { Form, Input, Button, Icon, Select, Typography, Tabs, Upload, Spin} from 'antd'
import 'antd/dist/antd.css'
import './style.css'
import{ connect } from 'react-redux'
import {userActions} from '../../actions/user.actions'
import {chatActions} from '../../actions/chat.actions'
import moment from 'moment'
import Header from '../../components/Header/Header'
import MyFooter from '../../components/Footer/Footer'
import {history} from '../../helper'
import MyAvatar from '../../components/MyAvatar/MyAvatar'
import NotificationContract from '../../components/NotificationContract/NotificationContract'
import WrappedChangePassForm from '../../components/ChangePassForm/ChangePassForm'
import IncomeChart from '../IncomeChart/IncomeChart.container' 
import Message from '../../containers/Message/Message'

const { TabPane } = Tabs;
const { Paragraph } = Typography;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class TeacherHomePage extends React.Component {

    componentDidMount() {
      const { getDetail, getPartnerList, user } = this.props;
      getDetail();
      console.log(user);
      getPartnerList({
        type: 'Người dạy',
        ID: user._id !== undefined ? user._id : user.id
      });
    }

  render() {
    var {user, errMessage, successMessage, changePass, pending} = this.props;
    // console.log(user.skill);
    var userSkill =[];

    if(user.skill !== null && user.skill !== undefined) {
      user.skill.forEach(element => {
        userSkill.push(
        <h5>
          <Icon type="check" className="icon"/>
          {element.name}
        </h5>)
      });
    }

    const listContract = [];
    if(user.history !== null && user.history !== undefined ) {
      user.history.forEach(element => {
        listContract.push(<NotificationContract isTeacher={true} contractInfo={element}/>)
      });
    }

    return (
      <div className="teacher-home-page">
        <Header username={user.username}/>
        <div class="cover-component">
          <div className="info-component">
            <MyAvatar imageUrl={user.url}/>
            <div class="name-component">
              <h3 className="username">{user.username}</h3>
              <h4>{user.major}</h4>
            </div>
          </div>
          <div className="btns-component">
            <Button icon="edit" type="normal" className="btn" onClick = {() => history.push('/teacher-edit-info')}>
              Cập nhật thông tin cá nhân
            </Button>
          </div>
        </div>
        <div class="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              {user.address !== undefined ? (
                <>
                  <div className="basic-info-component">
                    <h3>Thông tin cơ bản</h3>
                    <div className="item-info">
                      <h5 className="info-title">Địa chỉ:</h5>
                      <h5>
                        {user.address === undefined ? '' : `${user.address.address}, ${user.address.district}, Hồ Chí Minh` } 
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Số điện thoại:</h5> 
                      <h5>
                        {user.phone}
                      </h5> 
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Ngày Sinh:</h5> 
                      <h5>
                        {user.birthday === undefined ? '' : moment(user.birthday).format('DD/MM/YYYY') }
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Giới tính: </h5>
                      <h5>
                        {user.sex}
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Mức lương:</h5> 
                      <h5 >
                        {user.price === undefined ? `0 đ` : `${user.price} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </h5>
                    </div>
                  </div>
                  <div className="intro-component">
                    <h3>Giới thiệu</h3>
                    <Paragraph class="intro">
                      {user.intro === "" ? "Chưa có bài tự giới thiệu." : user.intro}
                    </Paragraph>
                  </div>
                  <div class="skill-component">
                    <h3>Kỹ năng</h3>
                    {userSkill}
                  </div>
                </>
              ): (
                <div style={{textAlign: "center"}}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </TabPane>
            <TabPane tab="Yêu cầu từ người học" key="2">
              <div className="requirement-component">
                <h3>Danh sách người học gửi yêu cầu </h3>
                {listContract}
              </div>
            </TabPane>
            <TabPane tab="Doanh thu" key="3">
              <div className="history-component">
                <h3>Doanh thu</h3>
              </div>
              <IncomeChart></IncomeChart>
            </TabPane>
            <TabPane tab="Tin nhắn" key="4">
              <h3 style={{fontSize: "28px", marginBottom: "20px", lineHeight: "35px"}}>
                Tin nhắn
              </h3>
              <Message />
            </TabPane>
            <TabPane tab="Đổi mật khẩu" key="5">
              <div className="contract-history-component">
                <h3>Đổi mật khẩu</h3>
                <WrappedChangePassForm 
                  userId={user._id} 
                  changePass={changePass} 
                  errMessage={errMessage} 
                  successMessage={successMessage}
                  pending={pending}
                />
              </div>
            </TabPane>
          </Tabs> 
        </div>
        <MyFooter />
      </div>
      
    );
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
  getDetail: () => dispatch(userActions.getDetail()),
  logout: () => dispatch(userActions.logout()),
  changePass: (data) => dispatch(userActions.changePass(data)),
  getPartnerList: (data) => dispatch(chatActions.getPartnerList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHomePage)