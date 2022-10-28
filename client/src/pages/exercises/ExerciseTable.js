import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./exerciseTable.scss";

export const ExerciseTable = ({ pro }) => {
  const { program_id } = pro;

  const [exercise, setExercise] = useState();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios

      .get(`http://localhost:4000/exercise/oneExerciseProgram/${program_id}`)
      .then((res) => {
        setExercise(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Button className="seeMore" onClick={() => setShow(!show)}>
        {!show ? "Ver más" : "Ver menos"}
      </Button>
      {show && (
        <Container fluid>
          <Row>
            <Col className="contshowmore">
              <h2>Ejercicios del programa</h2>

              {exercise && (
                <Table striped bordered hover>
                  {/* <div className='responsiveListaRepes'> */}
                  <thead className="responsiveListaRepes">
                    <tr>
                      <th></th>
                      <th></th>
                      <th className="eliminableResponsive">Tipo</th>
                      <th>Sets</th>
                      <th>Reps</th>
                      <th className="eliminableResponsive">Descanso</th>
                      <th>Ver vídeo</th>
                    </tr>
                  </thead>

                  {exercise.map((exer, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td className="eliminableResponsive">
                            {
                              <img
                                src={`https://img.youtube.com/vi/${exer.video_link}/0.jpg`}
                              />
                            }
                          </td>
                          <td>{exer.name}</td>
                          <td>{exer.description}</td>
                          <td>{exer.sets}</td>
                          <td>{exer.reps}</td>
                          <td className="eliminableResponsive">{exer.rest}</td>
                          <td>
                            <Button
                              onClick={() => {
                                navigate(
                                  `/viewExerciseVideo/${exer.video_link}`
                                );
                              }}
                            >
                              vídeo
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              )}
            </Col>
          </Row>
          <Row>
            <Button
              className="startEx"
              onClick={() => navigate("/captureScreen")}
            >
              Comenzar ejercicios
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
};
