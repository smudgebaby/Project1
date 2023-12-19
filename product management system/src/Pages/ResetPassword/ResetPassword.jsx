import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'

function ResetPassword() {
  const [email, setEmail] = useState('');
  let navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/confirmation')
  }

  return (
    <>
      <div className='reset-password-container'>
        <div className="reset-password-form-container">
          <h1>Update your password</h1>
          <p className='description'>Enter your email link, we will send you the recovery link</p>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input 
              type="email"
              id="email"
              onChange={e => setEmail(e.target.value)} 
              required>
            </input>

            <button type='submit' className='reset-password-button'>Update password</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
