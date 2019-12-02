import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import HomePage from './containers/HomePage/Homepage';
import UserInfoPage from './containers/UserInfoPage/UserInfoPage';
import RegisterTeacherPage from './containers/RegisterTeacherPage/RegisterTeacherPage';
import { connect } from 'react-redux';
require('dotenv').config()

function App(props) {
  const {loggedIn} = props;
  return (
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/user-info">
            {loggedIn ? <UserInfoPage/> : <Redirect to="/login"/>}
          </Route>
          <Route exact path="/teacher-register" component={RegisterTeacherPage} />
          {/* <Route exact path="/update"> 
            {loggedIn ? <UpdateInfoPage/> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/changepass"> 
            {loggedIn ? <ChangePassPage/> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/game">
            {loggedIn ? <Game /> : <Redirect to="/login" />}
          </Route> */}
        </Switch>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(App)
