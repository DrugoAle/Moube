import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import "./stylesheets/makeProgram.scss";

export const MakeProgram = () => {
  const [makeProgram, setMakeProgram] = useState([]);
  const [editUser, setEditUser] = useState({
    name: "",
    password: "",
    surname: "",
    phone_number: "",
    city: "",
    company: "",
    img: null,
  });

  const navigate = useNavigate();

  const { program_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/program/allExercise/${program_id}`)
      .then((res) => {
        console.log(res.data);
        setMakeProgram(res.data.result);

        console.log(makeProgram);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e, index, exercise_id) => {
    const { name, value } = e.target;

    let element = makeProgram.find((item) => item.exercise_id === exercise_id);

    let obj = { ...element, [name]: value };

    let tempArray = makeProgram.map((elem) => elem);

    tempArray[index] = obj;

    setMakeProgram(tempArray);
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:4000/program/makeProgram`, makeProgram)
      .then((res) => {
        console.log(res, "Que me traes Ressss!!");
        navigate(`/makeProgramOrder/${program_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(makeProgram, "MAKEPROGRAM");
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="backBarra" lg={2}>
            <Sidebar />
          </Col>

          <Col lg={10}>
            {/* {makeProgram && <h2> {makeProgram[0].name} </h2>} */}

            {makeProgram && (
              <Table className="tablaRepes1 container2" striped bordered hover>
                <ul className="responsive-table2">
                  <li className="table-header">
                    <div className="col col-5">Miniatura</div>
                    <div className="col col-6">Nombre</div>
                    <div className="col col-7">Sets</div>
                    <div className="col col-8">Reps</div>
                    <div className="col col-9">Descanso</div>
                  </li>
                </ul>

                {makeProgram?.map((exer, index) => {
                  return (
                    <div className="responsive-table2 " key={index}>
                      <li className="table-row">
                        <div
                          className="col col-5 miniatura"
                          data-label="Miniatura"
                        >
                          {
                            <img
                              className={"miniTabla w-25"}
                              src={`https://img.youtube.com/vi/${exer.video_link}/0.jpg`}
                            />
                          }
                        </div>
                        <div className="col col-6 columnas" data-label="Nombre">
                          {exer.name}
                        </div>
                        <div className="col col-7" data-label="Sets">
                          <input
                            type="text"
                            className="m-2"
                            placeholder="número de series"
                            autoComplete="off"
                            name="sets"
                            onChange={(e) =>
                              handleChange(e, index, exer.exercise_id)
                            }
                          />
                        </div>
                        <div className="col col-8" data-label="Reps">
                          {" "}
                          <input
                            type="text"
                            className="m-2"
                            placeholder="número de repeticiones"
                            autoComplete="off"
                            name="reps"
                            onChange={(e) =>
                              handleChange(e, index, exer.exercise_id)
                            }
                          />
                        </div>
                        <div className="col col-9" data-label="Descanso">
                          {" "}
                          <input
                            type="text"
                            className="m-2"
                            placeholder="descanso"
                            autoComplete="off"
                            name="rest"
                            onChange={(e) =>
                              handleChange(e, index, exer.exercise_id)
                            }
                          />
                        </div>
                      </li>
                    </div>
                  );
                })}
              </Table>
            )}
            <Button
              className="botonMakeProgram"
              type="button"
              onClick={() => handleSubmit()}
            >
              Siguiente 🡺
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
