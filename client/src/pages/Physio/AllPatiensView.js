import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Table,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ModalRegister } from "../../components/ModalRegister";
import { PatientList } from "../../components/PatientList";
import { Sidebar } from "../../components/Sidebar";

import "./allPatientsView.scss";

export const AllPatiensView = ({ setToken }) => {
  const [user, setUser] = useState();
  const [patientInjured, setPatientInjured] = useState();
  const [patienthealthy, setPatientHealthy] = useState();
  const [showPatient, setShowPatient] = useState(false);

  const navigate = useNavigate();
  const { user_id } = useParams();
  const [data, setData] = useState([]);
  const [term, setTerm] = useState();
  const [showModal, setShowModal] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/getEditProfile/${user_id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/allPatiens/${user_id}`)
      .then((res) => {
        setPatientInjured(res.data.filter((elem) => elem.status === 1));
        setPatientHealthy(res.data.filter((elem) => elem.status === 2));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return x.name.includes(term) || x.email.includes(term) || !term;
    };
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={2} xs={12} className="contAside">
          <Sidebar
            setToken={setToken}
            user={user}
            user_id={user_id}
            navigate={navigate}
          />
        </Col>

        <Col lg={10}>
          <div className="botones">
            <Button
              className="botonActivo"
              onClick={() => {
                setShowPatient(false);
              }}
            >
              Pacientes Activos
            </Button>
            <Button
              className="botonAlta"
              onClick={() => {
                setShowPatient(true);
              }}
            >
              Pacientes en Alta
            </Button>
            <Button
              className="addPatient"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              {" "}
              <FaUserPlus /> Añadir Paciente
            </Button>

            <input
              className="buscador"
              placeholder="=O| Buscar por nombre o mail"
              onChange={handleChange}
            />
          </div>

          {!showPatient ? (
            <PatientList
              update={update}
              setUpdate={setUpdate}
              data={patientInjured}
              term={term}
              searchingTerm={searchingTerm}
            />
          ) : (
            <PatientList
              update={update}
              setUpdate={setUpdate}
              data={patienthealthy}
              term={term}
              searchingTerm={searchingTerm}
            />
          )}

          {showModal && (
            <ModalRegister
              setUpdate={setUpdate}
              update={update}
              setShowModal={setShowModal}
              user_id={user_id}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
