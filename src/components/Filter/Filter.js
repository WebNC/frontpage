import React from 'react';
import{ connect } from 'react-redux';
import './Filter.scss'
import * as teacherAction from '../../actions/teacher.actions'

const DEFAULT = null;


class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSort: false,
            data: []
        }
    }

    componentDidMount = () =>{
        const {data,type} = this.props;
        let name = "";
        if(type === 1) {
            name= " Quận "
        } else if(type === 2){
            name= "Giá"
        }
        else name = "Kỹ năng"

        this.setState({
            data: ['All', ...data.slice(0, data.size)],
            name,
            type,
            selected: name ? ` ${name}` : 'All'
        })
        this.props.filterSkill(DEFAULT)
        this.props.filterCost(DEFAULT);
         this.props.filterAdress(DEFAULT)

    }

    toggle = () => {
        this.setState(({
            openSort: !this.state.openSort
        }));
    }

    handleClick = e => {
        const { data, type} = this.state
        let selected = e.target.getAttribute('name')
        this.setState({selected})

        if(selected.trim() === 'All'){
            selected = DEFAULT
        }



        if(type === 3){
            this.props.filterSkill(selected)
        }
        else if (type === 2){
            if(data.indexOf(selected) === -1)
                this.props.filterCost(null)
            else
                this.props.filterCost(data.indexOf(selected))
        }
        else {
            this.props.filterAdress(selected)}
    }

    render() {
        const {selected} = this.state;
        let {data} = this.state
        return (
            <div className="drop-down d-flex justify-content-between"  onClick={this.toggle}>
                    <p className="sort-by">
                        <span className="sort-by-selected">{selected }</span>
                    </p>
                    <img src="/asserts/arrow.svg"
                        className="arrow " alt="arrow" />
                    {
                        this.state.openSort === true ? <div className="sort-by-items">
                            {data.map((item, index) => {
                                return (
                                    <p key={index}
                                        className="sort-by-item"
                                        name={item.name || item}
                                        onClick={this.handleClick}
                                    > {item.name || item}</p>
                                )
                            }
                            )}
                        </div> : <></>
                    }
                </div>
     )
    }

}

function mapStateToProps(state) {
    return { 
      allSkill: state.skill.allSkill,
      teachers : state.teachers
    };
  }
  const mapDispatchToProps = (dispatch) => ({
    filterAdress: (adress) => dispatch(teacherAction.filterAdress(adress)),
    filterCost: (cost)  => dispatch(teacherAction.filterCost(cost)),
    filterSkill: (skill)  => dispatch(teacherAction.filterSkill(skill)),

  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
  
  