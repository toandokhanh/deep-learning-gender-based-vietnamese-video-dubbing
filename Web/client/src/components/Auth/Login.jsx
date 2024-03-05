import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../contexts/authContext';
import AlertMessage from '../Layout/AlertMessage'
import {
  MDBCol,
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';
const Login = () => {
  // Context
  const { loginUser } = useContext(AuthContext)
  // Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [alert, setAlert] = useState(null)
  const { username, password } = loginForm;

  const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  const handleLogin = async event => {
		event.preventDefault()
		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}
  return (
    <>
	<AlertMessage info={alert} />
      <Form className='my-4' onSubmit={handleLogin}>
        <h3 className='text-center'	>LOGIN</h3> <br></br>
				<MDBCol>
					<MDBInput
            			wrapperClass='mb-4'
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</MDBCol>
				<MDBCol>
					<MDBInput
            			wrapperClass='mb-4'
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</MDBCol>
				<div className='d-flex mb-4'>
				<MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label ='I have read and agree to the terms' />
				</div>
				<Button className='w-100 mb-4' type='submit' size='md'>sign up</Button>
			</Form>
      <div>
        Don't have an account?<Link to='/register'> Sign Up</Link>
      </div>
    </>
  );
}

export default Login;
