import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./stylesheets/exerciseList.scss";

export const ExerciseList = ({ data, searchingTerm, term, user_id }) => {
  console.log(user_id);

  const [programName, setProgramName] = useState("");

  const [exerciseList, setExerciseList] = useState([]);
  const divExer = useRef([]);

  const addExercise = (exer, index) => {
    console.log(exer);

    if (divExer.current[index].style.backgroundColor === "white") {
      divExer.current[index].style.backgroundColor = "blue";
    } else {
      divExer.current[index].style.backgroundColor = "white";
    }

    if (exerciseList.find((element) => element === exer.exercise_id)) {
      setExerciseList((e) =>
        e.filter((element) => element !== exer.exercise_id)
      );
    } else {
      setExerciseList([...exerciseList, exer.exercise_id]);
    }

    console.log(exerciseList);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/program/addExeciseProgram", {
        exerciseList,
        programName,
        user_id,
      })
      .then((res) => {
        console.log(res, "console.log del addprogrammmmmmm");
        navigate(`/makeprogram/${res.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setProgramName(e.target.value);
  };

  console.log(data);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button onClick={handleSubmit}>Continuar</Button>
        <input
          type="text"
          className="m-2 inputRegister"
          placeholder="Nombre del programa"
          autoComplete="off"
          name="name"
          value={programName}
          onChange={handleChange}
        />
      </div>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th className="imagenListaEjcsc"></th>
            <th>Nombre del ejercicio</th>
            <th>Tipo</th>
          </tr>
        </thead>

        {data &&
          data.filter(searchingTerm(term)).map((exer, index) => {
            return (
              <tbody className="bodyEx">
                <tr
                  key={index}
                  style={{ backgroundColor: "white" }}
                  ref={(element) => {
                    divExer.current[index] = element;
                  }}
                >
                  <td className="imagenListaEjcsc">
                    {
                      <img
                        className={"w-25"}
                        src={`https://img.youtube.com/vi/${exer.video_link}/0.jpg`}
                      />
                    }
                  </td>
                  <td>{exer.name}</td>
                  <td>{exer.description}</td>
                  <td>
                    <Button onClick={() => addExercise(exer, index)}>
                      Añadir
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </>
  );
};
