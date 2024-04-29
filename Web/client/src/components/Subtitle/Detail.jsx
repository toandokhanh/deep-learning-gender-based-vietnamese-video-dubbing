import React, { useState , useEffect} from 'react';
import { Table, Button, Container, Col } from 'react-bootstrap';
import CustomNavbar from '../Layout/CustomNavbar'
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../contexts/constant';
import { SUBTITLE_FILE_API } from '../../contexts/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
function SubtitleDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [detailResult, setDetailResult] = useState();
  
  useEffect(() => {
    axios.get(`${apiUrl}/video/get/subtitle/detail/${params.id}`)
      .then((response) => {
        setDetailResult(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  if (!detailResult) return <></>
  const {videoSubtitle, video_explanation, video_explanation_sub, srt_original, srt_translated, srt_labeled, audio_original, audio_filtered, audio_described, audio_overlay_described, execution_time, type} = detailResult.result
  
  const videoDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/video/delete/${params.id}`);
      if (response.data.success) {
        console.log('Server response:', response.data.message);
        navigate('/history/subtitle');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  }
  return (
    <>
    <CustomNavbar/>
    <br/>
    <br/>
    <br/>
        <div>
            <div className="container" style={{ display: 'flex'}}>
                <div className="left" >
                <h4>Video gốc</h4>
                <video className='video'
                    id="my-video-player"
                    style={{ border: '3px solid black' }}
                    width="700"
                    height="470"
                    controls
                    >
                    <source
                    src={`${SUBTITLE_FILE_API}/${audio_original.split('.')[0]}.mp4`}
                    type="video/mp4"
                    />
                </video>
                <br/>
                <h4>Video phụ đề</h4>
                <video className='video'
                    id="my-video-player"
                    style={{ border: '3px solid black' }}
                    width="700"
                    height="470"
                    controls
                >
                    <source
                    src={`${SUBTITLE_FILE_API}/${videoSubtitle}`}
                    type="video/mp4"
                    />
                </video>
                <div style={{ display: 'flex', gap:'20px', margin:'10px' , justifyContent: 'center'}}>
                <Button
                    className="change"
                    style={{
                    cursor: 'pointer',
                    backgroundColor: '#563D7C',
                    color: '#ffffff', 
                    }}
                    data-name="filename"
                >
                    <a 
                    style={{color: '#ffffff', textDecoration:'none', marginTop:'20px'}} 
                    href={`${SUBTITLE_FILE_API}/${srt_translated}`}>
                    Dowload SRT file
                    </a>
                </Button>
                </div>
                <br/>
                <h4>Video thuyết minh\lồng tiếng</h4>
                <video className='video'
                    id="my-video-player"
                    style={{ border: '3px solid black' }}
                    width="700"
                    height="470"
                    controls
                >
                    <source
                    src={`${SUBTITLE_FILE_API}/${video_explanation}`}
                    type="video/mp4"
                    />
                </video>
                <div style={{ display: 'flex', gap:'20px', marginTop:'10px', justifyContent: 'center' }}>
                <Button
                    className="change"
                    style={{
                    cursor: 'pointer',
                    backgroundColor: '#563D7C',
                    color: '#ffffff', 
                    }}
                    data-name="filename"
                >
                    <a 
                    style={{color: '#ffffff', textDecoration:'none', marginTop:'20px'}} 
                    href={`${SUBTITLE_FILE_API}/${srt_labeled}`}>
                    Dowload SRT file
                    </a>
                </Button>
                </div>
                <br/>
                { video_explanation_sub && (
                  <div>
                    <h4>Video thuyết minh\lồng tiếng có phụ đề gốc</h4>
                    <video className='video'
                        id="my-video-player"
                        style={{ border: '3px solid black' }}
                        width="700"
                        height="470"
                        controls
                    >
                        <source
                        src={`${SUBTITLE_FILE_API}/${video_explanation_sub}`}
                        type="video/mp4"
                        />
                    </video>
                    <div style={{ display: 'flex', gap:'20px', marginTop:'10px', justifyContent: 'center' }}>
                    <Button
                        className="change"
                        style={{
                        cursor: 'pointer',
                        backgroundColor: '#563D7C',
                        color: '#ffffff', 
                        }}
                        data-name="filename"
                    >
                        <a 
                        style={{color: '#ffffff', textDecoration:'none', marginTop:'20px'}} 
                        href={`${SUBTITLE_FILE_API}/${srt_original}`}>
                        Dowload SRT file
                        </a>
                    </Button>
                    </div>
                  </div>
                )}
                </div>
                <div className="right">
                  <Container>
                    <h4>Thông tin chi tiết:</h4>
                    - Tên video: {audio_original.split('.')[0]} <br/>
                    - Audio gốc:
                        <Col xs={6} className="text-center">
                          <audio controls src={`${SUBTITLE_FILE_API}/${audio_original}`}>
                            Your browser does not support the audio element.
                          </audio>
                        </Col>
                    - Audio đã lọc nhiễu:
                        <Col xs={6} className="text-center">
                          <audio controls src={`${SUBTITLE_FILE_API}/${audio_filtered}`}>
                            Your browser does not support the audio element.
                          </audio>
                        </Col>
                    - Audio lồng tiếng:
                    <Col xs={6} className="text-center">
                      <audio controls src={`${SUBTITLE_FILE_API}/${audio_described}`}>
                        Your browser does not support the audio element.
                      </audio>
                    </Col>
                    - Audio thuyết minh:
                    <Col xs={6} className="text-center">
                      <audio controls src={`${SUBTITLE_FILE_API}/${audio_overlay_described}`}>
                        Your browser does not support the audio element.
                      </audio>
                    </Col>
                    - Thời gian thực thi: {execution_time} <br/>
                    - Phương pháp Speech-to-Text: {type}
                    <br/>
                    <br/>
                    <Button
                        className="change"
                        style={{
                        cursor: 'pointer',
                        backgroundColor: '#563D7C',
                        color: '#ffffff', 
                        }}
                        data-name="filename"
                        onClick={videoDelete}
                    >
                        Xóa video
                    </Button>
                  </Container>
                </div>
            </div>
            </div>
            <br/>
          
    </>
  );
}

export default SubtitleDetail;
