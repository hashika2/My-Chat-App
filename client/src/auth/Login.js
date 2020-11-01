import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../action/index';
import IdleTimeOut from '../components/timeoutSession/IdleTimeOut';

const Login = ({ login, isAuthenticated,alert }) => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [ emailError,setEmailError ] = useState('');
  const [ passwordError,setPasswordError ] = useState('');
  let error = "";
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault(); 
    login({email, password});
  }
  if (isAuthenticated) {
    console.log("isAuthenticated")
    return <Redirect to={`/join?email=${email}`} />;
  }
  if(alert.alertType === 'danger') {
    console.log(alert.alertType)
    error = 'Invalid Username and Password'
  }
  
  return (
    <Fragment>
      
      {/* <IdleTimeOut/> */}
      <div className ="container" style={{backgroundColor:"black"}}>
        <div className="card" style={{marginTop:"20%"}}>
          <p style={{backgroundColor:"red" ,textAlign:"center" ,color:"white"}}>{error}</p>
          <form className='text-center border border-light p-5' onSubmit={e => onSubmit(e)}>
            <p class="h4 mb-4">Sign In</p>
            <div className='form-group'>
              <input
                className="form-control"
                type='text'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div>{emailError}</div>
            <div className='form-group'>
              <input
                className="form-control"
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div>{passwordError}</div>   
            <input type='submit' className='btn btn-success' value='Login' />
          </form>
          <p className='text-center'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  data:state.auth.data,
  alert:state.alert.alert_data
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
