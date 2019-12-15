import React from 'react';
import './Intro.scss';

const feature =  [{
        name: 'Tìm kiếm giáo viên',
        src: './logo.png',
        description : 'Xem danh sách các giáo viên cũng như các thông tin chi tiết của giáo viên để tìm được giáo viên phù hợp với mình nhất '
    },
    {
      name: 'Đăng tải thông tin giáo viên',
      src:'./teacher.png',
      description : 'Đăng tải thông tin để các học viên có thể tìm đến mình một cách nhanh nhất'
  },
  {
    name: 'Uy tín và chất lượng cao ',
    src: './uytin.png',
    description : 'Phản hồi của các học viên về website cũng như giáo viên cho thấy độ tin cậy rất cao'
}
]


class Intro extends React.Component {
  
  render() {
    return (
      <div className="introduction">
      <h2 className="intro-title">Giới Thiệu </h2>
      <div className="features d-flex justify-content-between">
          {
              feature.map((item, index) => <div className="feature" key={index}>
                  <img src={item.src} height="100" width="100" alt="img" />
                 <h4>{item.name}</h4>
                 <p>{item.description}</p>
              </div>)
          }
      </div>
      </div> 
    );
  }
}

export default Intro;