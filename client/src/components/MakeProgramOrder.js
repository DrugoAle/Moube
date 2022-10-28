import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropListApp } from "./DragDropListApp";
import { Sidebar } from "./Sidebar";

export const MakeProgramOrder = () => {
  const [makeProgram, setMakeProgram] = useState([]);
  const [nameProgram, setNameProgram] = useState([]);
  const [userCreator, setUserCreator] = useState([]);
  const { program_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/program/allExercise/${program_id}`)
      .then((res) => {
        console.log(res.data);
        setMakeProgram(res.data.result);
        setNameProgram(res.data.result2[0].name);
        setUserCreator(res.data.result2[0].user_creator_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="contAside" lg={2}>
            <Sidebar />
          </Col>

          <Col lg={10}>
            <DragDropListApp
              makeProgram={makeProgram}
              setMakeProgram={setMakeProgram}
              nameProgram={nameProgram}
              userCreator={userCreator}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
