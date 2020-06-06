import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../action/index';

const Login = ({ login, isAuthenticated,data }) => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [ emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  var error ="";
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const validate=()=>{
  //   let emailError = "";
  //   if(emailError.includes("@")){
  //     emailError = "Email is not valid";
  //     if(emailError){
  //       setEmailError(emailError);
  //       return false;
  //     }
      
  //   }
  //   if(passwordError){
  //     let passwordError = "it not empty";
  //     setPasswordError(passwordError);
  //   }
  //   return true;
  // }

  const onSubmit = async e => {
    e.preventDefault(); 
    // let validation = validate();
    // if(validation){

    // }
    const l=login({email, password});
    console.log(l);
    //error = l.response.data.name;
  }
  if (isAuthenticated) {
    console.log("isAuthenticated")
    return <Redirect to={`/join?email=${email}`} />;
  }
    //setEmailError("login error");
  
 

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <p>{error}</p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
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
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            
          />
        </div>
        <div>{passwordError}</div>   
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  data:state.auth.data
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
