import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import HomePage from './containers/HomePage/Homepage';
import UserInfoPage from './containers/UserInfoPage/UserInfoPage';
import RegisterTeacherPage from './containers/RegisterTeacherPage/RegisterTeacherPage';
import TeacherHomePage from './containers/TeacherHomePage/TeacherHomePage';
import { connect } from 'react-redux';
require('dotenv').config()

function App(props) {
  const {loggedIn, isTeacher} = props;
  return (
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/user-info">
            {loggedIn && !isTeacher ? <UserInfoPage/> : <Redirect to="/login"/>}
          </Route>
          <Route exact path="/register-teacher">
            {loggedIn && isTeacher ? <RegisterTeacherPage/> : <Redirect to="/register"/>}
          </Route>
          <Route exact path="/teacher-home">
            {loggedIn && isTeacher ? <TeacherHomePage/> : <Redirect to="/"/>}
          </Route>
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
  loggedIn: state.user.loggedIn,
  isTeacher: state.user.isTeacher
})

export default connect(mapStateToProps)(App)
