import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../contexts/constant';
import CustomNavbar from '../Layout/CustomNavbar'
import AlertMessage from '../Layout/AlertMessage'
function SubtitleYtbLink() {
  const [languages, setLanguages] = useState();
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [algorithmSTT, setAlgorithmSTT] = useState('google-cloud');
  const [gender, setGender] = useState('auto');
  const [rate, setRate] = useState('auto');
  const [volume, setVolume] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [adSubtitle, setAdSubtitle] = useState(true);
  const [videoLink, setVideoLink] = useState('');
  const [alert, setAlert] = useState(null)
  const [retainSound, setRetainSound] = useState(true);
  const [noise, setNoise] = useState(true);
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

  // Function to check if the input is a valid YouTube link
  const isValidYouTubeLink = (link) => {
    // const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(link);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (isValidYouTubeLink(videoLink)){
        const videoForm = {
            video: videoLink,
            sourceLanguage,
            type:algorithmSTT,
            rate,
            volume,
            gender,
            adSubtitle,
            retainSound,
            noise
        };
        const isAuto = value => value === 'auto';
        const filteredVideoForm = {};
        Object.keys(videoForm).forEach(key => {
        const value = videoForm[key];
        if (!isAuto(value)) {
            filteredVideoForm[key] = value;
        }
        });
        setLoading(true);
        console.log(filteredVideoForm);
        try {
        const response = await axios.post(`${apiUrl}/video/create/subtitle/v1`, filteredVideoForm);
        if (response.data.success) {
            console.log(response.data.newVideo.date_time);
            setLoading(false);
            navigate('/video/subtitle/detail/'+response.data.newVideo.date_time);
        }
        } catch (error) {
        console.error('Error:', error);
        setLoading(false);
        } 
    }else {
        // Invalid YouTube link, handle accordingly
        setAlert({ type: 'danger', message: 'Invalid YouTube link: '+videoLink +' ???'})
				setTimeout(() => setAlert(null), 5000)
      }
    
  };

  useEffect(() => {
    axios.get(`${apiUrl}/language/getall`)
      .then((response) => {
        setLanguages(response.data.languages);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleVideoLink = (e) => {
    const inputLink = e.target.value;
    setVideoLink(inputLink);
  };
  return (
    <>
        <CustomNavbar />
        <AlertMessage info={alert} />
        <div className='container-video'>
        <h2>TẠO VIDEO thuyết minh hoặc lồng tiếng BẰNG LIÊN KẾT YOUTUBE </h2>
        <br />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label>Nhập liên kết YouTube *</Form.Label>
            <Form.Control
            type="text"
            placeholder="Nhập liên kết YouTube"
            onChange={handleVideoLink}
            value={videoLink}
            required
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Chọn ngôn gốc của video</Form.Label>
            <Form.Control as="select" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
            {languages && languages.map((language, index) => (
                <option key={index} value={language.id}>{language.name}</option>
              ))}
            </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Chọn tỷ lệ của người đọc</Form.Label>
            <Form.Control as="select" value={rate} onChange={(e) => setRate(e.target.value)}>
                <option value="auto">Mặc định</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10 (recommended)</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
            </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Chọn âm lượng của người đọc</Form.Label>
            <Form.Control as="select" value={volume} onChange={(e) => setVolume(e.target.value)}>
                <option value="auto">Mặc định</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40 (recommended)</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
                <option value="110">110</option>
                <option value="120">120</option>
                <option value="130">130</option>
                <option value="140">140</option>
                <option value="150">150</option>
            </Form.Control>
            </Form.Group>


            <Form.Group>
            <Form.Label>Chọn giới tính của người đọc</Form.Label>
            <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="auto">Tự động nhận dạng (default)</option>
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
            </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Chọn phương pháp Speech-to-Text </Form.Label>
            <Form.Control as="select" value={algorithmSTT} onChange={(e) => setAlgorithmSTT(e.target.value)}>
                <option value="google-cloud">Google Cloud Speech-to-Text</option>
                <option value="openai-whisper">Openai Whisper Speech-to-Text</option>
            </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Check 
                type="checkbox" 
                label="Tạo video thuyết minh có phụ đề ngôn ngữ gốc"
                checked={adSubtitle}
                onChange={(e) => setAdSubtitle(e.target.checked)}
              />
            </Form.Group>


            <br/>
            <Form.Group>
              <Form.Check 
                type="checkbox" 
                label="Giử lại âm thanh gốc của video (Thuyết minh)"
                checked={retainSound}
                onChange={(e) => setRetainSound(e.target.checked)}
              />
            </Form.Group>

            <br/>
            <Form.Group>
              <Form.Check 
                type="checkbox" 
                label="Loại bỏ tiếng ồn (tiền xử lý âm thanh)"
                checked={noise}
                onChange={(e) => setNoise(e.target.checked)}
              />
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

export default SubtitleYtbLink;
