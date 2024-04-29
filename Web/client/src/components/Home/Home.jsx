// rafce
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Footer from '../Layout/Footer';

const Home = () => {
  return (
    <>
      <Navbar className='nav' expand="lg" style={{ backgroundColor: "#563D7C", width: '100%', height: '50px', paddingTop: '9px' }}>
        <div style={{ margin: '0 auto', display: 'flex' }}>
          <div style={{ marginTop: '5px', color: '#ffffff' }}>
            How do gender classification models operate in conjunction with voice-over videos? 🚀
          </div>
          <div className="">
            <a href="https://github.com/toandokhanh/Automated-Subtitle-Genderization-Public-Web" style={{ backgroundColor: "#ffffff", color: '#000000', borderRadius: '50px', marginLeft: '20px' }} className="btn py-1 px-2">Learn more</a>
          </div>
        </div>
      </Navbar>
      <br />
      <br />
      <br/>

      <div className="container-fluid bg-light my-6 mt-0" id="home">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 py-6 pb-0 pt-lg-0 " style={{ marginTop: "129px" }}>
              <h1 className="mb-3" style={{ color: "#563D7C" }}>VideoGenerator</h1>
              {/* <h2 className="display-3 mb-3" style={{ fontSize: '50px' }} >Develop AI-driven videos with automated subtitles and dubbed audio.</h2> */}
              <h2 className="display-3 mb-3" style={{ fontSize: '50px' }} >Develop AI-based videos with automatic subtitles Movie Dubbing and Narration</h2>
              <div className="typed-text d-none">Generate Subtitles Now!</div>
              <div className="d-flex align-items-center pt-5">
                <Link to="/login" style={{ backgroundColor: "#563D7C", color: '#ffffff', borderRadius: '50px' }} className="btn py-3 px-4 me-5">Create your first video</Link>
              </div>
            </div>
            <div className="col-lg-6" style={{ marginTop: "129px" }}>
              <img className="img-fluid" src='https://cdn-site-assets.veed.io/Add_Subtitles_to_Video_2dfa45d60e/Add_Subtitles_to_Video_2dfa45d60e.png?width=768&quality=75' alt="" />
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer></Footer>
    </>
  )
}

export default Home;
