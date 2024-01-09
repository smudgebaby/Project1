import Layout from '../Layout/Layout';
import './ResetPassword.css'

const ResetPassword = () => {
  const isValidEmail = () => {
    return true;
  };

  const isValidPassword = () => {
    return true;
  };
  return (
    <Layout
      status='reset-password'
      title="Update your password"
      description="Enter your email below, and we will send you the recovery link."
      buttonText="Update Password"
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
    />
  );
};

export default ResetPassword;
