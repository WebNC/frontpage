import React from 'react';
import Filter from '../../components/Filter/Filter'
import Cart from '../Cart/Cart'
import * as teacherAction from '../../actions/teacher.actions'
import './Content.scss'
import{ connect } from 'react-redux';
import ContactModal from '../../components/ContactModal/ContactModal'
import { Pagination, Select, Spin, Icon} from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const hourRate = ['< 100K','100K - 500K','> 500K'];
// const sort = ['Low to high','High to low'];
const district = ['Quận 1', 'Quận 2', 'Quận 3','Quận 4', 'Quận 5', 
            'Quận 6', 'Quận 7','Quận 8','Quận 9', 'Quận 10', 
            'Quận 11', 'Quận 12',  'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Tân Bình', 'Quận Thủ Đức',
            'Quận Tân Phú', 'Quận Bình Tân', 'Quận Phú Nhuận', 'Huyện Củ Chi', 'Huyện Hóc Môn', 
            'Huyện Bình Chánh', 'Huyện Nhà Bè', 'Huyện Cần Giờ'
          ];  

const { Option } = Select;
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: undefined,
            amount: 0, 
            pageSize : 10,
            openModal: false,
            time:0,
            isLoading: true
        }
    }

    componentDidMount = () =>{
        teacherAction.getAllUserTeacher(1).then(res=>{
           this.setState({
               teachers: res.message
           })
       })
       teacherAction.getNumberUserTeacher().then(res=>{
           this.setState({
               amount: res.message,
               isLoading: false
           })
       })
    }

    UNSAFE_componentWillReceiveProps = nextProps =>{
        const types = nextProps.teachers;
        // console.log(types)
        if(!types.skill && !types.address && !types.cost){
            teacherAction.getAllUserTeacher(1).then(res=>{
                this.setState({
                    teachers: res.message
                })
            })
        } else {
            const {allSkill} = this.props;
            const skill = allSkill.find((ele) => ele.name === types.skill);
            teacherAction.filterTeacher(types.address, types.cost, skill? skill._id:undefined).then(res => {
                this.setState({
                    teachers: res.user
                })
            })
        }
    }

    

    handleCloseModal = () =>{
        const {openModal} = this.state;
        this.setState({
            openModal : !openModal,
        })
    }
    
    handleChange = (value) =>{
        teacherAction.getAllUserTeacher(value).then(res=>{
            this.setState({
                teachers: res.message
            })
        })
    }

    handleSort = (value) => {
        let teachersList = this.state.teachers;
        if(value === 'asc') {
            teachersList.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)); 
        }
        else {
            teachersList.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
        }
        this.setState({
            teachers: teachersList
        })
    }
    render() {
        const {teachers, amount, pageSize, openModal} = this.state;
        const {allSkill} = this.props
        // handleCloseModal, open, teacher
        return (
        <>
            {teachers === undefined ? (
                <div style={{textAlign: "center"}}>
                    <Spin indicator={antIcon} />
                </div>
            ):(
                <div>
                    <ContactModal 
                        open={openModal}
                        handleCloseModal= {this.handleCloseModal}
                    />
                    
                    <div className="content">
                        <div className="d-flex filter-banner">
                            <h6 className="filter">
                                Bộ lọc
                                {/* <Icon type="filter"  className="ml-2" style={{ fontSize: '20px', color: '#08c' }} /> */}
                            </h6>
                            <Filter data={district} type={1}/>
                            <Filter data={hourRate} type={2}/>
                            <Filter data={allSkill} type={3}/>
                            <h6 className="filter">
                                Sắp xếp
                                {/* <Icon type="filter"  className="ml-2" style={{ fontSize: '20px', color: '#08c' }} /> */}
                            </h6>
                            <Select 
                                placeholder="Sắp xếp theo"
                                onChange={this.handleSort}
                                className="sort"
                                size="large"
                            >
                                <Option value="asc">Giá tăng dần</Option>
                                <Option value="desc">Giá giảm dần</Option>
                            </Select>
                            {/* <div className="ml-auto d-flex">
                                <h6>Sort By : </h6>
                                <Filter data={sort} />
    
                            </div> */}
                        </div>
                        {teachers.length === 0 ? (
                            <div style={{marginTop: "30px", height: "400px"}}>
                                <h5>Không có kết quả phù hợp</h5>
                            </div>
                        ):( 
                            <>
                            {
                                teachers.map((item, index) => 
                                    <Cart cartInfor={item} key={item._id} handleCloseModal={this.handleCloseModal}/>
                                )
                            }
                            {amount > pageSize && 
                                <div className="mb-5 mr-4">
                                    <Pagination defaultCurrent={1} total= {amount} pageSize = {pageSize} onChange={this.handleChange}/>
                                </div>
                            }
                            </>
                        )}
                    </div>        
                </div> 
                )}   
        </>
        )
    }
}

function mapStateToProps(state) {
    return { 
      allSkill: state.skill.allSkill,
      teachers : state.teachers,
    };
  }

  const mapDispatchToProps = (dispatch) => ({
  });
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Content)
  
  