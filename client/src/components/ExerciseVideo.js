import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./exerciseVideo.scss";

export const ExerciseVideo = () => {
  const navigate = useNavigate();
  const { video_link } = useParams();
  return (
    <div className="fullVideo">
      <Container fluid>
        <Row className="contVista">
          <Col className="videoVista">
            <h2>Sigue el ejercicio</h2>
            <iframe
              width="600"
              height="315"
              src={`https://www.youtube.com/embed/${video_link}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>

            <Button className="boton" onClick={() => navigate(-1)}>
              Atrás
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
