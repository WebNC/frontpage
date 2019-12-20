import React from 'react'
import { Upload, Icon, Button, Avatar, Tooltip, Result} from 'antd';
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
      isFirstLoadModal: true,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    const { getDetail } = this.props;
    this.setState({
      visible: false,
      isFirstLoadModal: true,
      err: undefined
    });
    getDetail();
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const {user, updateAvatar} = this.props;
    if (this.state.file === null || this.state.file === undefined) {
      this.setState({err: "Vui lòng chọn hình ảnh!"})
    }
    else {
      updateAvatar({
        id: user._id,
        file: this.state.file
      })
    }
    
    this.setState({
      isFirstLoadModal: false
    });
}
  onChange = (e) => {
      this.setState({file: e.target.files[0], err: undefined});
      
      let reader = new FileReader();
       
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result
        });
      }
   
      reader.readAsDataURL(e.target.files[0])
  }

  render() {
    const { imageUrl, successMessage, errMessage, pending} = this.props;
    return (
      <div>
        <Tooltip placement="bottom" title="Cập nhật ảnh đại diện">
          <Button className="btn-avatar" onClick={() => this.showModal()}>
            <Avatar size={130} src={imageUrl} className="avatar-img" />
          </Button>
        </Tooltip>
        <Modal show={this.state.visible} onHide={this.handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật ảnh đại diện</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage !== undefined && !this.state.isFirstLoadModal && 
              <Result
                status="success"
                title="Cập nhật ảnh đại diện thành công!"
              />
            }

            {errMessage !== undefined && !this.state.isFirstLoadModal &&
              <Result
                status="warning"
                title="Đã có lỗi xảy ra, vui lòng thử lại!"
              />
            }
            {successMessage === undefined && errMessage === undefined &&
              <>
                {this.state.err !== undefined && <div className="error-message">{this.state.err}</div>}
                <div className="preview-avatar">
                  <Avatar size={200} src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : imageUrl}></Avatar>
                </div>
                <form onSubmit={this.onFormSubmit} >
                  <div className="update-avatar-form">
                    <input type="file" name="myImage" onChange={this.onChange} />
                  </div>
                  <div className="update-avatar-form">
                    <button type="submit" className="btn-upload-avatar">
                      {
                        pending && <Icon type="loading" style={{ fontSize: 14, marginRight: 5 }} spin />
                      }
                      Tải ảnh lên
                      </button>
                  </div>
                </form>
              </>
            }
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
    pending: state.user.pending,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateAvatar: (data) => dispatch(userActions.updateAvatar(data)),
  getDetail: () => dispatch(userActions.getDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAvatar)