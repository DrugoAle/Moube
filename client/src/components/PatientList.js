import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./stylesheets/patientList.scss";
import { FaFileMedical, FaUserCircle } from "react-icons/fa";
import axios from "axios";

export const PatientList = ({
  data,
  searchingTerm,
  update,
  setUpdate,
  term,
}) => {
  const navigate = useNavigate();
  

  const handleStatus = (user_id, userType) => {
    let url = `http://localhost:4000/patient/editStatus/${user_id}`;
    if (userType === 2) {
      url = `http://localhost:4000/patient/editStatusBaja/${user_id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setUpdate(!update);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Table className="container posi" bordered hover size="sm">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Nombre o mail del paciente </div>
          <div className="col col-2">Lesión</div>
          <div className="col col-3">Programas del paciente</div>
          <div className="col col-4">Dar alta clinica</div>
        </li>
      </ul>
      {data &&
        data.filter(searchingTerm(term)).map((user, index) => {
          return (
            <div className="responsive-table " key={index}>
              <li className="table-row">
                <div className="col col-1 mail" data-label="Nombre">
                  {user.email}
                </div>
                <div className="col col-2" data-label="Lesión">
                  {user.injury_type}
                </div>

                <div
                  onClick={() =>
                    navigate(
                      `/patientPrograms/${user.user_physio_id}/${user.user_id}`
                    )
                  }
                  className="col col-3"
                  data-label="Prescribir ejercicios"
                >
                  <FaFileMedical />
                </div>
                <div
                  onClick={() => handleStatus(user.user_id, user.status)}
                  className="col col-4"
                  data-label="Editar paciente"
                >
                  <FaUserCircle />
                </div>
              </li>
            </div>
          );
        })}
    </Table>
  );
};
