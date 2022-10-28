import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CreateExercise } from "../exercises/CreateExercise";
import { Sidebar } from "../../components/Sidebar";
import axios from "axios";
import "../../components/stylesheets/admin.css";

export const AdminView = ({ setToken, token }) => {
  const [showFormExer, setShowFormExer] = useState(false);
  const [exercise, setExercise] = useState();
  const [update, setUpdate] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios

      .get(`http://localhost:4000/exercise/allexercise`)
      .then((res) => {
        setExercise(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  const handleDelete = (p) => {
    axios
      .delete("http://localhost:4000/exercise/deleteExer", { data: p })
      .then((res) => {
        console.log(res);
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col className="backBarra" lg={2}>
          <Sidebar setToken={setToken} />
        </Col>
        <Col lg={10}>
          {!showFormExer ? (
            <Button
              className="m-3"
              onClick={() => {
                setShowFormExer(true);
              }}
            >
              Crear Ejercicio
            </Button>
          ) : (
            <Button
              variant="warning"
              className="m-3"
              onClick={() => setShowFormExer(false)}
            >
              Cancelar
            </Button>
          )}

          {showFormExer && (
            <CreateExercise
              update={update}
              setUpdate={setUpdate}
              setShowFormExer={setShowFormExer}
              user_id={user_id}
            />
          )}

          <h2>Ejercicios </h2>

          {exercise && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Tipo</th>

                  <th>Ver video</th>
                  <th>Eliminar video</th>
                </tr>
              </thead>

              {exercise.map((exer, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>
                        {
                          <img
                            className={"w-25"}
                            src={`https://img.youtube.com/vi/${exer.video_link}/0.jpg`}
                          />
                        }
                        {exer.name}
                      </td>
                      <td>{exer.description}</td>

                      <td>
                        <Button
                          onClick={() => {
                            navigate(`/viewExerciseVideo/${exer.video_link}`);
                          }}
                        >
                          video
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <Button
                          onClick={() => handleDelete(exer)}
                          variant="danger"
                        >
                          X
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
        <Col></Col>
      </Row>
    </Container>
  );
};
