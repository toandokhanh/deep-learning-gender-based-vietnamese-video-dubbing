import React, { useState , useEffect} from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import CustomNavbar from '../Layout/CustomNavbar'
import SubtitleFrom from './SubtitleFrom'
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../contexts/constant';
import { SUBTITLE_FILE_API } from '../../contexts/constant';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
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
  
  if (!detailResult) return <>

  </>
  const {outputVideoPath, outputWavPath, srtPath, txtPath, wavPath} = detailResult.result
  return (
    <>
    <CustomNavbar/>
    <br/>
    <br/>
    <br/>
        <div>
            <div className="container" style={{ display: 'flex'}}>
                {/* <div className="left" >
                    <div id="wrapper" style={{ border: '3px solid black' }}>
                    </div>
                </div> */}
                
                <div className="left" >
                <video className='video'
                    id="my-video-player"
                    style={{ border: '3px solid black' }}
                    width="700"
                    height="470"
                    controls
                >
                    <source
                    src={`${SUBTITLE_FILE_API}/${outputVideoPath}`}
                    type="video/mp4"
                    />
                </video>
                <div style={{ display: 'flex', gap:'20px', marginTop:'10px' }}>
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
                    href={`${SUBTITLE_FILE_API}/${srtPath}`}>
                    Dowload SRT file
                    </a>
                </Button>
                </div>
                </div>
                <div className="right">
                <SubtitleFrom
                  txtPath={`${SUBTITLE_FILE_API}/${txtPath}`}
                  wavPath={`${SUBTITLE_FILE_API}/${wavPath}`}
                  outputWavPath={`${SUBTITLE_FILE_API}/${outputWavPath}`}
                />
                </div>
            </div>
            </div>
            <br/>
          
    </>
  );
}

export default SubtitleDetail;
