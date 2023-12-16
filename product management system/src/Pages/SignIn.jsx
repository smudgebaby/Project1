import { useState } from 'react'
import { useEffect } from 'react';
import './SignIn.css'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    useEffect(() => {
        console.log(passwordShow);
    }, [passwordShow])


    const togglePasswordShow = () => {
        setPasswordShow(!passwordShow)
    }

    const handleSubmit = async () => {
        console.log(password)
        // TODO: handle submit with db and api
    }

    return (
        <>
            <div className="sign-in-container">
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
                        >Show</button>
                        </div>
                    </div>
                    <button type='submit' className='sign-in-button'>Sign In</button>
                </form>
                <div>
                    <p>Don&apos;t have an account?<a>Sign up</a></p>
                    <a>Forgot password?</a>
                </div>
            </div>
        </>
    )
}

export default SignIn
