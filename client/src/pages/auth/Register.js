import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";

export const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    surname: "",

    email: "",
    password: "",
    city: "",

    collegiate_number: "",
    phone_number: "",
    company: "",
  });
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      register.name === "" ||
      register.email === "" ||
      register.city === "" ||
      register.phone_number === ""
    ) {
      setMessage("Tienes que rellenar todos los cambios");
    } else {
      axios
        .post("http://localhost:4000/users/createUser", register)
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          setMessage("El Email ya existe.");
        });
    }
  };

  return (
    <section id="pantalla-dividida">
      <div className="img">
        <img
          className="imgLateral"
          src="/images/user/register-img-provisional.webp"
        />
      </div>

      <div className="regis">
        <div>
          <a href="/">
            <img className="logo" src="/assets/logo_azul_verde.png"></img>
          </a>
          <p className="topText fisioPregunta">¿ERES FISIOTERAPEUTA?</p>
          <h2 className="topText toph2">
            Obtén el acceso a todo el contenido de MOUBEHEALTH totalmente GRATIS
            durante los próximos 30 días.
          </h2>
          <p className="topText">
            Regístrate gratis y empieza a pagar a partir del registro del primer
            paciente.
          </p>
        </div>

        <form className="d-flex">
          <input
            type="text"
            className="m-2"
            placeholder="Nombre*"
            autoComplete="off"
            name="name"
            value={register.name}
            onChange={handleChange}
          />

          <input
            type="text"
            className="m-2"
            placeholder="Apellidos*"
            autoComplete="off"
            name="surname"
            value={register.surname}
            onChange={handleChange}
          />

          <input
            type="email"
            className="m-2"
            placeholder="Email*"
            autoComplete="off"
            name="email"
            value={register.email}
            onChange={handleChange}
          />

          <input
            type="password"
            className="m-2"
            placeholder="Contraseña*"
            autoComplete="off"
            name="password"
            value={register.password}
            onChange={handleChange}
          />

          <input
            type="phone"
            className="m-2"
            placeholder="Teléfono*"
            autoComplete="off"
            name="phone_number"
            value={register.phone_number}
            onChange={handleChange}
          />

          <input
            type="text"
            className="m-2"
            placeholder="Empresa"
            autoComplete="off"
            name="company"
            value={register.company}
            onChange={handleChange}
          />

          <input
            type="text"
            className="m-2"
            placeholder="Ciudad"
            autoComplete="off"
            name="city"
            value={register.city}
            onChange={handleChange}
          />

          <Button onClick={handleSubmit} type="submit" className="boton ">
            Crear Cuenta
          </Button>

          {message}
        </form>

        <div>
          <p className="foot">
            ¿Ya tienes cuenta?{" "}
            <a className="loginRedirect" href="/login">
              Inicia sesión
            </a>
          </p>
          <p className="problemaPregunta foot">
            Si tienes algún problema contacta con +34 632 23 44 34
          </p>
        </div>
      </div>
    </section>
  );
};
