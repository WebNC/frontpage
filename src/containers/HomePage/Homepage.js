import React from 'react';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import Header from '../../components/Header/Header'
import NavBar from '../../components/NavBar/NavBar'
import Content from '../../components/Content/Content'
import Intro from '../../components/Introduction/Intro'
import Footer from '../../components/Footer/Footer'
import Sliders from '../../components/Slider/Slider'

const categories = ['Web Dev', 'Mobile Dev', 'Design', 'Quality Control', 'Quality Assurance', 'Tester', 'Business Analyst',  'All Category']


class HomePage extends React.Component {
  
  render() {
    const { username, message} = this.props;
    return (
      <div className="home ">
        <Header username = {username}/>
          {message && !this.state.isFirstLoad &&
                  <div className="error-message">{message}</div>
                }
          <NavBar categories={categories}/>
          <Sliders/>
       
           <Content/>
           <Intro/>
           <Footer/>

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
  //loginWithFBGG:(token) => dispatch(userActions.loginWithFBGG(token))
});

 export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

