import React from 'react';
import { Form, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import moment from 'moment';



class Course extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        skills: [''],
        from: '',
        to: '',
        hour: 0,
        value: 0 ,
        rating: 5,
        status: ''
      };
    }


    UNSAFE_componentWillMount = () =>{
      const {data, allSkill} = this.props
      let skills = []
      allSkill.forEach(item => {
        if( item._id && data.skill.indexOf(item._id) !== -1 && !item.isDeleted)
          skills.push(item)
      });

      this.setState({
        data,
        skills,
        from : moment(data.fromDate).format('DD/MM/YYYY') ,
        to : moment(data.toDate).format('DD/MM/YYYY') ,
        status: data.status,
        rating : data.rating,
        hour: data.hour,
        value: data.value
      })

    }

  render() {
    const {skills, from, to, status, rating, hour, value}  = this.state  
    

    return (
      <div className="course">
        <div className="course-info">
          
        <div className="d-flex languages">
          {skills.map((item) => 
              <div className="skill" key={item._id}>{item.name}</div>
          )}
        </div>

          <div className="d-flex mt-3">
            <h4 className="mr-5 " style={{color: 'green'}}>{status}</h4>
            <h4 className="ml-5 ">{`${value} VND`}</h4>
          </div>
          <div className="d-flex mt-3">
            <h5 className= "mr-5">{`Ngày bắt đầu: ${from}`}</h5>
            <h5 className="ml-5">{`Ngày kết thúc : ${to}`}</h5>
          </div>
          <h5 className="mt-3">{`Tổng số giờ : ${hour}`}</h5>
          {/* <h5 className="mt-3">{` : ${rating}`}</h5> */}

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



export default connect(mapStateToProps, null)(Course)

