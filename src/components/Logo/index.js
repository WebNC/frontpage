import React from 'react';
import { Link} from 'antd';
import 'antd/dist/antd.css';
import './logo.css';

class Logo extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     isFirstLoad: true,
    //   };
    // }

  render() {
    return (
      <div className="logo">
        <h1 className="top">Teacher</h1>
        <h1 className="bottom">Finder</h1>
      </div>
    );
  }
}

export default Logo