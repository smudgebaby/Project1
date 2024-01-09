import { useState } from 'react';
import PropTypes from 'prop-types';
import {signInUser} from '../../Utils/backendUtil.js';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '../../Store/User/userAction.js';

import './Layout.css';

const Layout = ({ status, title, description, buttonText, additionalLinks, isValidEmail, isValidPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();

  const handleTogglePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    switch (status) {
      case 'signup':
        handleSignUp()
        break
      case 'signin':
        handleSignIn()
        break
      case 'reset-password':
        handleResetPassword()
    }
  };

  const handleSignUp = async () => {

  }

  const handleSignIn = async () => {
    const user = await signInUser();
    dispatch(setCurrentUser(user));
  }

  const handleResetPassword = async () => {

  }

  return (
    <>
      <div className='layout-container'>
        <div className='layout-form-container'>
          <h1>{title}</h1>
          {description && <p className="description">{description}</p>}
          <form onSubmit={handleSubmit}>
            <div className={isValidEmail(email) ? 'email-container' : 'invalid-container'}>
              <label>Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <p className='invalid-warning'>{!isValidEmail(email) && 'Invalid Email Input!'}</p>
            </div>

            { status !=='reset-password' && <div className={isValidPassword(password) ? 'password-container' : 'invalid-container'}>
                <label>Password</label>
                <div className='password-input-container'>
                  <input
                    type={passwordShow ? 'text' : 'password'}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  
                  <button
                    type='button'
                    onClick={handleTogglePasswordShow}
                    className='password-show-button'
                  >{passwordShow ? 'Hide' : 'Show'}</button>
                </div>
                <p className='invalid-warning'>{!isValidPassword(password) && 'Invalid Password Input!'}</p>
              </div>
            }

            <button type="submit" className={`${status}-button`}>
              {buttonText}
            </button>
          </form>

          {additionalLinks && <div className={`${status}-additional-links`}>
            {additionalLinks}
          </div>}
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  status:  PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  additionalLinks: PropTypes.node,
  isValidEmail: PropTypes.func,
  isValidPassword: PropTypes.func,
};

export default Layout;