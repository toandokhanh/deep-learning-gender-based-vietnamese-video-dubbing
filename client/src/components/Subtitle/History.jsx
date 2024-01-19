import React from 'react'
import {useEffect, useState} from 'react'
import CustomNavbar from '../Layout/CustomNavbar'
import { apiUrl} from '../../contexts/constant';
import axios from 'axios';
import Table from 'react-bootstrap/Table'; 
import { FaRegFileAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom'
const History = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    axios.get(`${apiUrl}/video/getallvideo/subtitle`)
      .then((response) => {
      setResult(response.data.videosWithResultSubtitle);
      console.log(response.data.videosWithResultSubtitle);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
  if (!result) return <>
    <CustomNavbar />
    <div className="container mt-4">
    <h3 style={{ textAlign:'center', margin:'30px 0' }}>You don't have a video subtitle yet</h3>
    </div>
  </>
  return (
    <>
        <CustomNavbar />
        <div className="container mt-4">
        <h3 style={{ textAlign:'center', margin:'30px 0' }}>HISTORY</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Video Name</th>
              <th>Capacity</th>
              <th>Time(s)</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {result.map((video, index) => (
              <tr key={video._id}>
                <td>{index+1}</td>
                <td>{video.path_video.split('/').pop()}</td>
                <td>{video.capacity}</td>
                <td>{video.time}</td>
                <td>{video.createdAt}</td>
                <td>{video.updatedAt}</td>
                <td style={{ paddingLeft: '15px', cursor: 'pointer' }}>
                <Link style={{ color: '#000000' }} to={`/video/subtitle/detail/${video.date_time}`}><FaRegFileAlt/></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </>
  )
}

export default History