import { useState } from 'react'
import { Link } from 'react-router-dom';
import './SignUp.css'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    console.log(password)
    // TODO: handle submit with db and api
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return (password.length >= 8) && (/[a-z]/.test(password)) && (/[A-Z]/.test(password)) && (/\d/.test(password))
  }

  return (
    <>
      <div className='sign-up-container'>
        <div className="sign-up-form-container">
          <h1>Sign up to an account</h1>
          <form onSubmit={handleSubmit}>
            <div className={isValidEmail(email) ? 'email-container': 'invalid-container'}>
              <label>Email</label>
              <input 
                type="email"
                id="email"
                onChange={e => setEmail(e.target.value)} 
                required>
              </input>
              <p className='invalid-warning'>{!isValidEmail(email) && 'Invalid Email Input!'}</p>
            </div>

            <div className={isValidPassword(password) ? 'password-container': 'invalid-container'}>
              <label>Password</label>
              <input
                type='password'
                id="password"
                onChange={e => setPassword(e.target.value)} 
                required>
              </input>
              <p className='invalid-warning'>{!isValidPassword(password) && 'Invalid Password Input!'}</p>
            </div>

            <button type='submit' className='create-account-button'>Create account</button>
          </form>
          
          <div className='additional-links'>
              <p>Already have an account? <Link to='/signin'>Sign in</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
