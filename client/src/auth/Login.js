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
      <div className ="container" style={{backgroundColor:"black"}}>
        <div className="card" style={{marginTop:"20%"}}>
      <p>{error}</p>
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
        <input type='submit' className='btn btn-primary' value='Login' />
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
  data:state.auth.data
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
