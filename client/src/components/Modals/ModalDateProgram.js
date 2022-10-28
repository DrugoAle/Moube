import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
export const ModalDateProgram = ({
  programDate,
  setProgramDate,
  showModal,
  setShowModal,
  setUpdate,
  update,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setProgramDate({ ...programDate, [name]: value });
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/program/addPatientProgram", programDate)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
      });
  };
  console.log(programDate.patient_id);
  console.log(programDate);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <div className="regis2">
        <Modal.Body>
          <div className="modalTitle">
            <Modal.Title>Añadir programa al paciente</Modal.Title>
          </div>
          <input
            type="text"
            className="m-2 inputRegister"
            placeholder="Fecha de inicio"
            autoComplete="off"
            name="startDate"
            value={programDate.startDate}
            onChange={handleChange}
          />

          <input
            type="text"
            className="m-2  inputRegister"
            placeholder="Fecha de final"
            autoComplete="off"
            name="endDate"
            value={programDate.endDate}
            onChange={handleChange}
          />
        </Modal.Body>

        <div className="modalFooter">
          <Button
            className="buttonRegister"
            onClick={handleSubmit}
            variant="primary"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
