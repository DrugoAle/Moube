import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table, Col, Modal } from "react-bootstrap";
import { Sidebar } from "../../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ExerciseList } from "../../components/ExerciseList";

import "./createProgram.scss";

export const CreateProgram = ({ token, setToken }) => {
  const [programName, setProgramName] = useState("");
  const [editUser, setEditUser] = useState({
    name: "",
    password: "",
    surname: "",
    phone_number: "",
    city: "",
    company: "",
    img: null,
  });

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

  const [showExercise, setShowExercise] = useState(false);

  const navigate = useNavigate();
  const { user_id } = useParams();
  const [data, setData] = useState([]);
  const [term, setTerm] = useState();
  const [showModal, setShowModal] = useState();

  const [exercise, setExercise] = useState();

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    axios

      .get(`http://localhost:4000/exercise/allExercise`)
      .then((res) => {
        setExercise(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchingTerm = (term) => {
    return function (x) {
      return x.name.includes(term) || !term;
    };
  };

  const handleOut = () => {
    const logOut = window.localStorage.removeItem("token");

    setToken(logOut);
    navigate("/");
  };

  return (
    <Container fluid>
      <Row>
        <Col className="contAside" lg={2}>
          <Sidebar
            setToken={setToken}
            user={editUser}
            user_id={user_id}
            navigate={navigate}
          />
        </Col>

        <Col lg={10}>
          <div className="d-flex">
            <div>
              <input
                className="buscadorEjercicios"
                placeholder="=O | Buscar ejercicio"
                onChange={handleChange}
              />
            </div>
          </div>

          {!showExercise && (
            <ExerciseList
              user_id={user_id}
              data={exercise}
              term={term}
              searchingTerm={searchingTerm}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
