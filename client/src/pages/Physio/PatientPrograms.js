import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Table, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalDateProgram } from "../../components/Modals/ModalDateProgram";
import { Sidebar } from "../../components/Sidebar";
import "./patientProgram.scss";

export const PatientPrograms = ({ setToken }) => {
  const navigate = useNavigate();

  const [allProgram, setAllProgram] = useState([]);
  const [patientInfo, setPatientInfo] = useState();
  const { patient_id, user_id } = useParams();
  const [programDate, setProgramDate] = useState({
    startDate: "",
    endDate: "",
    patient_id: Number(patient_id),
    program_id: "",
  });

  const [editUser, setEditUser] = useState({
    name: "",
    password: "",
    surname: "",
    phone_number: "",
    city: "",
    company: "",
    img: null,
  });

  const [update, setUpdate] = useState(false);

  const [showModal, setShowModal] = useState(false);

  console.log(patient_id, "el params, que trae");

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
      .get(`http://localhost:4000/patient/info/${patient_id}`)
      .then((res) => {
        console.log(res.data, "Nuevoooo dataaa");
        setPatientInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/program/allProgramPhysio/${user_id}`)
      .then((res) => {
        setAllProgram(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  const handleSubmit = (program_id) => {
    setProgramDate({
      ...programDate,
      program_id: program_id,
    });

    setShowModal(true);
  };

  const handleDelete = (p) => {
    axios
      .delete("http://localhost:4000/program/deleteProgram", { data: p })
      .then((res) => {
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={2} className="contAside barraAzul">
          <Sidebar
            setToken={setToken}
            user={editUser}
            user_id={user_id}
            navigate={navigate}
          />
        </Col>

        <Col lg={10}>
          <ModalDateProgram
            programDate={programDate}
            setProgramDate={setProgramDate}
            showModal={showModal}
            setShowModal={setShowModal}
            setUpdate={setUpdate}
            update={update}
          />

          <div className="d-flex">
            <Button className="m-3 back" onClick={() => navigate(-1)}>
              🡸 Volver
            </Button>
            <h2 className="m-3 infoPaciente">Información del Paciente</h2>
          </div>

          {patientInfo && (
            <>
              <h4 className="susProgramas">Sus programas</h4>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre del programa</th>

                    <th>Fecha comienzo</th>
                    <th>Fecha final</th>
                    <th></th>
                  </tr>
                </thead>

                {patientInfo?.map((progr, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{progr.name}</td>

                        <td>{progr.start_date}</td>
                        <td>{progr.end_date}</td>

                        <td>
                          <Button
                            onClick={() => handleDelete(progr)}
                            variant="danger"
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </>
          )}
          <hr />
          <h2 className="asignarPrograma">Asignar un nuevo programa</h2>

          {allProgram && (
            <>
              <h4>Programas del fisioterapeuta</h4>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre del programa</th>

                    <th>video</th>
                    <th></th>
                  </tr>
                </thead>

                {allProgram?.map((progr1, ind) => {
                  return (
                    <tbody key={ind}>
                      <tr>
                        <td>{progr1.name}</td>

                        <td>
                          {
                            <img
                              className="miniaturaPatientPrograms"
                              src={`https://img.youtube.com/vi/${progr1.video_link}/0.jpg`}
                            />
                          }
                        </td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => handleSubmit(progr1.program_id)}
                          >
                            + Añadir Programa
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
