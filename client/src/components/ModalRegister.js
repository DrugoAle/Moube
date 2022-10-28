import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./stylesheets/modalRegister.scss";
import { FaUserPlus } from "react-icons/fa";

export const ModalRegister = ({ setShowModal, update, setUpdate, user_id }) => {
  const [register, setRegister] = useState({
    name: "",
    surname: "",
    dni: "",
    email: "",
    password: `${generatePassword(10)}`,
    gender: "",
    birthdate: "",
    injuryType: "",
    phoneNumber: "",
    description: "",
    physioId: `${user_id}`,
  });

  const [message, setMessage] = useState();
  const navigate = useNavigate();

  /* Generar Contraseña aleatoria */

  function generatePassword(length = 8) {
    let password = "";
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Possible characters that can appear in password
    let passwordLength = length;

    const array = new Uint32Array(length); // Create 'unsigned' array
    window.crypto.getRandomValues(array); // Assign random values to new array

    for (let i = 0; i < passwordLength; i++) {
      password += chars[array[i] % chars.length]; // % operator returns remainder of division
    }

    const msg = `Your new password is: "${password}"`;
    return password;
  }

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault(e);

    if (
      register.name === "" ||
      register.email === "" ||
      register.surname === "" ||
      register.phoneNumber === "" ||
      register.injuryType === "" ||
      register.description === "" ||
      register.dni === ""
    ) {
      setMessage("Tienes que rellenar todos los cambios");
    } else {
      axios
        .post("http://localhost:4000/patient/createPatient", register)
        .then((res) => {
          console.log(res);
          setShowModal(false);
          setUpdate(!update);
        })
        .catch((error) => {
          setMessage("El Email ya existe.");
        });
    }
  };
 
  return (
    <Modal show={setShowModal} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <div className="regis2">
        <Modal.Body>
          <div className="modalTitle">
            <Modal.Title className="modalTitulo">Añadir Paciente</Modal.Title>
          </div>
          <input
            type="text"
            className="m-2 inputRegister"
            placeholder="Email"
            autoComplete="off"
            name="email"
            value={register.email}
            onChange={handleChange}
          />
          <p className="seLeEnviara">
            Se le enviará al correo el acceso a la plataforma
          </p>

          <input
            type="text"
            className="m-2  inputRegister"
            placeholder="Nombre*"
            autoComplete="off"
            name="name"
            value={register.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="m-2  inputRegister"
            placeholder="Apellidos*"
            autoComplete="off"
            name="surname"
            value={register.surname}
            onChange={handleChange}
          />
          <input
            type="text"
            className="m-2  inputRegister"
            placeholder="DNI*"
            autoComplete="off"
            name="dni"
            value={register.dni}
            onChange={handleChange}
          />
          <input
            type="text"
            className="m-2  inputRegister"
            placeholder="Género "
            autoComplete="off"
            name="gender"
            value={register.gender}
            onChange={handleChange}
          />
          <input
            type="number"
            className="m-2  inputRegister"
            placeholder="Teléfono*"
            autoComplete="off"
            name="phoneNumber"
            value={register.phoneNumber}
            onChange={handleChange}
          />

          <input
            type="number"
            className="m-2 inputRegister"
            placeholder="Fecha de nacimiento"
            autoComplete="off"
            name="birthdate"
            value={register.birthdate}
            onChange={handleChange}
          />
          <input
            type="text"
            className="m-2 inputRegister"
            placeholder="Tipo de Lesión*"
            autoComplete="off"
            name="injuryType"
            value={register.injuryType}
            onChange={handleChange}
          />
          <input
            type="text"
            className="m-2 inputRegister"
            placeholder="Motivo de la consulta*"
            autoComplete="off"
            name="description"
            value={register.description}
            onChange={handleChange}
          />
        </Modal.Body>
        {message}
        <div className="modalFooter">
          <Button
            className="buttonRegister"
            onClick={handleSubmit}
            variant="primary"
          >
            <FaUserPlus /> Añadir Paciente
          </Button>
        </div>
      </div>
    </Modal>
  );
};
