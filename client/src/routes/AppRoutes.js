import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AdminView } from "../pages/admin/AdminView"; //admin
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { CreateExercise } from "../pages/exercises/CreateExercise";
import { LandingPage } from "../pages/home/LandingPage";

import { AllPatiensView } from "../pages/Physio/AllPatiensView";

import { AllProgramPatient } from "../pages/program/AllProgramPatient";
import { AllProgramPhysio } from "../pages/program/AllProgramPhysio";
import { Redirection } from "../pages/redirect/Redirection";
import { CreateProgram } from "../pages/program/CreateProgram";
import { MakeProgram } from "../components/MakeProgram";
import { SettingsPhysio } from "../pages/Physio/SettingsPhysio";
import { MakeProgramOrder } from "../components/MakeProgramOrder";

import { Capture } from "../components/capture/Capture";
import { PatientPrograms } from "../pages/Physio/PatientPrograms";

import { DragDropListApp } from "../components/DragDropListApp";
import { ExerciseVideo } from "../components/ExerciseVideo";

export const AppRoutes = () => {
  const [category, setCategory] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token", token);
    setToken(tokenLocal);
  }, []);

  useEffect(() => {
    if (token) {
      setCategory(jwtDecode(token).user.category);
      setId(jwtDecode(token).user.id);
    }
  }, [token]);

  if (token) {
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!token && (
            <>
              <Route path="/" element={<LandingPage />}></Route>

              <Route
                path="/login"
                element={<Login setToken={setToken} />}
              ></Route>
              <Route path="/register" element={<Register />}></Route>
            </>
          )}

          {token && category === 1 && (
            <>
              <Route
                path="/"
                element={<Redirection route={"admin"} id={id} />}
              />
              <Route path="/"></Route>
              <Route
                path="/admin/:user_id"
                element={<AdminView token={token} setToken={setToken} />}
              />
              <Route
                path="/viewExerciseVideo/:video_link"
                element={<ExerciseVideo />}
              />
            </>
          )}

          {token && category === 2 && (
            <>
              <Route
                path={`/physio/:user_id`}
                element={<AllPatiensView token={token} setToken={setToken} />}
              />
              <Route
                path="/"
                element={<Redirection route={"physio"} id={id} />}
              />
              <Route
                path="/allProgramPhysio/:user_id"
                element={<AllProgramPhysio token={token} setToken={setToken} />}
              />

              <Route
                path={`/createProgram/:user_id`}
                element={<CreateProgram token={token} setToken={setToken} />}
              />
              <Route
                path={`/makeProgram/:program_id`}
                element={<MakeProgram token={token} setToken={setToken} />}
              />
              <Route
                path={`/makeProgramOrder/:program_id`}
                element={<MakeProgramOrder token={token} setToken={setToken} />}
              />
              <Route
                path={`/patientPrograms/:user_id/:patient_id`}
                element={<PatientPrograms setToken={setToken} />}
              />

              <Route
                path={`/settingsPhysio/:id`}
                element={<SettingsPhysio token={token} setToken={setToken} />}
              />
            </>
          )}

          {token && category === 3 && (
            <>
              <Route
                path="/allprogramPatient/:user_id"
                element={
                  <AllProgramPatient token={token} setToken={setToken} />
                }
              />
              <Route
                path="/"
                element={<Redirection route={"alprogramPatient"} id={id} />}
              />
              <Route
                path="/viewExerciseVideo/:video_link"
                element={<ExerciseVideo />}
              />
              <Route path="/captureScreen" element={<Capture />} />
            </>
          )}

          <Route path="/utils" element={<Capture />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
