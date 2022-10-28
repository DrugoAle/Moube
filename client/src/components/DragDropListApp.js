import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "./stylesheets/dragDropList.scss";

export const DragDropListApp = ({
  makeProgram,
  setMakeProgram,
  nameProgram,
  userCreator,
}) => {
  console.log(nameProgram);
  console.log(userCreator);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  console.log(makeProgram);
  useEffect(() => {
    setCharacters(makeProgram);
  }, [makeProgram]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result);
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharacters(items);
  }

  const handleSubmit = () => {
    axios
      .put("http://localhost:4000/program/addOrder", characters)
      .then((res) => {
        console.log(res.data);
        navigate(`/allProgramPhysio/${userCreator}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(characters);
  return (
    <div>
      <div className="contmake">
        <h1>Programa: {nameProgram}</h1>
        <Button onClick={handleSubmit}>Siguiente</Button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              <Table className="tablaOrdenable" striped bordered hover>
                <thead>
                  <tr>
                    <th className="imagenScrollEjerciciosTabla"></th>
                    <th>Tipo</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th className="imagenScrollEjerciciosTabla">Descanso</th>
                  </tr>
                </thead>

                {characters.length !== 0 &&
                  characters.map(
                    (
                      {
                        exercise_id,
                        description,
                        name,
                        video_link,
                        sets,
                        reps,
                        rest,
                      },
                      index
                    ) => {
                      exercise_id = exercise_id.toString();
                      return (
                        <Draggable
                          key={exercise_id}
                          draggableId={exercise_id}
                          index={index}
                        >
                          {(provided) => (
                            <tbody
                              className="characters"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <tr>
                                <td className="imagenScrollEjercicios">
                                  {" "}
                                  {
                                    <img
                                      className={"w-50"}
                                      src={`https://img.youtube.com/vi/${video_link}/0.jpg`}
                                    />
                                  }
                                </td>
                                <td>{description}</td>
                                <td>{sets}</td>
                                <td>{reps}</td>
                                <td className="imagenScrollEjerciciosTabla">
                                  {rest}
                                </td>
                              </tr>
                            </tbody>
                          )}
                        </Draggable>
                      );
                    }
                  )}
              </Table>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
