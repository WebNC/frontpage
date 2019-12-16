import React from 'react';
import { Icon, Button} from 'antd';
import {Modal} from 'react-bootstrap'
import 'antd/dist/antd.css';
import moment from 'moment';




class DetailContract extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }



    render() {
        const {open, handleShowDetailContract, contractInfo} = this.props;
        return (
        <>
         <Modal show={open} onHide={handleShowDetailContract} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Thông tin hợp đồng</Modal.Title>
            </Modal.Header>
            
              
            <Modal.Body>

            <div className="basic-info-component">
                <div className="item-info">
                  <h5 className="info-title">Địa chỉ học :</h5>
                  <h5>
                    {contractInfo.address === undefined ? '' : `${contractInfo.address.address}, ${contractInfo.address.district}, Hồ Chí Minh` } 
                  </h5>
                </div>
                <div className="item-info">
                  <h5 className="info-title">Tên học viên</h5> 
                  <h5>
                    {contractInfo.studentID}
                  </h5> 
                </div>
                <div className="item-info">
                  <h5 className="info-title">Thời gian </h5> 
                  <h5>
                    {`Từ ngày ${moment(contractInfo.fromDate).format('DD/MM/YYYY')}  tới ngày  ${moment(contractInfo.toDate).format('DD/MM/YYYY')} `}
                  </h5>
                </div>
                <div className="d-flex">
                    <div className="item-info">
                        <h5 className="info-title">Số giờ: </h5>
                        <h5>
                            {contractInfo.hour}
                        </h5>
                    </div>

                    <div className="item-info">
                        <h5 className="info-title">Tổng tiền : </h5>
                        <h5>
                            {contractInfo.value}
                        </h5>
                    </div>
                </div>
               
                <div className="item-info">
                  <h5 className="info-title">Kỹ năng:</h5> 
                  {contractInfo.skill.map(item => 
                        <h5 key={item}>
                        {item}
                    </h5>
                    )}
                  
                </div>
              </div>
            
            </Modal.Body>
            <Modal.Footer>
                <Button type="secondary">Từ chối</Button>
                <Button type="primary">Đồng ý</Button>
            </Modal.Footer>
            
          </Modal>
          </>
        )
    }
}

export default DetailContract
