import React, {Fragment} from 'react'
import {AuthContext} from '../../contexts/authContext'
import {useContext} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Navigate} from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);

  const spinnerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    borderRadius: '5px',
  };

  if (authLoading) {
    return (
      <div style={spinnerStyle}>
        <Spinner animation='border' variant='info' />
      </div>
    );
  } else {
    return (
      <Fragment>
        {
          isAuthenticated ? (
            <>
              <Component {...rest}/>
            </>
          ) : (
            <Navigate to='/login' />
          )
        }
      </Fragment>
    );
  }
};

export default ProtectedRoute;
