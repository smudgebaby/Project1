import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import './SignIn.css'
import {signInUser} from '../../Utils/backendUtil.js';
import {useDispatch} from 'react-redux';
import {userSlice} from '../../Store/userSlice';
import {useEffect, useState} from 'react';

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
    dispatch(userSlice.actions.setCurrentUser(user));
  }

  const SignIn = () => {
    const additionalLinks =
      <>
        <p>Don&apos;t have an account? <Link to='/signup'>Sign up</Link></p>
        <Link to='/resetpassword' className='reset-password'>Forgot
          password?</Link>
      </>
    ;

    const isValidEmail = () => {
      return true;
    };

    const isValidPassword = () => {
      return true;
    };

    return (
      <Layout
        status='signin'
        title="Sign in to your account"
        buttonText="Sign In"
        additionalLinks={additionalLinks}
        isValidEmail={isValidEmail}
        isValidPassword={isValidPassword}
      />
    );
  }
}

export default SignIn;
