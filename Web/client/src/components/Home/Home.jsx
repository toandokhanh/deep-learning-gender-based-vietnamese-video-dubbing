import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Layout/Footer';

const Home = () => (
  <>
    <main className="container py-5">
      <div className="p-5 rounded" style={{ backgroundColor: '#f7f7f8' }}>
        <h1>Vietnamese subtitles, dubbing and narration</h1>
        <p className="lead">Upload a video or use a YouTube watch link, choose a speech-recognition method, and generate Vietnamese subtitles or narrated output.</p>
        <Link to="/login" className="btn btn-primary">Get started</Link>
      </div>
      <section className="py-4">
        <h2>What you can do</h2>
        <ul><li>Speech recognition and translation</li><li>Voice selection from dataset-based labels</li><li>Subtitled and narrated video output</li></ul>
        <p>Review the generated output and correct recognition or translation errors before sharing it.</p>
      </section>
    </main>
    <Footer />
  </>
);
export default Home;
