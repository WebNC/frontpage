import React from 'react';
import { Form, Input, Button, Icon, Select, Typography, Tabs, Upload} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import moment from 'moment';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {history} from '../../helper';
import NavBar from '../../components/NavBar/NavBar';
import MyAvatar from '../../components/MyAvatar/MyAvatar';

const { TabPane } = Tabs;
const { Paragraph } = Typography;
const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TeacherHomePage extends React.Component {

    componentDidMount() {
      const { getDetail } = this.props;
      getDetail();
    }

    // handleSubmit = e => {
    //   const {getFieldsValue} = this.props.form;
    //   e.preventDefault();
      
    //   const values = getFieldsValue();
      
    //   this.props.getDetail();
      
    //   this.setState({isFirstLoad: false})
    // }

  render() {
    var {user} = this.props;
    console.log(user.skill);
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
            <Button icon="edit" type="normal" className="btn" onClick = {() => history.push('/teacher-edit-info')}>Cập nhật thông tin cá nhân</Button>
            <Button icon="plus" type="normal" className="btn">Thêm khóa học mới</Button>
          </div>
        </div>
        <div class="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
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
            </TabPane>
            <TabPane tab="Yêu cầu từ người học" key="2">
              <div className="requirement-component">
                Danh sách người học gửi yêu cầu
              </div>
            </TabPane>
            <TabPane tab="Lịch sử" key="3">
              <div className="history-component">
                Lịch sử yêu cầu từ người học
              </div>
            </TabPane>
            <TabPane tab="Doanh thu" key="4">
              <div className="history-component">
                Doanh thu
              </div>
            </TabPane>
          </Tabs> 
        </div>
        <Footer />
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return { 
    message: state.user.message,
    pending: state.user.pending,
    user: state.user.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getDetail()),
  logout: () => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHomePage)