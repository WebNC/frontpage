import React from 'react';
import { Link} from 'antd';
import 'antd/dist/antd.css';
class Logo extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     isFirstLoad: true,
    //   };
    // }

  render() {
    const {size} = this.props;
    return (
      <img src="logo.png" alt="" width={size} height={size}></img>
    );
  }
}

export default Logo