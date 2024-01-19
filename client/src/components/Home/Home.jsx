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
            Experience the Future of AI-Powered Subtitles 🚀
          </div>
          <div className="">
            <a href="https://github.com/toandokhanh/VidSubWizard" style={{ backgroundColor: "#ffffff", color: '#000000', borderRadius: '50px', marginLeft: '20px' }} className="btn py-1 px-2">Learn more</a>
          </div>
        </div>
      </Navbar>
      <br />
      <br />
      <div className="container-fluid bg-light my-6 mt-0" id="home">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 py-6 pb-0 pt-lg-0 " style={{ marginTop: "129px" }}>
              <h1 className="mb-3" style={{ color: "#563D7C" }}>AI-Powered Subtitle Generation</h1>
              <h2 className="display-3 mb-3" style={{ fontSize: '50px' }} >Create Accurate Video Summaries Using Advanced Sound Filtering and Text Processing.</h2>
              <div className="typed-text d-none">Generate Subtitles Now!</div>
              <div className="d-flex align-items-center pt-5">
                <Link to="/login" style={{ backgroundColor: "#563D7C", color: '#ffffff', borderRadius: '50px' }} className="btn py-3 px-4 me-5">Generate your first summary</Link>
              </div>
            </div>
            <div className="col-lg-6" style={{ marginTop: "129px" }}>
              <img className="img-fluid" src='https://cdn-site-assets.veed.io/Add_Subtitles_to_Video_2dfa45d60e/Add_Subtitles_to_Video_2dfa45d60e.png?width=768&quality=75' alt="" />
            </div>
          </div>
        </div>
        <div className="container" style={{ backgroundColor: '#f7f7f8', borderRadius: '20px', padding: '0 30px 30px 30px' }}>
          <div className="row g-5 align-items-center" style={{ marginTop: "60px" }}>
            <h3 style={{ margin: '15px 0 -27px 0', textAlign: 'left' }}>Highly Accurate Subtitle Generation</h3>
            <div className="col-lg-6 py-6 pb-0 pt-lg-0 ">
              Are you searching for an online, automated tool to create precise subtitles for your videos? Look no further! Our AI-powered subtitle generator leverages advanced sound filtering techniques and text processing algorithms to provide you with near-perfect captions. You have the flexibility to embed these subtitles directly into your videos or download them as separate subtitle files (SRT, VTT, TXT, etc.). With seamless integration of automatic captioning and speech recognition, generating accurate subtitles has never been easier.
            </div>
            <div className="col-lg-6">
              Simply upload your video, and our tool will convert the audio to text, allowing you to make necessary edits. Integrating this recording into your video is a breeze with just a single click. Paired with our user-friendly video editor, our subtitle generator empowers you to enhance video accessibility, expand your audience, and make your content shine on social media platforms.
            </div>
          </div>
        </div>
        <div className="container" style={{ backgroundColor: '#f7f7f8', borderRadius: '20px', padding: '0 30px 30px 30px' }}>
          <div className="row g-5 align-items-center" style={{ marginTop: "60px" }}>
            <h3 style={{ margin: '15px 0 -60px 0px', textAlign: 'left' }}>Customized Summary Styles</h3>
            <div className="row g-5 align-items-center" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="col-lg-6">
                Explore our extensive library of typefaces, sizes, designs, and languages. Tailor your video summaries to align with your brand, message, and style. Fine-tune text placement, letter spacing, and other factors to create captivating content. Choose from professionally designed summary styles to expedite your video editing process. Elevate your videos by incorporating stickers, emojis, and smileys from our collection to infuse creativity and dynamism.
              </div>
              <div className="col-lg-5">
                <img className="img-fluid" src='https://cdn-site-assets.veed.io/Create_content_that_speaks_to_your_market_8a4d4be5d6/Create_content_that_speaks_to_your_market_8a4d4be5d6.png?width=640&quality=75' alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{ backgroundColor: '#f7f7f8', borderRadius: '20px', padding: '0 30px 30px 30px' }}>
          <div className="row g-5 align-items-center" style={{ marginTop: "60px" }}>
            <div className="row g-5 align-items-center" style={{ display: 'flex', justifyContent: 'center' }}>
              <h3 style={{ textAlign: 'center' }}>
                Transition from Auto Captions
              </h3>
              <p style={{ alignItems: 'center', textAlign: 'center' }}>
                The journey with SubVidSumary extends beyond automated captions. Elevate your videos with our user-friendly online video editing platform. Add a progress bar, background music, stickers, filters, special effects, and more. We designed SubVidSumary to simplify content creation, eliminating the need for complex video editing software. Loved by creators, influencers, and marketers alike, our video editor empowers you to expand your reach and boost engagement on popular social media platforms. Whether you're a video editing novice or an expert, SubVidSumary's intuitive tools will have you covered in minutes.
              </p>
              <Link to="/login" style={{ backgroundColor: "#563D7C", color: '#ffffff', borderRadius: '50px', width: '260px' }} className="btn py-3 px-4 me-5">Start Creating</Link>
              <img className="img-fluid" src='https://cdn-site-assets.veed.io/morethan_8c1e4a3d1e_ab0f207654/morethan_8c1e4a3d1e_ab0f207654.png?width=1280&quality=75' alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home;
