import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import "./login.scss";

export const Login = ({ setToken }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login.email === "" || login.password === "") {
      setErrorMsg(true);
    } else {
      axios
        .post("http://localhost:4000/users/login", login)
        .then((res) => {
          console.log(res);
          const token = res.data.token;

          //lo subo al localstorage
          window.localStorage.setItem("token", token);
          setToken(token);

          console.log(jwtDecode(token));

          //averiguar de qué tipo es éste user
          const category = jwtDecode(token).user.category;

          const userId = jwtDecode(token).user.id;

          console.log(userId);

          console.log("categoría de usuario", category);

          //dependiendo de qué tipo sea el usuario logueado
          //nos redirige a un sitio u otro (hay que definir donde va cada categoria)
          category === 2
            ? navigate(`/physio/${userId}`, { replace: true })
            : category === 3
            ? navigate(`/allprogramPatient/${userId}`, { replace: true })
            : category === 1
            ? navigate(`/admin/${userId}`, { replace: true })
            : navigate("/", { replace: true });
        })

        .catch((error) => {
          console.log(error);
          setErrorMsg(true);
        });
    }
  };

  return (
    <section id="pantalla-dividida">
      <div className="img">
        <img
          className="imgLateral"
          src="/images/user/imagen-inicio-sesion.webp"
        />
      </div>

      <div className="regis">
        <a href="/">
          <img className="logo" src="/assets/logo_azul_verde.png"></img>
        </a>
        <h2 className="topText inicioSesion">Inicio de sesión</h2>
        <p className="topText ">Si eres fisioterapeuta inicia sesión aquí</p>

        <form className="d-flex">
          <input
            className="m-2"
            placeholder="email"
            autoComplete="off"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
          <input
            className="m-2"
            type="password"
            placeholder="password"
            autoComplete="off"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
          <Button className="m-2" type="submit" onClick={handleSubmit}>
            Entrar
          </Button>
          {errorMsg && <p>Usuario o contraseña incorrecta</p>}
        </form>

        <p className="foot">
          ¿Eres fisio y no tienes cuenta aún?{" "}
          <a href="/register"> ¡Regístrate aquí!</a>
        </p>
      </div>
    </section>
  );
};
