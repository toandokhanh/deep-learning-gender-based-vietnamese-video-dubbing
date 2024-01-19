import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <MDBFooter style={{ backgroundColor:'#563D7C' ,  color: '#ffffff'}} className="text-center text-lg-left">
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="4" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">SubVidSumary</h5>
            <p>
            This is an internship project of mine with the desire to help businesses have an automatic system of classifying and summarizing video content with natural language processing methods.
            </p>
          </MDBCol>
          
          <MDBCol lg="4" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                Email: ktoan515@gmail.com
              </li>
              <li>
                Phone: +84-916-814-948
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="4" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
              <Link to="https://github.com/toandokhanh/TextVidSummarizer">Open source</Link>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center p-3" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        © {new Date().getFullYear()} SubVidSumary
      </div>
    </MDBFooter>
  );
}

export default Footer;
