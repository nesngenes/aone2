import React, {useState} from 'react'
import {TextField} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signin, signup} from '../../actions/auth'
import jwt_decode from 'jwt-decode'

import './styles.css'

const initialState = {firstname: '', lastname: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const state = null;
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  }

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <div className='auth-div'>
      <form className='AuthForm' onSubmit={handleSubmit}>

        {isSignUp && (
          <>
            <TextField style={{marginBottom: '10px'}} name="firstname" label="First Name" onChange={handleChange} autoFocus />
            <TextField style={{marginBottom: '10px'}} name="lastname" label="Last Name" onChange={handleChange} autoFocus />
          </>
        )}

        <TextField style={{marginBottom: '10px'}} name="email" label="Email Address" onChange={handleChange} type="email" />
        <TextField style={{marginBottom: '10px'}} name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

        {isSignUp && (
          <TextField style={{marginBottom: '10px'}} name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" />
        )}

        <button type='submit'>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>

      <div onClick={switchMode} className='switchMode'>
        {isSignUp ? <p>Already have an account? <span>Sign In</span></p> : <p>Don't have an account? <span>Sign Up</span></p>}
      </div>
    </div>

    
  )
}

export default Auth