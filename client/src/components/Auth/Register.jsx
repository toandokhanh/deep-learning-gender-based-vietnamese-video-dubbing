import '../../scss/App.scss';
import React, {useState, useContext} from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../contexts/authContext';
import AlertMessage from '../Layout/AlertMessage'
import Form from 'react-bootstrap/Form';


function Register() {
  // context
  const { registerUser } = useContext(AuthContext)
  // Local state
  const [registerForm, setregisterForm] = useState({
    firstname: '',
    lastname:'',
    username: '',
    password: '',
    comfirmpassword: '',
  });
  const onChangeRegisterForm = event => setregisterForm({ ...registerForm, [event.target.name]: event.target.value });
  // alert message
  const [alert, setAlert] = useState(null)
  const { firstname, lastname, username, password, comfirmpassword } = registerForm;
  // handle submit 
  const handleRegister = async event => {
    event.preventDefault()
    console.log(firstname, lastname, username, password, comfirmpassword);
    // check password and confirm password
    if(password !== comfirmpassword) {
      setAlert({ type: 'danger', message: 'password and confirm password do not match' })
			setTimeout(() => setAlert(null), 5000)
      return
    } 
    try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}
  return (
    <>
    <AlertMessage info={alert} />
      <Form className='my-4' onSubmit={handleRegister}>
        <h3 className='text-center'>REGISTER</h3> <br></br>
        <MDBRow>
            <MDBCol col='6'>
              <MDBInput 
                wrapperClass='mb-4' 
                name='firstname' 
                value={firstname} 
                placeholder='First name' 
                id='form1' 
                type='text' 
                required
                onChange={onChangeRegisterForm}
                />
            </MDBCol>
            <MDBCol col='6'>
              <MDBInput 
                wrapperClass='mb-4' 
                placeholder='Last name'
                name='lastname'
                id='form1' 
                type='text'
                value={lastname}
                required
                onChange={onChangeRegisterForm}
                />
            </MDBCol>
        </MDBRow>
          <MDBInput 
            wrapperClass='mb-4' 
            placeholder='Username' 
            id='form1' 
            type='text'
            required
            name='username'
            value={username}
            onChange={onChangeRegisterForm}
            />
          <MDBInput 
            wrapperClass='mb-4' 
            placeholder='Password' 
            id='form1' 
            type='password'
            value={password}
            name='password'
            required
            onChange={onChangeRegisterForm}
            />
          <MDBInput 
            wrapperClass='mb-4' 
            placeholder='Confirm password'
            id='form1' 
            type='password'
            value={comfirmpassword}
            name='comfirmpassword'
            required
            onChange={onChangeRegisterForm}
            />
        <div className='d-flex mb-4'>
          <MDBCheckbox 
          name='flexCheck' 
          value='' 
          id='flexCheckDefault' 
          label ='I have read and agree to the terms' />
        </div>
        <Button className='w-100 mb-4' type='submit' size='md'>sign up</Button>
        <br/>
        <div >
          If you already have an account<Link to='/login'> Sign In</Link>
        </div>
      </Form>
    </>
  );
}

export default Register;