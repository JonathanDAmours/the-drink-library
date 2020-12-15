import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import logo from "../homepage-components/assets/logoPale.png";

export const ContactForm = () => {
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    setSubmit(true);
  };
  return (
    <>
      <Wrapper>
        <ContactFormForm onSubmit={handleSubmit}>
          <Logo src={logo}></Logo>
          {submit ? (
            <>
              <H1>
                Thank you for contacting us! <br></br>We'll get back to you as
                soon as possible.
              </H1>
            </>
          ) : (
            <>
              <Info>
                <NameDiv>
                  <Label>First Name</Label>
                  <Input type="text"></Input>
                </NameDiv>
                <LastNameDiv>
                  <Label>Last Name</Label>
                  <Input type="text"></Input>
                </LastNameDiv>
              </Info>
              <MessageDiv>
                <Label>Email</Label>
                <Inputemail type="email"></Inputemail>
                <LabelMessage>Message</LabelMessage>
                <MessageInput rows="20" type="text"></MessageInput>
              </MessageDiv>
              <ButtonDiv>
                <SubmitButton type="submit">
                  <a href="mailto:someone@example.com" />
                  Submit
                </SubmitButton>
              </ButtonDiv>
            </>
          )}
        </ContactFormForm>
      </Wrapper>
    </>
  );
};

const LabelMessage = styled.label`
  color: ${COLORS.no1};
  font-size: 11px;
  margin-top: 20px;
`;

const H1 = styled.div`
  text-align: center;
  color: ${COLORS.no1};
  margin: 20px;
  font-size: 12px;
  line-height: 1.2em;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 30px;
`;

const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LastNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  color: ${COLORS.no1};
  font-size: 11px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 50px;
  margin-top: 10px;
`;

const Wrapper = styled.div``;

const ContactFormForm = styled.form`
  background-color: ${COLORS.no4};
  width: 540px;
  border-radius: 25px;
  border: 3px solid ${COLORS.no1};
  padding: 20px 20px 20px 20px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  font-size: 12px;
  color: ${COLORS.no1};
  width: 220px;
  padding: 10px;
  margin: 10px 10px;
  background-color: ${COLORS.no5};
  outline: none;
  border: none;
  border-radius: 4px;
`;

const Inputemail = styled.input`
  font-size: 12px;
  color: ${COLORS.no1};
  width: 460px;
  padding: 10px;
  margin: 10px 10px;
  background-color: ${COLORS.no5};
  outline: none;
  border: none;
  border-radius: 4px;
`;

const MessageInput = styled.textarea`
  font-size: 12px;
  color: ${COLORS.no1};
  width: 460px;
  height: 100px;
  padding: 10px;
  margin: 10px 10px;
  background-color: ${COLORS.no5};
  outline: none;
  border: none;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 220px;
  height: 35px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.no1};
  color: ${COLORS.no4};
  font-weight: bold;
  cursor: pointer;
  margin: 15px;

  &:hover {
    background-color: ${COLORS.no6};
  }

  &:active {
    background-color: ${COLORS.no6};
    width: 210px;
    height: 33px;
    border: none;
    outline: none;
    font-size: 11px;
  }
`;
