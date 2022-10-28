import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { SidebarPatient } from "../../components/SidebarPatient";
import { ExerciseTable } from "../exercises/ExerciseTable";
import "./allProgramPatient.scss";

export const AllProgramPatient = ({ token, setToken }) => {
  const { user_id } = useParams();
  const [editUser, setEditUser] = useState({
    name: "",
    password: "",
    surname: "",
    phone_number: "",
    city: "",
    company: "",
    img: null,
  });

  const [programs, setPrograms] = useState();
  const [exercise, setExercise] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/getEditProfile/${user_id}`)
      .then((res) => {
        setEditUser(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/patient/allprogramPatient/${user_id}`)
      .then((res) => {
        console.log(res);
        setPrograms(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOut = () => {
    const logOut = window.localStorage.removeItem("token");

    setToken(logOut);
    navigate("/");
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={2} className="contAside">
            <SidebarPatient
              token={token}
              setToken={setToken}
              user_id={user_id}
            />
          </Col>
          <Col lg={10} className="contAllEx">
            <h2>Tu programación</h2>

            {programs && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="eliminableResponsive"></th>

                    <th className="responsiveNombre">Nombre del programa</th>
                    <th className="eliminableResponsive">Fecha de inicio</th>
                    <th className="eliminableResponsive">Fecha de fin</th>
                  </tr>
                </thead>

                {programs.map((pro, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td className="eliminableResponsive">
                          {
                            <img
                              src={`https://img.youtube.com/vi/${pro.video_link}/0.jpg`}
                            />
                          }
                        </td>
                        <td className="responsiveNombre">{pro.name}</td>
                        <td className="eliminableResponsive">
                          {pro.start_date}
                        </td>
                        <td className="eliminableResponsive">{pro.end_date}</td>
                      </tr>
                      <div className="openClose">
                        <ExerciseTable pro={pro} />
                      </div>
                    </tbody>
                  );
                })}
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
