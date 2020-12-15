import React from "react";
import styled from "styled-components";
import { Navbar } from "../../components/navbar-component/navbar";
import { ContactForm } from "./contact-form";
import { COLORS } from "../constants";
import fire from "../firebaseConfig";

export const Contact = () => {
  const handleLogOut = () => {
    fire.auth().signOut();
  };

  return (
    <>
      <Wrapper>
        <Navbar handleLogOut={handleLogOut} />
        <Main>
          <ContactDiv>
            <ContactForm />
          </ContactDiv>
        </Main>
      </Wrapper>
    </>
  );
};
const ContactDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: translateX(50px);
`;

const Wrapper = styled.div`
  background-color: ${COLORS.no5};
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
