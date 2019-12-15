import React from 'react'
import { Upload, Icon, Button, Avatar} from 'antd';
import { Modal} from 'react-bootstrap'
import './style.css'
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';

class MyAvatar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const {user, updateAvatar} = this.props;
    console.log(user);
    updateAvatar({
      id: user._id,
      file: this.state.file
    })

    this.setState({
      visible: false,
    });
}
  onChange = (e) => {
      this.setState({file: e.target.files[0]});
  }

  render() {
    const { imageUrl} = this.props;
    return (
      <div>
        <Button className="btn-avatar" onClick={() => this.showModal()}>
          <Avatar size={130} src={imageUrl} className="avatar-img" />
        </Button>
        <Modal show={this.state.visible}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật ảnh đại diện</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onFormSubmit}>
              <input type="file" name="myImage" onChange={this.onChange} />
              <button type="submit" className="btn-upload-avatar">Tải ảnh lên</button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    successMessage: state.user.successMessage,
    errMessage: state.user.errMessage,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateAvatar: (data) => dispatch(userActions.updateAvatar(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAvatar)