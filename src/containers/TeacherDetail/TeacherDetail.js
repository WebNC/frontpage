import React from 'react';
import { Icon,  Typography, Avatar, Tabs} from 'antd';
import Course from '../../components/Course/Course';
import 'antd/dist/antd.css';
import '../TeacherHomePage/style.css';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar'
import {getDetailTeacher} from '../../actions/teacher.actions'
import{ connect } from 'react-redux';
import {skillActions} from '../../actions/skill.action'


const { TabPane } = Tabs;
const { Paragraph } = Typography;


class TeacherDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teacherInfor: {},
      skills: []
    }
  }

    UNSAFE_componentWillMount() {
      const {id} = this.props.match.params
      console.log(this.props)
      const {allSkill} = this.props;
      let {skills} = this.state;

      getDetailTeacher(id).then(res=>{
        this.setState({teacherInfor : res.message})
        allSkill.forEach(item => {
          if(res.message.skill.indexOf(item._id) !== -1 && !item.isDeleted)
            skills.push(item.name)
      });
      this.setState({skills})
      })
    }


  render() {
    const {skills, teacherInfor} = this.state
    var userSkill =[];

    skills.forEach(element => {
      userSkill.push(
      <h5 key={element}>
        <Icon type="check" className="icon"/>
        {element}
      </h5>)
    });

   
    return (
      <div className="teacher-home-page">
        <Header />
        <NavBar/>
        <div className="cover-component">
            <Avatar size={130}/>
            <div className="info-component">
              <h3>{teacherInfor.username}</h3>
              <h4>{teacherInfor.major}</h4>
            </div>
            {/* <div className="btns-component">
              <Button icon="edit" className="btn" onClick = {() => history.push('/teacher-edit-info')}>Cập nhật thông tin cá nhân</Button>
              <Button icon="plus" className="btn">Thêm khóa học mới</Button>
            </div> */}
        </div>
        <div className="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              <div className="basic-info-component">
                <h3>Thông tin cơ bản</h3>
                <span>Địa chỉ: 
                  <h5>
                    {teacherInfor.address === undefined ? '' : `${teacherInfor.address.address}, ${teacherInfor.address.district}, Hồ Chí Minh` }
                  </h5>
                </span>
                <span>Số điện thoại:
                  <h5>{teacherInfor.phone}</h5>
                </span>
                <span>Ngày Sinh:
                  <h5>{teacherInfor.birthday}</h5>
                </span>
                <span>Giới tính:
                  <h5>{teacherInfor.sex}</h5>
                </span>
              </div>
              <div className="intro-component">
                <h3>Giới thiệu</h3>
                <Paragraph className="intro">
                  {teacherInfor.intro === "" ? "Chưa có bài tự giới thiệu." : teacherInfor.intro}
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
    allSkill: state.skill.allSkill
  };
}
const mapDispatchToProps = (dispatch) => ({
  getAllSkill:() => dispatch(skillActions.getAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetail)


