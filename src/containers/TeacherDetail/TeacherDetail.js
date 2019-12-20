import React from 'react';
import { Icon,  Typography, Avatar, Tabs, Button, Pagination, Spin} from 'antd';
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
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class TeacherDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teacherInfo: {},
      skills: [],
      openModal: false,
      history: [],
      data: [],
      amount: 0,
      pageSize: 10,
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params
    const {pageSize} = this.state
    getDetailTeacher(id).then(res=>{
      console.log(res.message)
      const his = res.message.history.slice(0,pageSize);
      this.setState({
        teacherInfo : res.message,
        skills : res.message.skill,
        data: res.message.history,
        history: his,
        amount: res.message.history.length,
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
    
  getStar = () =>{
    
    const {teacherInfo} = this.state;
    console.log(teacherInfo.rating)
    return teacherInfo.rating;
  }
  handleChange = (value) => {
    const {data, pageSize} = this.state;
    const start = (value-1)*pageSize;
    const end = start + pageSize;
    const his = data.slice(start,end);
    this.setState({history: his});
  }
  render() {
    const {skills, teacherInfo, openModal, history, amount, pageSize} = this.state
    var userSkill =[];
    let index = 0
    skills.forEach(element => {
      index += 1;
      userSkill.push(
      <h5 key={element._id + String(index)}>
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
              <Avatar src = {teacherInfo.url} size={130}/>
              <div class="name-component">
                <h3 className="username">{teacherInfo.username}</h3>
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
                  <StarRating key={teacherInfo._id} rating={teacherInfo.rating} textColor={true}/>
                </div>
                <div className="success">
                  <h4  style={{color: 'white'}}>Thành công</h4>
                  <div className="ratio ml-2 mt-1 d-flex "  style={{color: 'white'}} > 
                          <Icon type="trophy" theme="filled" style={{color: 'green'}} className="mr-2" />
                          <div className=""> {`${teacherInfo.successRatio || 100}%`} </div>
                      </div>

                </div>
            </div>
          </div>

        <div className="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
            {teacherInfo.address !== undefined ? (
              <>
                <div className="basic-info-component">
                    <h3>Thông tin cơ bản</h3>
                    <div className="item-info">
                      <h5 className="info-title">Địa chỉ:</h5>
                      <h5>
                        {teacherInfo.address === undefined ? '' : `${teacherInfo.address.address}, ${teacherInfo.address.district}, Hồ Chí Minh` } 
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Số điện thoại:</h5> 
                      <h5>
                        {teacherInfo.phone}
                      </h5> 
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Ngày Sinh:</h5> 
                      <h5>
                        {teacherInfo.birthday === undefined ? '' : moment(teacherInfo.birthday).format('DD/MM/YYYY') }
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Giới tính: </h5>
                      <h5>
                        {teacherInfo.sex}
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Mức lương:</h5> 
                      <h5 >
                        {teacherInfo.price === undefined ? `0 đ` : `${teacherInfo.price} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </h5>
                    </div>
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
              </>
            ):(
              <div style={{textAlign: "center"}}>
                <Spin indicator={antIcon} />
              </div>
            )}
            </TabPane>
            <TabPane tab="Lịch sử dạy học" key="2">
              <div class="courses-component">
                <h3>Lịch sử các khóa dạy học</h3>
                {
                  history.map((item, index) => 
                    <Course key={item._id} data={item}/>
                  )
                }
              </div>
              {amount>0?<Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>:''}
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


