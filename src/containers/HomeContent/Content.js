import React from 'react';
import {Pagination} from 'react-bootstrap'
import Filter from '../../components/Filter/Filter'
import Cart from '../Cart/Cart'
import * as teacherAction from '../../actions/teacher.actions'
import './Content.scss'
import{ connect } from 'react-redux';


const hourRate = ['< 100K','100K - 500K','> 500K'];
// const sort = ['Low to high','High to low'];

const district = ['Quận 1', 'Quận 2', 'Quận 3','Quận 4', 'Quận 5', 
            'Quận 6', 'Quận 7','Quận 8','Quận 9', 'Quận 10', 
            'Quận 11', 'Quận 12',  'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Tân Bình', 'Quận Thủ Đức',
            'Quận Tân Phú', 'Quận Bình Tân', 'Quận Phú Nhuận', 'Huyện Củ Chi', 'Huyện Hóc Môn', 
            'Huyện Bình Chánh', 'Huyện Nhà Bè', 'Huyện Cần Giờ'
          ];  


class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            amount: 0, 
            page : 0
        }
    }

    componentDidMount = () =>{
        const {page} = this.state;
        teacherAction.getAllUserTeacher(page).then(res=>{
           this.setState({
               teachers: res.message
           })
       })
       teacherAction.getNumberUserTeacher().then(res=>{
           this.setState({
               amount: res.message
           })
       })
    }

    UNSAFE_componentWillReceiveProps = nextProps =>{
        const types = nextProps.teachers;
        if(!types.skill && !types.address && !types.cost){
            teacherAction.getAllUserTeacher(0).then(res=>{
                this.setState({
                    teachers: res.message
                })
            })
        } else {
            teacherAction.filterTeacher(types.address, types.cost, types.skill).then(res => {
                console.log(res)
                this.setState({
                    teachers: res.user
                })
            })
        }
    }

    handlePre = () =>{
        const {page, amount} = this.state;
        if(page  > Math.floor(amount/25)){
          this.setState({page: page -1})
          teacherAction.getAllUserTeacher(page).then(res=>{
            this.setState({teachers: res.message})
          })
          
        }
        
    }
  
    handleNext = () =>{
        const {page, amount} = this.state;
        if(page < Math.floor(amount/25) ){
          this.setState({page: page + 1})
          teacherAction.getAllUserTeacher(page).then(res=>{
            this.setState({teachers: res.message})
          })
          
        }
    }
      

    render() {
        const {teachers, amount, page} = this.state;
        const {allSkill} = this.props
        const items = [];
        const active = page +1;
        for (let number = 1; number <= amount/25+1; number+=1) {
            items.push(
            <Pagination.Item key={number}  active={number === active}>
                {number}
            </Pagination.Item>,
            );
        }
      
        return (
            <div className="content">
                <div className="d-flex filter-banner">
                    <h6 className="filter">Filter</h6>
                    <Filter data={district} name=" District"/>
                    <Filter data={hourRate} name="Cost"/>
                    <Filter data={allSkill} name="Skill"/>

                    {/* <div className="ml-auto d-flex">
                        <h6>Sort By : </h6>
                        <Filter data={sort} />

                    </div> */}
                </div>
                {
                    teachers.map((item, index) => 
                        <Cart cartInfor={item} key={index}/>
                    )
                }
                <div className="mb-5 mr-4">
                    <Pagination className="float-right" size="sm">
                        <Pagination.First onClick={this.handlePre} />
                        {items} 
                        {/* <Pagination.Ellipsis /> */}
                        <Pagination.Last onClick={this.handleNext}/>
                    </Pagination>
                </div>
            </div>        
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
  
  