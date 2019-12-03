import React from 'react';
import { Form, Input, Button, Icon, Select, DatePicker, Avatar} from 'antd';
import 'antd/dist/antd.css';
import './style.css';

class Course extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     isFirstLoad: true,
    //   };
    // }

  render() {
    // const {username} = this.props;
    return (
      <div className="course">
        <div className="course-info">
          <h3>Web & Mobile Design</h3>
          <h4>299.000 VNĐ</h4>
          <h5>Thiết kế website doanh nghiệp chuyên nghiệp, tạo web bán hàng chuẩn SEO, làm web giá rẻ với Haraweb cùng hơn 400 giao diện tuyệt đẹp</h5>
        </div>
        <Button type="primary" className="course-btn">Cập nhật</Button>
      </div>
      
    );
  }
}

export default Course