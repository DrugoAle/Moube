import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ExerciseList } from "../ExerciseList";

export const ModalCreateProgram = ({ programs }) => {
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

  return (
    <Modal.Dialog>
      <Modal.Header closeButton></Modal.Header>
      <div className="regis2">
        <Modal.Body>
          <Modal.Title>Crear Program</Modal.Title>

          <div>
           
            <img>{/* El logo de la empresa */}</img>

            <button
              onClick={() => {
                navigate(`/allProgramPhysio/${user_id}`);
              }}
            >
              Programas
            </button>
          </div>
          <div className="d-flex">
            <div>
              <input placeholder="Buscar ejercicio" onChange={handleChange} />
            </div>
          </div>

          {!showExercise && (
            <ExerciseList
              data={exercise}
              term={term}
              searchingTerm={searchingTerm}
            />
          )}
        </Modal.Body>
      </div>
    </Modal.Dialog>
  );
};
