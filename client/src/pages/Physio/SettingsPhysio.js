import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { Sidebar } from "../../components/Sidebar";
import "./settingsPhysio.scss";

export const SettingsPhysio = ({ setToken }) => {
  const [file, setFile] = useState();
  const [editUser, setEditUser] = useState({
    name: "",
    password: "",
    surname: "",
    phone_number: "",
    city: "",
    company: "",
    img: null,
  });
  const [showEditData, setShowEditData] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/getEditProfile/${id}`)
      .then((res) => {
        setEditUser(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("register", JSON.stringify(editUser));

    axios
      .put(`http://localhost:4000/users/editProfile/${id}`, newFormData)
      .then((res) => {
        navigate(`/physio/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={2} className="contAside">
          <Sidebar
            setToken={setToken}
            user={editUser}
            user_id={id}
            navigate={navigate}
          />
        </Col>
        <Col lg={10} className="contSettings">
          <div className="changeButtons">
            <h2>Ajustes</h2>
            <Button
              className="btns"
              onClick={() => {
                setShowEditData(true);
              }}
            >
              <AiOutlineInfoCircle /> Datos de perfil
            </Button>
            <Button
              className="btns"
              onClick={() => {
                setShowEditData(false);
              }}
            >
              <BsKey /> Cambiar contraseña
            </Button>
          </div>
          <Form encType="multipart/form">
            {showEditData ? (
              <div className="contForm">
                <div className="cont3">
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      className="contControl"
                      value={editUser.name}
                      type="text"
                      placeholder="Nombre"
                      name="name"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      className="contControl"
                      value={editUser.surname}
                      type="text"
                      placeholder="Apellidos"
                      name="surname"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      className="contControl"
                      value={editUser.phone_number}
                      type="text"
                      placeholder="324 456 655"
                      name="phone_number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="cont3">
                  <Form.Group className="mb-3">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control
                      className="contControl"
                      value={editUser.company}
                      type="text"
                      placeholder="Nombre de la empresa"
                      name="company"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                      className="contControl"
                      value={editUser.city}
                      type="text"
                      placeholder="Andalucía"
                      name="city"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Imagen de perfil</Form.Label>
                    <Form.Control
                      className="contControl"
                      type="file"
                      onChange={handleFile}
                      name="img"
                    />
                  </Form.Group>
                </div>
              </div>
            ) : (
              <>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="contControl"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            <Button
              className="aceptChanges"
              onClick={handleSubmit}
              type="onSubmit"
            >
              Aceptar cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
