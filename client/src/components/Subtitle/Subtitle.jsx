import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../contexts/constant';
import CustomNavbar from '../Layout/CustomNavbar'
function Subtitle() {
  const [videoFile, setVideoFile] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('vi');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [videoName, setVideoName] = useState('');
  const [algorithm, setAlgorithm] = useState('no');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const spinnerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    borderRadius: '5px',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const handleVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
    setVideoName(e.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('inputFile', videoFile);
    if (videoFile.type !== 'video/mp4') {
      alert('Selected file is not a video MP4');
      setLoading(false);
      return;
    }
    // call API save video file
    fetch(`${apiUrl}/upload/video`, {
      method: 'POST',
      body: formData,
    });
    // call API create summary text
    const videoForm = {
      video: videoName,
      sourceLanguage,
      targetLanguage,
      algorithm,
    };
    try {
      const response = await axios.post(`${apiUrl}/video/create/subtitle`, videoForm);
      if (response.data.success) {
        console.log(response.data.newVideo.date_time);
        setLoading(false);
        navigate('/video/subtitle/detail/'+response.data.newVideo.date_time);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    } 
  };

  return (
    <>
        <CustomNavbar />
        <div className='container-video'>
        <h2>Create Video Subtitles</h2>
        <br />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label>Choose a video file</Form.Label>
            <Form.Control type="file" accept="video/*" onChange={handleVideoFile} required />
            </Form.Group>

            <Form.Group>
            <Form.Label>Source language</Form.Label>
            <Form.Control as="select" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
                <option value="vi">Vietnamese</option>
                <option value="en">English</option>
            </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Target language</Form.Label>
            <Form.Control as="select" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                <option value="vi">Vietnamese</option>
                <option value="en">English</option>
            </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Noise reduction algorithm</Form.Label>
            <Form.Control as="select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="no">No algorithm</option>
                <option value="deep">DeepFilterNet</option>
                <option value="noise">NoiseReduce</option>
            </Form.Control>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        {loading && (
            <div className="loading-overlay" style={spinnerStyle}>
            <Spinner animation="border" variant="info" />
            </div>
        )}
        </div>
    </>
  );
}

export default Subtitle;
