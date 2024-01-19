import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/authContext'
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../../App.css';
import logo from '../../assets/logo.png';
const CustomNavbar = () => {
  const userImageUrl = 'https://th.bing.com/th/id/OIP.fj2-I2JF5aypKhjMQiGMfAAAAA?pid=ImgDet&rs=1'
  const { authState: { user: { fullname } }, logoutUser } = useContext(AuthContext)
  const handleLogout = () => logoutUser()

  return (
    <Navbar className='nav' expand="lg" style={{ backgroundColor: "#563D7C" }}>
      <Container>
        <Navbar.Brand style={{ color: "#ffffff" }} as={Link} to="/">
        <img
          src={logo}
          alt={fullname}
          width="30"
          height="30"
          className="d-inline-block align-top rounded-circle me-2"
        />
        SubVidSumary
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ color: "#ffffff" }} as={Link} to="/subtitle">Subtitles</Nav.Link>
            <Nav.Link style={{ color: "#ffffff" }} as={Link} to="/summary">Summary</Nav.Link>
            <Nav.Link style={{ color: "#ffffff" }} href="https://github.com/toandokhanh/TextVidSummarizer" target="_blank">Github</Nav.Link>
            {/* <Dropdown>
              <Dropdown.Toggle style={{ backgroundColor: "#563D7C", border: 'none', marginTop: '2px' }} id="user-dropdown">
                Services
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/subtitle'>Video subtitles</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Video narration</Dropdown.Item> 
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to='/summary'>Categorize topics and summarize Video</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle style={{ backgroundColor: "#563D7C", border: 'none' }} id="user-dropdown">
                <img
                  src={userImageUrl}
                  alt={fullname}
                  width="30"
                  height="30"
                  className="d-inline-block align-top rounded-circle me-2"
                />
                {fullname}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>User Info</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/history/summary">Your summary</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/history/subtitle">Your subtitle</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
