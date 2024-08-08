import React from "react";
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Builder from './components/Builder';
import Attendance from './components/Attendance';
import Marks from './components/Marks';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { connect } from 'react-redux';
import { logInSuccess } from './redux/actionCreators'; // Ensure this path is correct
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1
  }
}));

const MainRouter = (props) => {
  const classes = useStyles();
  const storedJwt = localStorage.getItem('token');

  React.useEffect(() => {
    console.log('Stored JWT:', storedJwt);
    if (storedJwt) {
      props.logInSuccess(storedJwt);
    }
  }, [storedJwt, props]);
  
  
  return (
    <div className={classes.wrapper}>
      <NavBar />
      <div className={classes.mainContent}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/builder" component={Builder} />
          <Route path="/password/forgot" component={ForgotPassword} />
          <Route path="/password/reset" component={ResetPassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/attendance" component={Attendance} />
          <Route path="/marks" component={Marks} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    resume: state.resume,
    token: state.resume.token
  };
}

const mapDispatchToProps = dispatch => ({
  logInSuccess: (token) => dispatch(logInSuccess(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);
