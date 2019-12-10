import React from 'react';
import{ connect } from 'react-redux';
import './Filter.scss'
import * as teacherAction from '../../actions/teacher.actions'



class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSort: false,
            data: []
        }
    }

    componentDidMount = () =>{
        const {data,name} = this.props;
        this.setState({
            data: ['All', ...data.slice(0, data.size)],
            name,
            selected: name ? `Any ${name}` : 'All'
        })
        this.props.filterSkill(null)
        this.props.filterCost(null);
         this.props.filterAdress(null)

    }

    toggle = () => {
        this.setState(({
            openSort: !this.state.openSort
        }));
    }

    handleClick = e => {
        const {name, data} = this.state
        const selected = e.target.getAttribute('name')
        this.setState({selected})
        console.log(name,selected)

        if(name === 'Skill'){
            if(selected === 'All')
                this.props.filterSkill(null)
            this.props.filterSkill(selected)
        }
        else if (name === 'Cost'){
            if(selected === 'All')
                this.props.filterSkill(null)
            this.props.filterCost(data.indexOf(selected));
        }
        else {
            if(selected === 'All')
            this.props.filterAdress(null)
            this.props.filterAdress(selected)}
    }

    render() {
        const {selected} = this.state;
        let {data} = this.state
        return (
            <div className="drop-down  d-flex justify-content-between "  onClick={this.toggle}>
                    <p className="sort-by">Sort By:
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
  
  