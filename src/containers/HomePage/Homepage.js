import React from 'react';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import Header from '../../components/Header/Header'
import NavBar from '../../components/NavBar/NavBar'
import Content from '../HomeContent/Content'
import Intro from '../../components/Introduction/Intro'
import MyFooter from '../../components/Footer/Footer'
import Sliders from '../../components/Sliders/Sliders'

const categories = ['Web Dev', 'Mobile Dev', 'Design', 'Quality Control', 'Quality Assurance', 'Tester', 'Business Analyst',  'All Category']


class HomePage extends React.Component {
  
  render() {
    const { username} = this.props;
    return (
      <div className="home ">
        <Header username = {username}/>
          {/* <NavBar categories={categories}/> */}
        <Sliders/>
        <Content/>
        <Intro/>
        <MyFooter/>

      </div> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    message: state.user.message,
    loggedIn: state.user.loggedIn,

  };

}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
  getdetail: ()  => dispatch(userActions.getdetail()),
});

 export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

