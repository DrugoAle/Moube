import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./createExercise.scss";
import { FaFolderPlus } from "react-icons/fa";

export const CreateExercise = ({
  user_id,
  setShowFormExer,
  update,
  setUpdate,
}) => {
  const [exercise, setExercise] = useState({
    name: "",
    description: "",
    videoLink: "",
    userId: `${user_id}`,
  });

  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({ ...exercise, [name]: value });
  };
  const handleClose = () => setShowFormExer(false);

  function deleteInicio(enlace) {
    let video = enlace.split("=")[1];
    return video;
  }

  const handleSubmit = (e) => {
    e.preventDefault(e);
    const { videoLink, name, description, userId } = exercise;
    let video = deleteInicio(videoLink);

    if (exercise.name === "" || exercise.description === "") {
      setMessage("Tienes que rellenar todos los cambios");
    } else {
      axios
        .post("http://localhost:4000/exercise/createExercise", {
          video,
          name,
          description,
          userId,
        })
        .then((res) => {
          setShowFormExer(false);
          setUpdate(!update);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Modal show={setShowFormExer} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <Modal.Title className="modalTitle">Añadir ejercicio</Modal.Title>
        <div className="inputs">
          <input
            type="text"
            className="m-2 exerciseInput"
            placeholder="Nombre*"
            autoComplete="off"
            name="name"
            value={exercise.name}
            onChange={handleChange}
          />

          <input
            type="text"
            className="m-2 exerciseInput"
            placeholder="Descripción*"
            autoComplete="off"
            name="description"
            value={exercise.description}
            onChange={handleChange}
          />
          <input
            type="text"
            className="m-2 exerciseInput"
            placeholder="Introduce el enlace a YouTube del vídeo*"
            autoComplete="off"
            name="videoLink"
            value={exercise.videoLink}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>

      <div className="modalFooter">
        <Button
          className="buttonRegister"
          onClick={handleSubmit}
          variant="primary"
        >
          {" "}
          <FaFolderPlus /> Añadir Ejercicio
        </Button>
      </div>
      {message}
    </Modal>
  );
};
