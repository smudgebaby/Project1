import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'
import {signInUser} from '../../Utils/backendUtil.js';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '../../Store/User/userAction.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(passwordShow);
  }, [passwordShow])


  const togglePasswordShow = () => {
    setPasswordShow(!passwordShow)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signInUser();
    console.log(user);
    dispatch(setCurrentUser(user));
  }

  return (
    <>
      <div className='sign-in-container'>
        <div className="sign-in-form-container">
          <h1>Sign in to your account</h1>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input 
              type="email"
              id="email"
              onChange={e => setEmail(e.target.value)} 
              required>
            </input>

            <div className='password-container'>
              <label>Password</label>
              <div className='password-input-container'>
              <input
                type={passwordShow? 'text':'password'}
                id="password"
                onChange={e => setPassword(e.target.value)} 
                required>
              </input>
              <button
                type='button'
                onClick={togglePasswordShow}
                disabled={!password}
                className='password-show-button'
              >{passwordShow ? 'Hide' : 'Show'}</button>
              </div>
            </div>
            <button type='submit' className='sign-in-button'>Sign In</button>
          </form>
            
          <div className='additional-links'>
            <p>Don&apos;t have an account? <Link to='/signup'>Sign up</Link></p>
            <Link to='/resetpassword' className='reset-password'>Forgot password?</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
