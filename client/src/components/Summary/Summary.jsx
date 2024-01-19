import React, {useState} from 'react'
import CustomNavbar from '../Layout/CustomNavbar'
import { Form, Button } from 'react-bootstrap';
import '../../App.css'
import axios from 'axios';
import { apiUrl } from '../../contexts/constant';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {useNavigate} from 'react-router-dom'
function Dashboard() {
  let body;
  const [videoFile, setVideoFile] = useState('');
  const [sourceLanguage, setsourceLanguage] = useState('vi');
  const [noiseReductionAlgorithm, setNoiseReductionAlgorithm] = useState('no');
  const [textSummarization, setTextSummarization] = useState('lexrank');
  const [summarySentences, setSummarySentences] = useState('1');
  const [alert, setAlert] = useState(null);
  const [videoName, setVideoName] = useState('');
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
  
  // handle video info 
  const handleVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
    setVideoName(e.target.files[0].name)
  };
  const handleLanguage = (e) => {
    setsourceLanguage(e.target.value);
  };
  const handleNoiseReductionAlgorithm = (e) => {
    setNoiseReductionAlgorithm(e.target.value);
  };
  const handleTextSummarization = (e) => {
    setTextSummarization(e.target.value);
  };
  const handleSummarySentences = (e) => {
    setSummarySentences(e.target.value);
  };
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('inputFile', videoFile);
    // Kiểm tra xem tệp có phải là tệp video MP4 hay không
    if (videoFile.type !== 'video/mp4') {
      setAlert('Selected file is not a video MP4');
      setTimeout(() => setAlert(null), 5000)
      return;
    }
    // call API save video file
    fetch(`${apiUrl}/upload/video`, {
        method: 'POST',
        body: formData,
    });
    // call API create summary text
    const videoForm = {
      'video': videoName, 
      'language':sourceLanguage, 
      'noise':noiseReductionAlgorithm, 
      'summary':textSummarization, 
      'sentence':summarySentences 
    } 
    try {
      const response = await axios.post(`${apiUrl}/video/create/summary`, videoForm);
      if (response.data.success) {
        console.log(response.data.newVideo.date_time);
        setLoading(false);
        navigate('/video/summary/detail/'+response.data.newVideo.date_time);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    } 
  };
  if(!loading){
    body = (
      <>
      </>
    )
  }else{
    body = (
      <div style={spinnerStyle}>
        <Spinner animation='border' variant='info'/> 
      </div>
    )
  }
  
  return (
    <>
      <CustomNavbar />
      {body}
      <div className='container-video'>
        <h2>Categorize topics and summarize Video</h2>
        <br/>
        {alert === null ? null : <Alert variant='danger'>{alert}</Alert>} 
        <Form onSubmit={handleSubmit} encType="multipart/form-data" className="index">
        <Form.Group>
          <Form.Label>Choose a file</Form.Label>
          <Form.Control type="file" name='file' onChange={handleVideoFile} required/>
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Source language (input)</Form.Label>
          <Form.Control as="select" value={sourceLanguage} onChange={handleLanguage}>
            <option value="vi">Vietnamese</option>
            <option value="en">English</option>
          </Form.Control>
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Noise reduction algorithm</Form.Label>
          <Form.Control as="select" value={noiseReductionAlgorithm} onChange={handleNoiseReductionAlgorithm}>
            <option value="no">Do not use algorithms</option>
            <option value="deep">DeepFilterNet</option>
            <option value="noise">NoiseReduce</option>
          </Form.Control>
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Text summarization algorithm</Form.Label>
          <Form.Control as="select" value={textSummarization} onChange={handleTextSummarization}>
            <option value="lexrank">Giải thuật Lexrank</option>
            <option value="textrank">Giải thuật Textrank</option>
            <option value="lsa">Giải thuật LSA</option>
            <option value="random">Giải thuật Random</option>
            <option value="reduction">Giải thuật Reduction</option>
            <option value="edmundson">Giải thuật Edmundson</option>
            <option value="kl">Giải thuật KL-sum</option>
          </Form.Control>
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Summary sentences</Form.Label>
          <Form.Control
            type="number"
            value={summarySentences}
            onChange={handleSummarySentences}
            max={10}
            min={1}
            required
          />
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit" className="custom-button">
          Submit
        </Button>
      </Form>
      </div>
    </>
  )
}

export default Dashboard