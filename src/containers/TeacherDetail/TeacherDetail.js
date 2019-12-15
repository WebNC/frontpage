import React from 'react';
import { Icon,  Typography, Avatar, Tabs, Button} from 'antd';
import Course from '../../components/Course/Course';
import 'antd/dist/antd.css';
import '../TeacherHomePage/style.css';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar'
import ContactModal from '../../components/ContactModal/ContactModal'
import {getDetailTeacher} from '../../actions/teacher.actions'
import StarRating from '../../components/Rating/Rating'
import{ connect } from 'react-redux';

import moment from 'moment';
  


const { TabPane } = Tabs;
const { Paragraph } = Typography;


class TeacherDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teacherInfo: {},
      skills: [],
      openModal: false,
      history: []
    }
  }

  UNSAFE_componentWillMount() {
    const {id} = this.props.match.params

    getDetailTeacher(id).then(res=>{
      // console.log(res.message)
      // console.log(allSkill)

      // allSkill.forEach(item => {
      //   if( item._id && res.message.skill.indexOf(item._id) !== -1 && !item.isDeleted)
      //     skills.push(item)
      // });
      this.setState({
        teacherInfo : res.message,
        skills : res.message.skill,
        history: res.message.history
      })
    })
  }

    
  handleCloseModal = () =>{
    const {openModal} = this.state;
    this.setState({
        openModal : !openModal,
    })
  }

  handleClickContact = () =>{
    const {openModal} = this.state;
    this.setState({
      openModal: !openModal
    })
  }
    


  render() {
    const {skills, teacherInfo, openModal, history} = this.state
    var userSkill =[];

    skills.forEach(element => {
      userSkill.push(
      <h5 key={element._id}>
        <Icon type="check" className="icon"/>
        {element.name}
      </h5>)
    });

    return (
      <div className="teacher-home-page">
        <Header />
        <NavBar/>
        <ContactModal open={openModal}
                handleCloseModal= {this.handleCloseModal}/>
        <div class="cover-component">
            <div className="info-component">
              <Avatar size={130}/>
              <div class="name-component">
                <h3>{teacherInfo.username}</h3>
                <h4>{teacherInfo.major}</h4>
                <div className="mt-4">
                    <Button type="primary" onClick={this.handleClickContact}>
                  <Icon type="contacts" theme="filled" size="large" />
                    Liên hệ ngay</Button>
                </div>
               
              </div>
            </div>
            <div className="d-flex" >
                <div className="rating mr-5">
                  <h4  style={{color: 'white'}}>Đánh giá</h4>
                  <StarRating rating={teacherInfo.rating}/>
                </div>
                <div className="success">
                  <h4  style={{color: 'white'}}>Thành công</h4>
                  <div className="ratio ml-2 mt-1 d-flex " > 
                          <Icon type="trophy" theme="filled" style={{color: 'green'}} className="mr-2" />
                          <div className=""> {`${teacherInfo.successRatio || 100}%`} </div>
                      </div>

                </div>
            </div>
           


          </div>

        <div className="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              <div className="basic-info-component">
                <h3>Thông tin cơ bản</h3>
                 
                <span>Địa chỉ: 
                  <h5>
                    {teacherInfo.address === undefined ? '' : `${teacherInfo.address.address}, ${teacherInfo.address.district}, Hồ Chí Minh` }
                  </h5>
                </span>
                <span>Số điện thoại:
                  <h5>{teacherInfo.phone}</h5>
                </span>
                <span>Ngày Sinh:
                  <h5>{!teacherInfo.birthday ? '' : moment(teacherInfo.birthday).format('DD/MM/YYYY') }</h5>
                </span>
                <span>Giới tính:
                  <h5>{teacherInfo.sex}</h5>
                </span>
              </div>
              <div className="intro-component">
                <h3>Giới thiệu</h3>
                <Paragraph className="intro">
                  {teacherInfo.intro === "" ? "Chưa có bài tự giới thiệu." : teacherInfo.intro}
                </Paragraph>
              </div>
              <div className="skill-component">
                <h3>Kỹ năng</h3>
                {userSkill}
              </div>
            </TabPane>
            <TabPane tab="Lịch sử dạy học" key="2">
              <div class="courses-component">
                <h3>Lịch sử các khóa dạy học</h3>
                {
                  history.map((item, index) => 
                    <Course key={index} data={history[0]}/>
                  )
                }
                
              </div>
            </TabPane>
           
          </Tabs> 
        </div>
      </div>
      
    );
  }
}



function mapStateToProps(state) {
  return { 
    allSkill: state.skill.allSkill,
    teacherInfo : state.teachers.teacherInfo
  };
}


export default connect(mapStateToProps, null)(TeacherDetail)


