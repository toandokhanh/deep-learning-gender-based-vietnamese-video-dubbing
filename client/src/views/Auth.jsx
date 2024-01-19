import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { AuthContext } from '../contexts/authContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import {Link} from 'react-router-dom'


const Auth = ({authRoute}) => {
  const { authState: { authLoading, isAuthenticated }} = useContext(AuthContext)
  const spinnerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    borderRadius: '5px',
  };
  let body;
  if(authLoading) 
    body = (
        <div style={spinnerStyle}>
          <Spinner animation='border' variant='info'/> 
        </div>
      )
  else if (isAuthenticated) return <Navigate to='/summary'/>
  else
    body = (
      <>
        {authRoute === 'login' && <Login/>}
        {authRoute === 'register' && <Register/>}
      </>
    )
    return (
      <>
        <MDBContainer fluid className='p-5 w-75'>
          <MDBRow>
            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
              <Link style={{ textDecoration: 'none', color: '#000000' }} to='/'>
              <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                Create quality text<br />
                <span className="text-primary">for your videos</span>
              </h1>
              </Link>
              <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
              The site provides tools and functions to automatically classify, summarize, and generate captions based on word processing. 
              With the features it offers, you can reap benefits for your
              business and personal work.
              </p>
              
            </MDBCol>
            <MDBCol md='6'>
              <MDBCard className='my-5'>
                <MDBCardBody className='p-5'>
                  {body}
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='facebook-f' size="sm"/>
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='twitter' size="sm"/>
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='google' size="sm"/>
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='github' size="sm"/>
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
}

export default Auth