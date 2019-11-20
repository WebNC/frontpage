import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import HomePage from './containers/HomePage/Homepage';
import { connect } from 'react-redux';

function App(props) {
  const {loggedIn} = props;
  return (
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home"> 
            {loggedIn ? <HomePage/> : <Redirect to="/login" />}
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
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(App)
