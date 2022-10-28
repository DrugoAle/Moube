import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import "./stylesheets/sidebar.scss";
import { BiMessage } from "react-icons/bi";
import { FiPlusSquare, FiSettings, FiMenu } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const SidebarPatient = ({ user, user_id, setToken }) => {
  const navigate = useNavigate();

  const handleOut = () => {
    const logOut = window.localStorage.removeItem("token");

    setToken(logOut);
    navigate("/");
  };

  const [openNav, setOpenNav] = useState(true);

  return (
    <Navbar className="sidebar">
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav id="contHeight">
          <Navbar.Brand className="contToggle">
            <img className="logo1" src="/assets/logo1.png" />
            <Button className="toggleBtn" onClick={() => setOpenNav(!openNav)}>
              <FiMenu />
            </Button>
          </Navbar.Brand>
          {openNav && (
            <>
              <div className="contButtonsMenu">
                <Button
                  className="btn-menu"
                  onClick={() => {
                    navigate(`/allprogramPatient/${user_id}`);
                  }}
                >
                  <FaRunning />
                  Programas
                </Button>
                <Button
                  className="btn-menu"
                  onClick={() => {
                    navigate();
                  }}
                >
                  <BiMessage /> Contacto
                </Button>
                <Button
                  className="btn-menu"
                  onClick={() => {
                    navigate();
                  }}
                >
                  <FiSettings /> Ajustes
                </Button>
              </div>

              <div className="infoSession">
                <div className="d-flex infoSession2">
                  {user && (
                    <>
                      <div className="infoSession2">
                        {user.img ? (
                          <div className="profilePic d-flex">
                            <img src={`/images/user/${user.img}`} />
                          </div>
                        ) : (
                          <div className="profilePic d-flex">
                            <p>{user.name.charAt(0).toUpperCase()}</p>
                          </div>
                        )}
                      </div>
                      <div className="openSession">
                        <h5>{user.name}</h5>
                        <p>Sesión Iniciada</p>
                      </div>
                    </>
                  )}
                </div>
                <Button className="closeSession" onClick={handleOut}>
                  Cerrar Sesión
                </Button>
              </div>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
