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


const { TabPane } = Tabs;
const { Paragraph } = Typography;


class TeacherDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teacherInfo: {},
      skills: [],
      openModal: false,
    }
  }

  UNSAFE_componentWillMount() {
    const {id} = this.props.match.params
    const {allSkill} = this.props;
    let {skills} = this.state;

    getDetailTeacher(id).then(res=>{
      console.log(res.message)
      allSkill.forEach(item => {
        if( item._id && res.message.skill.indexOf(item._id) !== -1 && !item.isDeleted)
          skills.push(item)
      });
      this.setState({
        teacherInfo : res.message,
        skills
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
    const {skills, teacherInfo, openModal} = this.state
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
              </div>
            </div>
            <div className="btns-component">
                <Button type="primary" onClick={this.handleClickContact}>
                <Icon type="contacts" theme="filled" size="large" />
                  Contact Now</Button>
            </div>
          </div>

        <div className="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              <div className="basic-info-component">
                <h3>Thông tin cơ bản</h3>
                  <span className="mt-3">Rating: 
                    <div className="d-flex rating-ratio mb-3 mt-2 ">
                      <StarRating rating={teacherInfo.rating}/>
                      <div className=" mr-5 ml-5"></div>
                      <div className="ratio ml-5 mt-1 d-flex " > 
                          <Icon type="trophy" theme="filled" style={{color: 'green'}} className="mr-2" />
                          <div className=""> {`Success Ratio : ${teacherInfo.successRatio || 100}%`} </div>
                      </div>
                    </div>
                  </span>

                
                <span>Địa chỉ: 
                  <h5>
                    {teacherInfo.address === undefined ? '' : `${teacherInfo.address.address}, ${teacherInfo.address.district}, Hồ Chí Minh` }
                  </h5>
                </span>
                <span>Số điện thoại:
                  <h5>{teacherInfo.phone}</h5>
                </span>
                <span>Ngày Sinh:
                  <h5>{teacherInfo.birthday}</h5>
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
            <TabPane tab="Các khóa học" key="2">
              <div class="courses-component">
                <h3>Khóa học hiện có</h3>
                <Course/>
                <Course/>
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


