import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';

const SubtitleViewer = ({ txtPath, wavPath, outputWavPath }) => {
  const [txtContent, setTxtContent] = useState('');
  const [wavSrc, setWavSrc] = useState('');
  const [outputWavSrc, setOutputWavSrc] = useState('');

  useEffect(() => {
    setTxtContent('');
    setWavSrc(wavPath);
    setOutputWavSrc(outputWavPath);

    fetch(txtPath)
      .then(response => response.text())
      .then(content => setTxtContent(content));
  }, [txtPath, wavPath, outputWavPath]);

  return (
    <Container className="py-4">
      <Row>
        <Col xs={6} className="text-center">
          <h5>Original Audio</h5>
          <audio controls src={wavSrc}>
            Your browser does not support the audio element.
          </audio>
        </Col>
        <Col xs={6} className="text-center">
          <h5>Noise-filtered Audio</h5>
          <audio controls src={outputWavSrc}>
            Your browser does not support the audio element.
          </audio>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="txtContent">
              <Form.Label>Text Content</Form.Label>
              <FormControl
                as="textarea"
                rows={5}
                value={txtContent}
                readOnly
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SubtitleViewer;
