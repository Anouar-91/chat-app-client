import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");

  const loadCurrentUser = async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem("chat-app_user")
      ).username
    );
  }
  useEffect( () => {
    loadCurrentUser();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Bienvenue, <span>{userName}!</span>
      </h1>
      <h3>Choisissez un chat pour démarrer une discussion</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #7a2048;
  }
`;
