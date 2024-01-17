import { selectCurrentUser } from '../Store/User/userSelector.js';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {

  const currentUser = useSelector(selectCurrentUser);
  if(currentUser && currentUser.role === 2) {
    return children
  } else {
    return <Navigate to='/' />
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


export default PrivateRoute;