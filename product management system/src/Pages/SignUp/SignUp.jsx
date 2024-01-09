import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const additionalLinks = 
    <><p>Already have an account?&nbsp;</p> <Link to='/signin'>Sign in</Link></>
  ;

  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return (password.length >= 8) && (/[a-z]/.test(password)) && (/[A-Z]/.test(password)) && (/\d/.test(password))
  }

  return (
    <Layout
      status='signup'
      title="Sign up to an account"
      buttonText="Create Account"
      additionalLinks={additionalLinks}
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
    />
  );
};

export default SignUp;
