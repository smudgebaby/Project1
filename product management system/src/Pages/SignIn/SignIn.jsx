import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import './SignIn.css'
import {selectCurrentUser} from '../../Store/User/userSelector.js';
import { useSelector } from 'react-redux';

const SignIn = () => {
  const additionalLinks =
    <>
      <p>Don&apos;t have an account? <Link to='/signup'>Sign up</Link></p>
      <Link to='/resetpassword' className='reset-password'>Forgot password?</Link>
    </>
  ;
  const currentUser = useSelector(selectCurrentUser);

  const isValidEmail = () => {
    return true;
  };

  const isValidPassword = () => {
    return true;
  };

  return (
    <Layout
      status='signin'
      title={currentUser ? 'Switch account':"Sign in to your account"}
      buttonText="Sign In"
      additionalLinks={additionalLinks}
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
    />
  );
};

export default SignIn;