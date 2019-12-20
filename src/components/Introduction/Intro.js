import React from 'react';
import './Intro.scss';
import { Avatar } from 'antd'

const feature =  [{
        name: 'Tìm kiếm giáo viên',
        src: './timkiem.png',
        description : 'Nhanh chóng, dễ dàng'
    },
    {
      name: 'Hoàn tiền',
      src:'./hoantien.png',
      description : 'Nếu không hài lòng'
  },
  {
    name: 'Uy tín',
    src: './uytin.png',
    description : 'Đầu vào giáo viên đáng tin cậy'
}
]


class Intro extends React.Component {
  
  render() {
    return (
      <div className="introduction">
        <h2 className="intro-title"> Tại sao bạn nên sử dụng TeacherFinder? </h2>
        <div className="features d-flex justify-content-between">
            {
                feature.map((item, index) => 
                <div className="feature" key={index}>
                  <Avatar src={item.src} size={160} />
                  <p className="name">{item.name}</p>
                  <p>{item.description}</p>
                </div>)
            }
        </div>
      </div> 
    );
  }
}

export default Intro;