import React, { useEffect, useState } from 'react';
import CustomNavbar from '../Layout/CustomNavbar';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../contexts/constant';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  MDBInput,
}
from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'; 
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, BarElement);

const Detail = () => {
  const params = useParams();
  const [detailResult, setDetailResult] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/video/get/summary/detail/${params.id}`)
      .then((response) => {
        setDetailResult(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!detailResult) return null;

  const { rouge1, rouge2, rougel } = detailResult.result;

  // Chuyển đổi giá trị ROUGE thành định dạng phần trăm
  const formatPercentage = (value) => {
    return (value * 100).toFixed(2); // Làm tròn đến 2 chữ số thập phân
  };

  // Dữ liệu cho biểu đồ line
  const lineChartData = {
    labels: ['ROUGE-1', 'ROUGE-2', 'ROUGE-L'],
    datasets: [
      {
        label: 'F1 Score (%)',
        data: [
          formatPercentage(rouge1.f1Score),
          formatPercentage(rouge2.f1Score),
          formatPercentage(rougel.f1Score),
        ],
        borderColor: 'rgb(255, 193, 7)',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        fill: true,
      },
      {
        label: 'Recall (%)',
        data: [
            formatPercentage(rouge1.recall),
            formatPercentage(rouge2.recall),
            formatPercentage(rougel.recall),
        ],
        borderColor: 'rgb(220, 53, 69)',
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
        fill: true,
      },
      {
        label: 'Precision (%)',
        data: [
            formatPercentage(rouge1.precision),
            formatPercentage(rouge2.precision),
            formatPercentage(rougel.precision),
        ],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  // Dữ liệu cho biểu đồ cột
  const barChartData = {
    labels: ['ROUGE-1', 'ROUGE-2', 'ROUGE-L'],
    datasets: [
      {
        label: 'F1 Score (%)',
        data: [
          formatPercentage(rouge1.f1Score),
          formatPercentage(rouge2.f1Score),
          formatPercentage(rougel.f1Score),
        ],
        backgroundColor: 'rgba(255, 193, 7, 0.7)',
      },
      {
        label: 'Recall (%)',
        data: [
            formatPercentage(rouge1.recall),
            formatPercentage(rouge2.recall),
            formatPercentage(rougel.recall),
        ],
        backgroundColor: 'rgba(220, 53, 69, 0.6)',
      },
      {
        label: 'Precision (%)',
        data: [
            formatPercentage(rouge1.precision),
            formatPercentage(rouge2.precision),
            formatPercentage(rougel.precision),
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Cấu hình biểu đồ
  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <>
      <CustomNavbar />
      <div style={{ width:'1000px', margin: '30px auto'}}>
      <h3 style={{ textAlign:'center' }}>Detailed results of the summary</h3>
      <br/>
      <div className='container'>
      <div style={{ display: 'flex' , justifyContent: 'left', gap:'50px'}}>
        <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Topic</Form.Label>
                <Form.Control value={detailResult.result.predict_text_classification} />
            </Form.Group>
        </Form>
        <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Processing Time</Form.Label>
                <Form.Control value={detailResult.result.processing_time} />
            </Form.Group>
        </Form>

        
      </div>
      <br/>
      <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Input Text</Form.Label>
              <Form.Control as="textarea" rows="5" name="address" value={detailResult.result.input_text} />
          </Form.Group>
      </Form>
      <br/>
      <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Output Text</Form.Label>
              <Form.Control as="textarea" rows="5" name="address" value={detailResult.result.output_text} />
          </Form.Group>
      </Form>
      </div>
      </div>
      <div style={{ width:'1000px', margin: '30px auto', alignItems:'center', alignContent:'center', textAlign: 'center' }}>
        <h3>ROUGE Scores and Metrics</h3>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
          <div style={{ width: '55%' }}>
            <Line data={lineChartData} options={chartOptions} />
          </div>
          <div style={{ width: '55%' }}>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
        <br/>
        <h3 style={{ textAlign:'center', margin:'30px 0' }}>Comparison of the amount of text in the Video</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Noise Reduction algorithm</th>
              <th>Text Summary algorithm</th>
              <th>Input sentence</th>
              <th>Input word</th>
              <th>Output sentence</th>
              <th>Output sentence</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{detailResult.NoiseReductionName}</td>
                <td>{detailResult.TextSummarizationName}</td>
                <td>{detailResult.result.sentenceCountInput}</td>
                <td>{detailResult.result.wordCountInput}</td>
                <td>{detailResult.result.sentenceCountOutput}</td>
                <td>{detailResult.result.wordCountOutput}</td>
              </tr>
          </tbody>
        </Table>
        <br/>
        <br/>
        <br/>
      </div>
    </>
  );
};

export default Detail;
