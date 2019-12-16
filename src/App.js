import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import HomePage from './containers/HomePage/Homepage';
import RegisterTeacherPage from './containers/RegisterTeacherPage/RegisterTeacherPage';
import TeacherHomePage from './containers/TeacherHomePage/TeacherHomePage';
import EditInfoTeacherPage from './containers/EditInfoTeacherPage/EditInfoTeacherPage';
import TeacherDetail from './containers/TeacherDetail/TeacherDetail';
import ActiveEmailPage from './containers/ActiveEmailPage/ActiveEmailPage';
import ConfirmEmailPage from './containers/ConfirmEmailPage/ConfirmEmailPage';
import ForgetPasswordPage from './containers/ForgetPasswordPage/ForgetPasswordPage';
import ResetPasswordPage from './containers/ResetPasswordPage/ResetPasswordPage';
import StudentInfoPage from './containers/StudentInfoPage/StudentInfoPage';
// import ContractDetailStudentPage from './containers/ContractDetailStudentPage/ContractDetailStudentPage';
import { connect } from 'react-redux'
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
          <Route exact path="/teachers/:id"  component={TeacherDetail} />

          <Route exact path="/home"  component={HomePage} />
          
          {/* <Route exact path="/home">
          {isTeacher ? <TeacherHomePage/> : <HomePage/>}
          </Route> */}

          {/* <Route exact path="/user-info" >
            {loggedIn && !isTeacher ? <UserInfoPage/> : <Redirect to="/login"/>}
          </Route> */}
          <Route exact path="/teacher-register">
            {loggedIn && isTeacher ? <RegisterTeacherPage/> : <Redirect to="/register"/>}
          </Route>
          <Route exact path="/teacher-home">
            {loggedIn && isTeacher ? <TeacherHomePage/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/teacher-edit-info">
            {loggedIn && isTeacher ? <EditInfoTeacherPage/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/student/info">
            {loggedIn && !isTeacher ? <StudentInfoPage/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/comfirm-email" component={ConfirmEmailPage} />
          <Route exact path="/active/:token" component={ActiveEmailPage} />
          <Route exact path="/forget-password" component={ForgetPasswordPage} />
          <Route exact path="/forget/:token" component={ResetPasswordPage} />
          <Route exact path="/test" component={ResetPasswordPage} />
          {/* <Route exact path="/student/contract/:id" component={ContractDetailStudentPage} /> */}
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
