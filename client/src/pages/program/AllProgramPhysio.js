import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalCreateProgram } from "../../components/Modals/ModalCreateProgram";
import { Sidebar } from "../../components/Sidebar";
import "./allProgramPhysio.scss";

export const AllProgramPhysio = ({ setToken }) => {
  const [editUser, setEditUser] = useState({
    name: "",
    password: "",
    surname: "",
    phone_number: "",
    city: "",
    company: "",
    img: null,
  });

  const { user_id } = useParams();

  const [programs, setPrograms] = useState();
  const [message, setMessage] = useState();

  const [openCreate, setOpenCreate] = useState(false);

  const [program, setProgram] = useState({
    name: "",
    userId: `${user_id}`,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

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
      .get(`http://localhost:4000/program/allProgramPhysio/${user_id}`)
      .then((res) => {
        setPrograms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(programs);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={2} className="contAside">
            <Sidebar
              setToken={setToken}
              user={editUser}
              user_id={user_id}
              navigate={navigate}
            />
          </Col>
          <Col lg={10} className="contPList">
            <h2 className="topTexto">Lista de programas</h2>
            <Button
              className="createProgramButton"
              onClick={() => navigate(`/createProgram/${user_id}`)}
              variant="primary"
            >
              Crear Programa
            </Button>
            {message}

            {programs && (
              <div className="tablaCompletaProgramas">
                <Table className="programList" striped bordered hover>
                  <thead className="headerListaProgramas">
                    <tr>
                      <th>Nombre del programa</th>
                      <th className="miniaturaTexto">Miniatura</th>
                    </tr>
                  </thead>

                  {programs.map((pro, index) => {
                    return (
                      <tbody className="bodyListaProgramas" key={index}>
                        <tr className="tablaListaProgramas">
                          <td className="tablaName">{pro.name}</td>
                          <td className="tablaImagenMiniatura">
                            {
                              <img
                                className="miniaturaImagen"
                                src={`https://img.youtube.com/vi/${pro.video_link}/0.jpg`}
                              />
                            }
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
